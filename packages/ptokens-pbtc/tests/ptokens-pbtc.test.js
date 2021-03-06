import { pBTC } from '../src/index'
import { expect } from 'chai'
import { sendBitcoin } from './utils'

const configs = {
  ethPrivateKey:
    '422c874bed50b69add046296530dc580f8e2e253879d98d66023b7897ab15742',
  ethProvider: 'https://ropsten.infura.io/v3/4762c881ac0c4938be76386339358ed6',
  btcNetwork: 'testnet'
}
// corresponsing eth address = 0xdf3B180694aB22C577f7114D822D28b92cadFd75

const ETH_TESTING_ADDRESS = '0xdf3B180694aB22C577f7114D822D28b92cadFd75'

const BTC_TESTING_PRIVATE_KEY =
  '8d31f05cbb64ebb1986f64f70959b8cdcb528c2b095d617fd0bbf1e5c0f7ec07'
const BTC_TESTING_ADDRESS = 'mk8aUY9DgFMx7VfDck5oQ7FjJNhn8u3snP'

jest.setTimeout(3000000)

test('Should get a BTC deposit address on Testnet', async () => {
  const pbtc = new pBTC({
    ethPrivateKey:
      '422c874bed50b69add046296530dc580f8e2e253879d98d66023b7897ab15742',
    ethProvider:
      'https://ropsten.infura.io/v3/4762c881ac0c4938be76386339358ed6',
    btcNetwork: 'testnet'
  })

  const depositAddress = await pbtc.getDepositAddress(ETH_TESTING_ADDRESS)
  expect(depositAddress.toString()).to.be.a('string')
})

test('Should get a BTC deposit address on Mainnet', async () => {
  const pbtc = new pBTC({
    ethPrivateKey:
      '422c874bed50b69add046296530dc580f8e2e253879d98d66023b7897ab15742',
    ethProvider:
      'https://mainnet.infura.io/v3/4762c881ac0c4938be76386339358ed6',
    btcNetwork: 'bitcoin'
  })

  const depositAddress = await pbtc.getDepositAddress(ETH_TESTING_ADDRESS)
  expect(depositAddress.toString()).to.be.a('string')
})

test('Should not get a BTC deposit address because of invalid Eth address', async () => {
  const pbtc = new pBTC({
    ethPrivateKey:
      '422c874bed50b69add046296530dc580f8e2e253879d98d66023b7897ab15742',
    ethProvider:
      'https://ropsten.infura.io/v3/4762c881ac0c4938be76386339358ed6',
    btcNetwork: 'testnet'
  })

  const invalidEthAddress = 'Invalid Eth Address'

  try {
    await pbtc.getDepositAddress(invalidEthAddress)
  } catch (err) {
    expect(err.message).to.be.equal('Eth Address is not valid')
  }
})

test('Should monitor an issuing of 1.01e-14 pBTC', async () => {
  const pbtc = new pBTC(configs)

  const amountToIssue = 10100
  const minerFees = 1000

  const depositAddress = await pbtc.getDepositAddress(ETH_TESTING_ADDRESS)

  await sendBitcoin(
    BTC_TESTING_PRIVATE_KEY,
    BTC_TESTING_ADDRESS,
    amountToIssue,
    minerFees,
    depositAddress.toString()
  )

  let btcTxIsBroadcasted = false
  let btcTxIsConfirmed = false
  let nodeHasReceivedTx = false
  let nodeHasBroadcastedTx = false
  let ethTxIsConfirmed = false
  const start = () =>
    new Promise(resolve => {
      depositAddress
        .waitForDeposit()
        .once('onBtcTxBroadcasted', () => {
          btcTxIsBroadcasted = true
        })
        .once('onBtcTxConfirmed', () => {
          btcTxIsConfirmed = true
        })
        .once('onNodeReceivedTx', () => {
          nodeHasReceivedTx = true
        })
        .once('onNodeBroadcastedTx', () => {
          nodeHasBroadcastedTx = true
        })
        .once('onEthTxConfirmed', () => {
          ethTxIsConfirmed = true
        })
        .then(() => resolve())
    })
  await start()

  expect(btcTxIsBroadcasted).to.equal(true)
  expect(btcTxIsConfirmed).to.equal(true)
  expect(nodeHasReceivedTx).to.equal(true)
  expect(nodeHasBroadcastedTx).to.equal(true)
  expect(ethTxIsConfirmed).to.equal(true)
})

test('Should redeem 0.000051 pBTC', async () => {
  const pbtc = new pBTC(configs)

  const amountToRedeem = 0.000051

  let ethTxIsConfirmed = false
  let nodeHasReceivedTx = false
  let nodeHasBroadcastedTx = false
  let btcTxIsConfirmed = false
  const start = () =>
    new Promise(resolve => {
      pbtc
        .redeem(amountToRedeem, BTC_TESTING_ADDRESS)
        .once('onEthTxConfirmed', () => {
          ethTxIsConfirmed = true
        })
        .once('onNodeReceivedTx', () => {
          nodeHasReceivedTx = true
        })
        .once('onNodeBroadcastedTx', () => {
          nodeHasBroadcastedTx = true
        })
        .once('onBtcTxConfirmed', () => {
          btcTxIsConfirmed = true
        })
        .then(() => resolve())
    })
  await start()

  expect(ethTxIsConfirmed).to.equal(true)
  expect(nodeHasReceivedTx).to.equal(true)
  expect(nodeHasBroadcastedTx).to.equal(true)
  expect(btcTxIsConfirmed).to.equal(true)
})
