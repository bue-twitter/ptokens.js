import Web3 from 'web3'
import Web3PromiEvent from 'web3-core-promievent'
import Enclave from 'ptokens-enclave'
import utils from 'ptokens-utils'
import Web3Utils from 'web3-utils'
import Esplora from './lib/esplora'
import DepositAddress from './lib/deposit-address'
import polling from 'light-async-polling'
import pbtcAbi from './utils/contractAbi/pBTCTokenETHContractAbi.json'
import {
  ESPLORA_POLLING_TIME,
  PBTC_TOKEN_DECIMALS,
  MINIMUN_SATS_REDEEMABLE
} from './utils/constants'

class pBTC {
  /**
   * @param {Object} _configs
   */
  constructor(_configs) {
    const {
      ethPrivateKey,
      ethProvider,
      btcNetwork
    } = _configs

    this._web3 = new Web3(ethProvider)

    this.enclave = new Enclave({
      pToken: 'pbtc'
    })

    if (ethPrivateKey) {
      this._isWeb3Injected = false
      const account = this._web3.eth.accounts.privateKeyToAccount(
        utils.eth.addHexPrefix(ethPrivateKey)
      )

      this._web3.eth.defaultAccount = account.address
      this._ethPrivateKey = utils.eth.addHexPrefix(ethPrivateKey)
      this._isWeb3Injected = false
    } else {
      this._isWeb3Injected = true
      this._ethPrivateKey = null
    }

    if (
      btcNetwork === 'bitcoin' ||
      btcNetwork === 'testnet'
    )
      this._btcNetwork = btcNetwork
    else
      this._btcNetwork = 'testnet'

    this._esplora = new Esplora(this._btcNetwork)
  }
  
  /**
   * @param {String} _ethAddress
   */
  async getDepositAddress(_ethAddress) {
    if (!Web3Utils.isAddress(_ethAddress))
      throw new Error('Eth Address is not valid')

    const deposit = await this.enclave.generic(
      'GET',
      `get-btc-deposit-address/${this._btcNetwork}/${_ethAddress}`
    )

    const depositAddress = new DepositAddress({
      ethAddress: _ethAddress,
      nonce: deposit.nonce,
      enclavePublicKey: deposit.enclavePublicKey,
      value: deposit.btcDepositAddress,
      btcNetwork: this._btcNetwork,
      esplora: this._esplora,
      enclave: this.enclave,
      web3: this._web3
    })

    if (!depositAddress.verify())
      throw new Error('Enclave deposit address does not match expected address')

    return depositAddress
  }

  /**
   * @param {Number} _amount
   * @param {String} _eosAccountName
   */
  redeem(_amount, _btcAddress) {
    const promiEvent = Web3PromiEvent()

    const start = async () => {
      if (_amount < MINIMUN_SATS_REDEEMABLE) {
        promiEvent.reject(`Impossible to burn less than ${MINIMUN_SATS_REDEEMABLE} pBTC`)
        return
      }

      if (!utils.btc.isValidAddress(_btcAddress)) {
        promiEvent.reject('Btc Address is not valid')
        return
      }

      try {
        const ethTxReceipt = await utils.eth.makeContractSend(
          this._web3,
          'burn',
          {
            isWeb3Injected: this._isWeb3Injected,
            abi: pbtcAbi,
            contractAddress: this._pbtcSmartContractAddress(),
            privateKey: this._ethPrivateKey,
            value: utils.eth.zeroEther
          },
          [
            utils.eth.correctFormat(
              _amount,
              PBTC_TOKEN_DECIMALS,
              '*'
            ),
            _btcAddress
          ]
        )
        promiEvent.eventEmitter.emit('onEthTxConfirmed', ethTxReceipt)

        const broadcastedBtcTx = await this.enclave.monitorIncomingTransaction(
          ethTxReceipt.transactionHash,
          'redeem',
          promiEvent.eventEmitter
        )

        await polling(async () => {
          const status = await this._esplora.makeApiCall(
            'GET',
            `/tx/${broadcastedBtcTx}/status`
          )

          if (status.confirmed) {
            promiEvent.eventEmitter.emit('onBtcTxConfirmed', broadcastedBtcTx)
            return true
          } else {
            return false
          }
        }, ESPLORA_POLLING_TIME)

        promiEvent.resolve({
          amount: _amount.toFixed(PBTC_TOKEN_DECIMALS),
          to: _btcAddress,
          tx: broadcastedBtcTx
        })
      } catch (err) {
        promiEvent.reject(err)
      }
    }

    start()
    return promiEvent.eventEmitter
  }

  getTotalIssued() {
    return new Promise((resolve, reject) => {
      utils.eth.makeContractCall(
        this._web3,
        'totalMinted',
        {
          isWeb3Injected: this._isWeb3Injected,
          abi: pbtcAbi,
          contractAddress: this._pbtcSmartContractAddress()
        }
      )
        .then(totalIssued => resolve(
          utils.eth.correctFormat(
            parseInt(totalIssued),
            PBTC_TOKEN_DECIMALS,
            '/'
          )
        ))
        .catch(err => reject(err))
    })
  }

  getTotalRedeemed() {
    return new Promise((resolve, reject) => {
      utils.eth.makeContractCall(
        this._web3,
        'totalBurned',
        {
          isWeb3Injected: this._isWeb3Injected,
          abi: pbtcAbi,
          contractAddress: this._pbtcSmartContractAddress()
        }
      )
        .then(totalRedeemed => resolve(
          utils.eth.correctFormat(
            parseInt(totalRedeemed),
            PBTC_TOKEN_DECIMALS,
            '/'
          )
        ))
        .catch(err => reject(err))
    })
  }

  getCirculatingSupply() {
    return new Promise((resolve, reject) => {
      utils.eth.makeContractCall(
        this._web3,
        'totalSupply',
        {
          isWeb3Injected: this._isWeb3Injected,
          abi: pbtcAbi,
          contractAddress: this._pbtcSmartContractAddress()
        }
      )
        .then(totalSupply => resolve(
          utils.eth.correctFormat(
            parseInt(totalSupply),
            PBTC_TOKEN_DECIMALS,
            '/'
          )
        ))
        .catch(err => reject(err))
    })
  }

  /**
   * @param {String} _ethAddress
   */
  getBalance(_ethAddress) {
    return new Promise((resolve, reject) => {
      utils.eth.makeContractCall(
        this._web3,
        'balanceOf',
        {
          isWeb3Injected: this._isWeb3Injected,
          abi: pbtcAbi,
          contractAddress: this._pbtcSmartContractAddress()
        },
        [
          _ethAddress
        ]
      )
        .then(balance => resolve(
          utils.eth.correctFormat(
            parseInt(balance),
            PBTC_TOKEN_DECIMALS,
            '/'
          )
        ))
        .catch(err => reject(err))
    })
  }

  /**
   * @param {String} _to
   * @param {Number} _amount
   */
  transfer(_to, _amount) {
    return utils.eth.makeContractSend(
      this._web3,
      'transfer',
      {
        isWeb3Injected: this._isWeb3Injected,
        abi: pbtcAbi,
        contractAddress: this._pbtcSmartContractAddress(),
        privateKey: this._ethPrivateKey,
        value: utils.eth.zeroEther
      },
      [
        _to,
        utils.eth.correctFormat(
          parseInt(_amount),
          PBTC_TOKEN_DECIMALS,
          '*'
        )
      ]
    )
  }

  /**
   * @param {String} _spender
   * @param {Number} _amount
   */
  approve(_spender, _amount) {
    return utils.eth.makeContractSend(
      this._web3,
      'approve',
      {
        isWeb3Injected: this._isWeb3Injected,
        abi: pbtcAbi,
        contractAddress: this._pbtcSmartContractAddress(),
        privateKey: this._ethPrivateKey,
        value: utils.eth.zeroEther
      },
      [
        _spender,
        utils.eth.correctFormat(
          parseInt(_amount),
          PBTC_TOKEN_DECIMALS,
          '*'
        )
      ]
    )
  }

  /**
   * @param {String} _from
   * @param {String} _to
   * @param {Number} _amount
   */
  transferFrom(_from, _to, _amount) {
    return utils.eth.makeContractSend(
      this._web3,
      'transferFrom',
      {
        isWeb3Injected: this._isWeb3Injected,
        abi: pbtcAbi,
        contractAddress: this._pbtcSmartContractAddress(),
        privateKey: this._ethPrivateKey,
        value: utils.eth.zeroEther
      },
      [
        _from,
        _to,
        utils.eth.correctFormat(
          parseInt(_amount),
          PBTC_TOKEN_DECIMALS,
          '*'
        )
      ]
    )
  }

  getBurnNonce() {
    return new Promise((resolve, reject) => {
      utils.eth.makeContractCall(
        this._web3,
        'burnNonce',
        {
          isWeb3Injected: this._isWeb3Injected,
          abi: pbtcAbi,
          contractAddress: this._pbtcSmartContractAddress()
        }
      )
        .then(burnNonce => resolve(
          parseInt(burnNonce)
        ))
        .catch(err => reject(err))
    })
  }

  getMintNonce() {
    return new Promise((resolve, reject) => {
      utils.eth.makeContractCall(
        this._web3,
        'mintNonce',
        {
          isWeb3Injected: this._isWeb3Injected,
          abi: pbtcAbi,
          contractAddress: this._pbtcSmartContractAddress()
        }
      )
        .then(mintNonce => resolve(
          parseInt(mintNonce)
        ))
        .catch(err => reject(err))
    })
  }

  /**
   * @param {String} _owner
   * @param {Address} _spender
   */
  getAllowance(_owner, _spender) {
    return new Promise((resolve, reject) => {
      utils.eth.makeContractCall(
        this._web3,
        'allowance',
        {
          isWeb3Injected: this._isWeb3Injected,
          abi: pbtcAbi,
          contractAddress: this._pbtcSmartContractAddress()
        },
        [
          _owner,
          _spender
        ]
      )
        .then(allowance => resolve(
          utils.eth.correctFormat(
            parseInt(allowance),
            PBTC_TOKEN_DECIMALS,
            '/'
          )
        ))
        .catch(err => reject(err))
    })
  }

  async _pbtcSmartContractAddress() {
    const ethNetwork = await this._web3.eth.net.getNetworkType()
    const info = await this.enclave.getInfo(
      this._btcNetwork,
      ethNetwork
    )

    return info['pbtc-smart-contract-address']
  }
}

export default pBTC
