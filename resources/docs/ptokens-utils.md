# ptokens-utils

This module enables access to some useful utilities used by other packages.

&nbsp;

### Installation

```
npm install ptokens-utils
```

&nbsp;

***

&nbsp;

## utils.btc

## btc.broadcastTransaction

```js
ptokens.utils.btc.broadcastTransaction(network, transaction)
```

Broadcasts a Bitcoin transaction using Blockstream Esplora API

### Parameters

- __`String`__ - __`address`__: can be __bitcoin__ or __testnet__
- __`String`__ - __`transaction`__: transaction in Hex format

### Returns

- __`Promise`__ : when resolved returns if the transaction has been broadcasted succesfully

### Example
```js
const isBroadcasted = await utils.btc.broadcastTransaction('testnet', 'tx hex')
```

&nbsp;

## btc.getUtxoByAddress

```js
ptokens.utils.btc.getUtxoByAddress(network, address)
```

Returns all UTXOs belonging to a Bitcoin address 

### Parameters

- __`String`__ - __`network`__: can be __bitcoin__ or __testnet__
- __`String`__ - __`address`__: Bitcoin address

### Returns

- __`Promise`__ : when resolved returns all UTXOs belonging to a Bitcoin address 

### Example
```js
const utxos = await utils.btc.getUtxoByAddress('testnet', 'mk8aUY9DgFMx7VfDck5oQ7FjJNhn8u3snP')
```

&nbsp;

## btc.getTransactionHexById

```js
ptokens.utils.btc.getTransactionHexById(network, transactionId)
```

Returns a transaction in hex format

### Parameters

- __`String`__ - __`address`__: can be __bitcoin__ or __testnet__
- __`String`__ - __`transactionId`__: Bitcoin transaction id

### Returns

- __`Promise`__ : when resolved returns a transaction in hex format 

### Example
```js
const txHex = await utils.btc.getTransactionHexById('testnet', '3eccff684a63d7643a93936e703c28ab0cd7677093fcf008e194f33ae0393cd3')
```

&nbsp;

## btc.isValidAddress

```js
ptokens.utils.btc.isValidAddress(address)
```

Returns a boolean indicating the address validity

### Parameters

- __`String`__ - __`address`__: address

### Returns

- __`Boolean`__ : the address validity

### Example
```js
utils.btc.isValidAddress('mk8aUY9DgFMx7VfDck5oQ7FjJNhn8u3snP') //true
```

&nbsp;

## btc.monitorUtxoByAddress

```js
ptokens.utils.btc.monitorUtxoByAddress(network, address, eventEmitter, pollingTime)
```

Allows to monitor if an address is receving a transaction

### Parameters

- __`String`__ - __`network`__: can be __bitcoin__ or __testnet__
- __`String`__ - __`address`__: Bitcoin address
- __`EventEmitter`__ - __`eventEmitter`__: event emitter used to emit __onBtcTxBroadcasted__ and __onBtcTxConfirmed__ events
- __`Number`__ - __`pollingTime`__: time interval to call BlockStream Esplora API

### Returns

- __`Promise`__ : when resolved returns the utxo just confirmed

### Example
```js
const eventEmitter = new EventEmitter()

eventEmitter.once('onBtcTxBroadcasted', tx => ...)
eventEmitter.once('onBtcTxConfirmed', tx => ...)
const utxo = await utils.btc.monitorUtxoByAddress('testnet', 'mk8aUY9DgFMx7VfDck5oQ7FjJNhn8u3snP', eventEmitter, 2000)
```

&nbsp;

## btc.waitForTransactionConfirmation

```js
ptokens.utils.btc.waitForTransactionConfirmation(network, transaction, pollingTime)
```

Allow to wait for a BTC transaction confirmation

### Parameters

- __`String`__ - __`network`__: can be __bitcoin__ or __testnet__
- __`String`__ - __`transaction`__: Bitcoin address
- __`Number`__ - __`pollingTime`__: time interval to call BlockStream Esplora API

### Returns

- __`Promise`__ : when resolved returns the confirmed transaction

### Example
```js
const tx = await utils.btc.waitForTransactionConfirmation('testnet', '3eccff684a63d7643a93936e703c28ab0cd7677093fcf008e194f33ae0393cd3', 2000)
```

&nbsp;

***

## utils.converters

* __`decodeUint64le`__

***

## converters.decodeUint64le

```js
ptokens.utils.converters.decodeUint64le(buffer)
```

Returns an Unsigned 64 bit Integer from a Buffer representing an Unsigned 64 bit Integer in Little Endian format

### Parameters

- __`Buffer`__ - __`buffer`__: Buffer representing an Unsigned 64 bit Integer in Little Endian format

### Returns

- __`Integer`__ : an Unsigned 64 bit Integer

### Example
```js
utils.converters.decodeUint64le(new Buffer('0x456'))
```

&nbsp;

## converters.encodeUint64le

```js
ptokens.utils.converters.encodeUint64le(value)
```

Returns an Unsigned 64 bit Integer decoded in Little Endian format represented by a Buffer

### Parameters

- __`Number`__ - __`value`__: encoded Unsigned 64 bit Integer in Little Endian format

### Returns

- __`Buffer`__ : an Unsigned 64 bit Integer decoded in Little Endian format represented by a Buffer

### Example
```js
utils.converters.encodeUint64le(0x05)
```

&nbsp;

***

# utils.helpers

* __`pTokenNameIsValid`__
* __`pTokenNameNormalized`__

***


## helpers.pTokenNameIsValid

```js
ptokens.utils.helpers.pTokenNameIsValid(pTokenName)
```

Returns a boolean indicating the pToken name correctness

### Parameters

- __`String`__ - __`pTokenName`__: pToken name

### Returns

- __`Boolean`__ : pToken name correctness

### Example
```js
utils.helpers.pTokenNameIsValid('pbtc') //true
utils.helpers.pTokenNameIsValid('pBTC') //true
utils.helpers.pTokenNameIsValid('pBTCSS') //false
```

&nbsp;

## helpers.pTokenNameNormalized

```js
ptokens.utils.helpers.pTokenNameNormalized(pTokenName)
```

Returns a pToken name normalized (lower case)

### Parameters

- __`String`__ - __`pTokenName`__: pToken name

### Returns

- __`Boolean`__ : pToken name normalized

### Example
```js
utils.helpers.pTokenNameNormalized('pBTC') //pbtc
```

&nbsp;

***

## utils.eth

* __`addHexPrefix`__
* __`correctFormat`__
* __`getAccount`__
* __`getContract`__
* __`getGasLimit`__
* __`isHexPrefixed`__
* __`makeContractCall`__
* __`makeContractSend`__
* __`makeTransaction`__
* __`sendSignedMethodTx`__

***


## eth.addHexPrefix

```js
ptokens.utils.eth.addHexPrefix(text)
```

Returns a string always `0x` prefixed

### Parameters

- __`String`__ - __`text`__: text

### Returns

- __`String`__ : a string `0x` prefixed 

### Example
```js
const res = utils.eth.addHexPrefix('hello') //0xhello
```

&nbsp;

## eth.correctFormat

```js
ptokens.utils.eth.addHexPrefix(amount, decimals, operation)
```

Returns a number equal to the `amount` divied/multiplied (`operation`) by `decimals` (useful for erc20 tokens).

### Parameters

- __`Number`__ - __`amount`__: on chain amount
- __`String`__ - __`decimals`__: number of decimals
- __`Character`__ - __`operation`__: `*` or `/`

### Returns

- __`Number`__ : a number formatted correctly

### Example
```js
const res = utils.eth.correctFormat(1000, 4, '/') //0.1
```

&nbsp;

## eth.getAccount

```js
ptokens.utils.eth.getAccount(web3, isWeb3Injected)
```

Returns the current Ethereum address given an instance of Web3 and specifying if it's injected (i.e.: a Web3 instance injected by Metamask)

### Parameters

- __`Object`__ - __`Web3`__: Web3 instance
- __`Boolean`__ - __`isWeb3Injected`__: specifies if it's an injected Web3 instance


### Returns

- __`Promise`__ : when resolved it returns the current Ethereum address

### Example
```js
const account = await utils.eth.getAccount(web3, true)
```

&nbsp;

## eth.getContract

```js
ptokens.utils.eth.getContract(web3, abi, contractAddress, account)
```

Returns a [Web3.eth.Contract](https://web3js.readthedocs.io/en/v1.2.0/Web3-eth-contract.html) instance given a Web3 one, the contract abi, its address (`contractAddress`) and the address (`account`) where transactions should be made from

### Parameters

- __`Object`__ - __`web3`__: Web3 instance
- __`Boolean`__ - __`abi`__: json interface of the contract to instantiate
- __`String`__ - __`contractAddress`__: Smart Contract address
- __`String`__ - __`account`__: the address where transactions should be made from.
### Returns

- __`Object`__ : `Web3.eth.Contract` instance

### Example
```js
const contract = utils.eth.getContract(web3, true)
```

&nbsp;

## eth.getGasLimit

```js
ptokens.utils.eth.getGasLimit(web3)
```

Returns the gas limit of the latest Ethereum block.

### Parameters

- __`Object`__ - __`web3`__: Web3 instance

### Returns

- __`Promise`__ : when resolved returns the current gas limit

### Example
```js
const gasLimit = await utils.eth.getGasLimit(web3)
```

&nbsp;

## eth.isHexPrefixed

```js
ptokens.utils.eth.isHexPrefixed(text)
```

Check if a given string (`text`) is `0x` prefixed

### Parameters

- __`String`__ - __`text`__: text

### Returns

- __`Boolean`__ : true if the input has a `0x` prefix

### Example
```js
const isHexPrefixed = await utils.eth.isHexPrefixed('0xhello') //true
```

&nbsp;

## eth.makeContractCall

```js
ptokens.utils.eth.makeContractCall(web3, method, options, params = [])
```

Performs a contract `call` given a Web3 instance and the Smart Contract details.

### Parameters

- __`Object`__ - __`web3`__: Web3 instance
- __`String`__ - __`method`__: Smart Contract method to call
- __`Object`__ - __`options`__
    - __`Object`__ - __`abi`__: Smart Contract json interface
    - __`String`__ - __`contractAddress`__: Smart Contract address
    - __`Boolean`__ - __`isWeb3Injected`__: status of the provided Web3 instance (injected or not)
- __`Array`__ - __`params`__: parameters nedeed for calling the method specified

### Returns

- __`Promise`__ : when resolved it returns the value returned by the Smart Contract

### Example
```js
const options = {
  abi,
  contractAddess: 'eth contract address',
}
const value = await utils.eth.makeContractCall(web3, 'balanceOf', true, abi, '' , ['eth address']) //true
```

&nbsp;

## eth.makeContractSend

```js
ptokens.utils.eth.makeContractSend(web3, method, options, params = [])
```

Performs a contract `send` given a Web3 instance and the Smart Contract details.

### Parameters

- __`Object`__ - __`web3`__: Web3 instance
- __`String`__ - __`method`__: Smart Contract method to call
- __`Object`__ - __`options`__
    - __`Object`__ - __`abi`__: Smart Contract json interface
    - __`String`__ - __`contractAddress`__: Smart Contract address
    - __`Object`__ - __`privateKey`__: current Account private key (use when `isWeb3Injected = false` otherwise `null`)
    - __`String`__ - __`value`__: value to send to the Smart Contract
    - __`Boolean`__ - __`isWeb3Injected`__: status of the provided Web3 instance (injected or not)
- __`Array`__ - __`params`__: parameters nedeed for calling the method specified

### Returns

- __`Promise`__ : when resolved it returns the receipt of the transaction performed

### Example
```js
const receipt = await utils.eth.makeContractSend(web3, 'transfer', true, abi, 'eth contract address' , ['eth address']) //true
```

&nbsp;

## eth.waitForTransactionConfirmation

```js
ptokens.utils.eth.waitForTransactionConfirmation(web3, transaction, pollingTime)
```

Allow to wait for a ETH transaction confirmation

### Parameters

- __`Object`__ - __`web3`__: an initialized instance of __Web3__
- __`String`__ - __`transaction`__: Ethereum transaction hash
- __`Number`__ - __`pollingTime`__: time interval to call __web3.eth.getTransactionReceipt__

### Returns

- __`Promise`__ : when resolved returns the confirmed transaction

### Example
```js
const tx = await utils.eth.waitForTransactionConfirmation(web3, '0x8cc2e8f07ac6ae2fab2fbcdb6f8b985383eec42f9ecb589377bdbe60d85bcae1', 2000)
```

&nbsp;

***

&nbsp;