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
const PubsubBase = require('../pubsubBase');

const {
  inAddress,
  inBlockNumber,
  inHex,
  inNumber16,
  inOptions,
  inFilter
} = require('../../format/input');
const {
  outAddress,
  outBlock,
  outNumber,
  outTransaction,
  outSyncing,
  outReceipt,
  outLog
} = require('../../format/output');

class Sof extends PubsubBase {
  constructor(provider) {
    super(provider);
    this._api = 'susy';
  }

  newHeads(callback) {
    return this.addListener(
      'sof',
      'newHeads',
      (error, data) => {
        error ? callback(error) : callback(null, outBlock(data));
      },
      null
    );
  }

  syncing(callback) {
    return this.addListener(
      'sof',
      'syncing',
      (error, data) => {
        error ? callback(error) : callback(null, outSyncing(data));
      },
      null
    );
  }

  logs(callback) {
    throw Error('not supported yet');
  }

  //  sof API
  protocolVersion(callback) {
    return this.addListener(this._api, 'sof_protocolVersion', callback);
  }

  hashrate(callback) {
    return this.addListener(this._api, 'sof_hashrate', (error, data) => {
      error ? callback(error) : callback(null, outNumber(data));
    });
  }

  coinbase(callback) {
    return this.addListener(this._api, 'sof_coinbase', (error, data) => {
      error ? callback(error) : callback(null, outAddress(data));
    });
  }

  mining(callback) {
    return this.addListener(this._api, 'sof_mining', callback);
  }

  gasPrice(callback) {
    return this.addListener(this._api, 'sof_gasPrice', (error, data) => {
      error ? callback(error) : callback(null, outNumber(data));
    });
  }

  accounts(callback) {
    return this.addListener(this._api, 'sof_accounts', (error, accounts) => {
      error
        ? callback(error)
        : callback(null, (accounts || []).map(outAddress));
    });
  }

  blockNumber(callback) {
    return this.addListener(this._api, 'sof_blockNumber', (error, data) => {
      error ? callback(error) : callback(null, outNumber(data));
    });
  }

  getBalance(callback, address, blockNumber = 'latest') {
    return this.addListener(
      this._api,
      'sof_getBalance',
      (error, data) => {
        error ? callback(error) : callback(null, outNumber(data));
      },
      [inAddress(address), inBlockNumber(blockNumber)]
    );
  }

  getStorageAt(callback, address, index = 0, blockNumber = 'latest') {
    return this.addListener(this._api, 'sof_getStorageAt', callback, [
      inAddress(address),
      inNumber16(index),
      inBlockNumber(blockNumber)
    ]);
  }

  getBlockByHash(callback, hash, full = false) {
    return this.addListener(
      this._api,
      'sof_getBlockByHash',
      (error, data) => {
        error ? callback(error) : callback(null, outBlock(data));
      },
      [inHex(hash), full]
    );
  }

  getBlockByNumber(callback, blockNumber = 'latest', full = false) {
    return this.addListener(
      this._api,
      'sof_getBlockByNumber',
      (error, data) => {
        error ? callback(error) : callback(null, outBlock(data));
      },
      [inBlockNumber(blockNumber), full]
    );
  }

  getTransactionCount(callback, address, blockNumber = 'latest') {
    return this.addListener(
      this._api,
      'sof_getTransactionCount',
      (error, data) => {
        error ? callback(error) : callback(null, outNumber(data));
      },
      [inAddress(address), inBlockNumber(blockNumber)]
    );
  }

  getBlockTransactionCountByHash(callback, hash) {
    return this.addListener(
      this._api,
      'sof_getBlockTransactionCountByHash',
      (error, data) => {
        error ? callback(error) : callback(null, outNumber(data));
      },
      [inHex(hash)]
    );
  }

  getBlockTransactionCountByNumber(callback, blockNumber = 'latest') {
    return this.addListener(
      this._api,
      'sof_getBlockTransactionCountByNumber',
      (error, data) => {
        error ? callback(error) : callback(null, outNumber(data));
      },
      [inBlockNumber(blockNumber)]
    );
  }

  getUncleCountByBlockHash(callback, hash) {
    return this.addListener(
      this._api,
      'sof_getUncleCountByBlockHash',
      (error, data) => {
        error ? callback(error) : callback(null, outNumber(data));
      },
      [inHex(hash)]
    );
  }

  getUncleCountByBlockNumber(callback, blockNumber = 'latest') {
    return this.addListener(
      this._api,
      'sof_getUncleCountByBlockNumber',
      (error, data) => {
        error ? callback(error) : callback(null, outNumber(data));
      },
      [inBlockNumber(blockNumber)]
    );
  }

  getCode(callback, address, blockNumber = 'latest') {
    return this.addListener(this._api, 'sof_getCode', callback, [
      inAddress(address),
      inBlockNumber(blockNumber)
    ]);
  }

  call(callback, options, blockNumber = 'latest') {
    return this.addListener(this._api, 'sof_call', callback, [
      inOptions(options),
      inBlockNumber(blockNumber)
    ]);
  }

  estimateGas(callback, options) {
    return this.addListener(
      this._api,
      'sof_estimateGas',
      (error, data) => {
        error ? callback(error) : callback(null, outNumber(data));
      },
      [inOptions(options)]
    );
  }

  getTransactionByHash(callback, hash) {
    return this.addListener(
      this._api,
      'sof_getTransactionByHash',
      (error, data) => {
        error ? callback(error) : callback(null, outTransaction(data));
      },
      [inHex(hash)]
    );
  }

  getTransactionByBlockHashAndIndex(callback, hash, index = 0) {
    return this.addListener(
      this._api,
      'sof_getTransactionByBlockHashAndIndex',
      (error, data) => {
        error ? callback(error) : callback(null, outTransaction(data));
      },
      [inHex(hash), inNumber16(index)]
    );
  }

  getTransactionByBlockNumberAndIndex(
    callback,
    blockNumber = 'latest',
    index = 0
  ) {
    return this.addListener(
      this._api,
      'sof_getTransactionByBlockNumberAndIndex',
      (error, data) => {
        error ? callback(error) : callback(null, outTransaction(data));
      },
      [inBlockNumber(blockNumber), inNumber16(index)]
    );
  }

  getTransactionReceipt(callback, txhash) {
    return this.addListener(
      this._api,
      'sof_getTransactionReceipt',
      (error, data) => {
        error ? callback(error) : callback(null, outReceipt(data));
      },
      [inHex(txhash)]
    );
  }

  getUncleByBlockHashAndIndex(callback, hash, index = 0) {
    return this.addListener(
      this._api,
      'sof_getUncleByBlockHashAndIndex',
      callback,
      [inHex(hash), inNumber16(index)]
    );
  }

  getUncleByBlockNumberAndIndex(callback, blockNumber = 'latest', index = 0) {
    return this.addListener(
      this._api,
      'sof_getUncleByBlockNumberAndIndex',
      callback,
      [inBlockNumber(blockNumber), inNumber16(index)]
    );
  }

  getLogs(callback, options) {
    return this.addListener(
      this._api,
      'sof_getLogs',
      (error, logs) => {
        error ? callback(error) : callback(null, logs => logs.map(outLog));
      },
      [inFilter(options)]
    );
  }

  getWork(callback) {
    return this.addListener(this._api, 'sof_getWork', callback);
  }
}

module.exports = Sof;
