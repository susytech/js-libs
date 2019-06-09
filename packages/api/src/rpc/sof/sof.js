// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.

// Susy is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Susy is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MSRCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Susy.  If not, see <http://www.gnu.org/licenses/>.

const { inAddress, inBlockNumber, inData, inFilter, inHash, inHex, inNumber16, inOptions } = require('../../format/input');
const { outAddress, outBlock, outLog, outNumber, outReceipt, outSyncing, outTransaction } = require('../../format/output');

class Sof {
  constructor (provider) {
    this._provider = provider;
  }

  accounts () {
    return this._provider
      .send('sof_accounts')
      .then((accounts) => (accounts || []).map(outAddress));
  }

  blockNumber () {
    return this._provider
      .send('sof_blockNumber')
      .then(outNumber);
  }

  call (options, blockNumber = 'latest') {
    return this._provider
      .send('sof_call', inOptions(options), inBlockNumber(blockNumber));
  }

  chainId () {
    return this._provider
      .send('sof_chainId')
      .then(outNumber);
  }

  coinbase () {
    return this._provider
      .send('sof_coinbase')
      .then(outAddress);
  }

  compileLLL (code) {
    return this._provider
      .send('sof_compileLLL', inData(code));
  }

  compileSerpent (code) {
    return this._provider
      .send('sof_compileSerpent', inData(code));
  }

  compileSolidity (code) {
    return this._provider
      .send('sof_compileSolidity', inData(code));
  }

  estimateGas (options) {
    return this._provider
      .send('sof_estimateGas', inOptions(options))
      .then(outNumber);
  }

  fetchQueuedTransactions () {
    return this._provider
      .send('sof_fetchQueuedTransactions');
  }

  flush () {
    return this._provider
      .send('sof_flush');
  }

  gasPrice () {
    return this._provider
      .send('sof_gasPrice')
      .then(outNumber);
  }

  getBalance (address, blockNumber = 'latest') {
    return this._provider
      .send('sof_getBalance', inAddress(address), inBlockNumber(blockNumber))
      .then(outNumber);
  }

  getBlockByHash (hash, full = false) {
    return this._provider
      .send('sof_getBlockByHash', inHex(hash), full)
      .then(outBlock);
  }

  getBlockByNumber (blockNumber = 'latest', full = false) {
    return this._provider
      .send('sof_getBlockByNumber', inBlockNumber(blockNumber), full)
      .then(outBlock);
  }

  getBlockTransactionCountByHash (hash) {
    return this._provider
      .send('sof_getBlockTransactionCountByHash', inHex(hash))
      .then(outNumber);
  }

  getBlockTransactionCountByNumber (blockNumber = 'latest') {
    return this._provider
      .send('sof_getBlockTransactionCountByNumber', inBlockNumber(blockNumber))
      .then(outNumber);
  }

  getCode (address, blockNumber = 'latest') {
    return this._provider
      .send('sof_getCode', inAddress(address), inBlockNumber(blockNumber));
  }

  getCompilers () {
    return this._provider
      .send('sof_getCompilers');
  }

  getFilterChanges (filterId) {
    return this._provider
      .send('sof_getFilterChanges', inNumber16(filterId))
      .then((logs) => logs.map(outLog));
  }

  getFilterChangesEx (filterId) {
    return this._provider
      .send('sof_getFilterChangesEx', inNumber16(filterId));
  }

  getFilterLogs (filterId) {
    return this._provider
      .send('sof_getFilterLogs', inNumber16(filterId))
      .then((logs) => logs.map(outLog));
  }

  getFilterLogsEx (filterId) {
    return this._provider
      .send('sof_getFilterLogsEx', inNumber16(filterId));
  }

  getLogs (options) {
    return this._provider
      .send('sof_getLogs', inFilter(options))
      .then((logs) => logs.map(outLog));
  }

  getLogsEx (options) {
    return this._provider
      .send('sof_getLogsEx', inFilter(options));
  }

  getStorageAt (address, index = 0, blockNumber = 'latest') {
    return this._provider
      .send('sof_getStorageAt', inAddress(address), inNumber16(index), inBlockNumber(blockNumber));
  }

  getTransactionByBlockHashAndIndex (hash, index = 0) {
    return this._provider
      .send('sof_getTransactionByBlockHashAndIndex', inHex(hash), inNumber16(index))
      .then(outTransaction);
  }

  getTransactionByBlockNumberAndIndex (blockNumber = 'latest', index = 0) {
    return this._provider
      .send('sof_getTransactionByBlockNumberAndIndex', inBlockNumber(blockNumber), inNumber16(index))
      .then(outTransaction);
  }

  getTransactionByHash (hash) {
    return this._provider
      .send('sof_getTransactionByHash', inHex(hash))
      .then(outTransaction);
  }

  getTransactionCount (address, blockNumber = 'latest') {
    return this._provider
      .send('sof_getTransactionCount', inAddress(address), inBlockNumber(blockNumber))
      .then(outNumber);
  }

  getTransactionReceipt (txhash) {
    return this._provider
      .send('sof_getTransactionReceipt', inHex(txhash))
      .then(outReceipt);
  }

  getUncleByBlockHashAndIndex (hash, index = 0) {
    return this._provider
      .send('sof_getUncleByBlockHashAndIndex', inHex(hash), inNumber16(index));
  }

  getUncleByBlockNumberAndIndex (blockNumber = 'latest', index = 0) {
    return this._provider
      .send('sof_getUncleByBlockNumberAndIndex', inBlockNumber(blockNumber), inNumber16(index));
  }

  getUncleCountByBlockHash (hash) {
    return this._provider
      .send('sof_getUncleCountByBlockHash', inHex(hash))
      .then(outNumber);
  }

  getUncleCountByBlockNumber (blockNumber = 'latest') {
    return this._provider
      .send('sof_getUncleCountByBlockNumber', inBlockNumber(blockNumber))
      .then(outNumber);
  }

  getWork () {
    return this._provider
      .send('sof_getWork');
  }

  hashrate () {
    return this._provider
      .send('sof_hashrate')
      .then(outNumber);
  }

  inspectTransaction () {
    return this._provider
      .send('sof_inspectTransaction');
  }

  mining () {
    return this._provider
      .send('sof_mining');
  }

  newBlockFilter () {
    return this._provider
      .send('sof_newBlockFilter');
  }

  newFilter (options) {
    return this._provider
      .send('sof_newFilter', inFilter(options));
  }

  newFilterEx (options) {
    return this._provider
      .send('sof_newFilterEx', inFilter(options));
  }

  newPendingTransactionFilter () {
    return this._provider
      .send('sof_newPendingTransactionFilter');
  }

  notePassword () {
    return this._provider
      .send('sof_notePassword');
  }

  pendingTransactions () {
    return this._provider
      .send('sof_pendingTransactions');
  }

  protocolVersion () {
    return this._provider
      .send('sof_protocolVersion');
  }

  register () {
    return this._provider
      .send('sof_register');
  }

  sendRawTransaction (data) {
    return this._provider
      .send('sof_sendRawTransaction', inData(data));
  }

  sendTransaction (options) {
    return this._provider
      .send('sof_sendTransaction', inOptions(options));
  }

  sign (address, hash) {
    return this._provider
      .send('sof_sign', inAddress(address), inHash(hash));
  }

  signTransaction (options) {
    return this._provider
      .send('sof_signTransaction', inOptions(options));
  }

  submitHashrate (hashrate, clientId) {
    return this._provider
      .send('sof_submitHashrate', inNumber16(hashrate), clientId);
  }

  submitWork (nonce, powHash, mixDigest) {
    return this._provider
      .send('sof_submitWork', inNumber16(nonce), powHash, mixDigest);
  }

  syncing () {
    return this._provider
      .send('sof_syncing')
      .then(outSyncing);
  }

  uninstallFilter (filterId) {
    return this._provider
      .send('sof_uninstallFilter', inHex(filterId));
  }

  unregister () {
    return this._provider
      .send('sof_unregister');
  }
}

module.exports = Sof;
