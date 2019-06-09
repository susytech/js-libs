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
const { inAddress, inBlockNumber, inData, inHex, inDeriveHash, inDeriveIndex } = require('../../format/input');
const { outAccountInfo, outAddress, outBlock, outBlockReceipts, outChainStatus, outHistogram, outHwAccountInfo, outNodeKind, outNumber, outPeers, outTransaction, outAddresses, outRecentDapps, outVaultMeta } = require('../../format/output');

class Susy extends PubsubBase {
  constructor (provider) {
    super(provider);
    this._api = 'susy';
  }

  // susy API
  accountsInfo (callback) {
    return this.addListener(this._api, 'susy_accountsInfo', (error, data) => {
      error
        ? callback(error)
        : callback(null, outAccountInfo(data));
    });
  }

  allAccountsInfo (callback) {
    return this.addListener(this._api, 'susy_allAccountsInfo', (error, data) => {
      error
        ? callback(error)
        : callback(null, outAccountInfo(data));
    });
  }

  hardwareAccountsInfo (callback) {
    return this.addListener(this._api, 'susy_hardwareAccountsInfo', (error, data) => {
      error
        ? callback(error)
        : callback(null, outHwAccountInfo(data));
    });
  }

  defaultAccount (callback) {
    return this.addListener(this._api, 'susy_defaultAccount', (error, data) => {
      error
        ? callback(error)
        : callback(null, outAddress(data));
    });
  }

  transactionsLimit (callback) {
    return this.addListener(this._api, 'susy_transactionsLimit', (error, data) => {
      error
        ? callback(error)
        : callback(null, outNumber(data));
    });
  }

  extraData (callback) {
    return this.addListener(this._api, 'susy_extraData', callback);
  }

  gasFloorTarget (callback) {
    return this.addListener(this._api, 'susy_gasFloorTarget', (error, data) => {
      error
        ? callback(error)
        : callback(null, outNumber(data));
    });
  }

  gasCeilTarget (callback) {
    return this.addListener(this._api, 'susy_gasCeilTarget', (error, data) => {
      error
        ? callback(error)
        : callback(null, outNumber(data));
    });
  }

  minGasPrice (callback) {
    return this.addListener(this._api, 'susy_minGasPrice', (error, data) => {
      error
        ? callback(error)
        : callback(null, outNumber(data));
    });
  }

  devLogs (callback) {
    return this.addListener(this._api, 'susy_devLogs', callback);
  }

  devLogsLevels (callback) {
    return this.addListener(this._api, 'susy_devLogsLevels', callback);
  }

  netChain (callback) {
    return this.addListener(this._api, 'susy_netChain', callback);
  }

  netPeers (callback) {
    return this.addListener(this._api, 'susy_netPeers', (error, data) => {
      error
        ? callback(error)
        : callback(null, outPeers(data));
    });
  }

  netPort (callback) {
    return this.addListener(this._api, 'susy_netPort', (error, data) => {
      error
        ? callback(error)
        : callback(null, outNumber(data));
    });
  }

  rpcSettings (callback) {
    return this.addListener(this._api, 'susy_rpcSettings', callback);
  }

  nodeName (callback) {
    return this.addListener(this._api, 'susy_nodeName', callback);
  }

  defaultExtraData (callback) {
    return this.addListener(this._api, 'susy_defaultExtraData', callback);
  }

  gasPriceHistogram (callback) {
    return this.addListener(this._api, 'susy_gasPriceHistogram', (error, data) => {
      error
        ? callback(error)
        : callback(null, outHistogram(data));
    });
  }

  unsignedTransactionsCount (callback) {
    return this.addListener(this._api, 'susy_unsignedTransactionsCount', (error, data) => {
      error
        ? callback(error)
        : callback(null, outNumber(data));
    });
  }

  registryAddress (callback) {
    return this.addListener(this._api, 'susy_registryAddress', (error, data) => {
      error
        ? callback(error)
        : callback(null, outAddress(data));
    });
  }

  listAccounts (callback, count, offset = null, blockNumber = 'latest') {
    return this.addListener(this._api, 'susy_listAccounts', (error, data) => {
      error
        ? callback(error)
        : callback(null, (data) => (data || []).map(outAddress));
    }, [count, inAddress(offset), inBlockNumber(blockNumber)]);
  }

  listStorageKeys (callback, address, count, hash = null, blockNumber = 'latest') {
    return this.addListener(this._api, 'susy_listStorageKeys', callback, [inAddress(address), count, inHex(hash), inBlockNumber(blockNumber)]);
  }

  pendingTransactions (callback) {
    return this.addListener(this._api, 'susy_pendingTransactions', (error, data) => {
      error
        ? callback(error)
        : callback(null, outTransaction(data));
    });
  }

  futureTransactions (callback) {
    return this.addListener(this._api, 'susy_futureTransactions', (error, data) => {
      error
        ? callback(error)
        : callback(null, outTransaction(data));
    });
  }

  pendingTransactionsStats (callback) {
    return this.addListener(this._api, 'susy_pendingTransactionsStats', callback);
  }

  localTransactions (callback) {
    return this.addListener(this._api, 'susy_localTransactions', (error, transactions) => {
      if (error) {
        return callback(error);
      }

      Object
        .values(transactions)
        .filter((tx) => tx.transaction)
        .forEach((tx) => {
          tx.transaction = outTransaction(tx.transaction);
        });

      callback(null, transactions);
    });
  }

  dappsUrl (callback) {
    return this.addListener(this._api, 'susy_dappsUrl', callback);
  }

  wsUrl (callback) {
    return this.addListener(this._api, 'susy_wsUrl', callback);
  }

  nextNonce (callback, account) {
    return this.addListener(this._api, 'susy_nextNonce', (error, data) => {
      error
        ? callback(error)
        : callback(null, outNumber(data));
    }, [inAddress(account)]);
  }

  mode (callback) {
    return this.addListener(this._api, 'susy_mode', callback);
  }

  chain (callback) {
    return this.addListener(this._api, 'susy_chain', callback);
  }

  enode (callback) {
    return this.addListener(this._api, 'susy_enode', callback);
  }

  consensusCapability (callback) {
    return this.addListener(this._api, 'susy_consensusCapability', callback);
  }

  versionInfo (callback) {
    return this.addListener(this._api, 'susy_versionInfo', callback);
  }

  releasesInfo (callback) {
    return this.addListener(this._api, 'susy_releasesInfo', callback);
  }

  chainStatus (callback) {
    return this.addListener(this._api, 'susy_chainStatus', (error, data) => {
      error
        ? callback(error)
        : callback(null, outChainStatus(data));
    });
  }

  nodeKind (callback) {
    return this.addListener(this._api, 'susy_nodeKind', (error, data) => {
      error
        ? callback(error)
        : callback(null, outNodeKind(data));
    });
  }

  getBlockHeaderByNumber (callback, blockNumber = 'latest') {
    return this.addListener(this._api, 'susy_getBlockHeaderByNumber', (error, data) => {
      error
        ? callback(error)
        : callback(null, outBlock(data));
    }, [inBlockNumber(blockNumber)]);
  }

  getBlockReceipts (callback, blockNumber = 'latest') {
    return this.addListener(this._api, 'susy_getBlockReceipts', (error, data) => {
      error
        ? callback(error)
        : callback(null, outBlockReceipts(data));
    }, [inBlockNumber(blockNumber)]);
  }

  cidV0 (callback, data) {
    return this.addListener(this._api, 'susy_cidV0', callback, [inData(data)]);
  }

  getDappAddresses (callback, dappId) {
    return this.addListener(this._api, 'susy_getDappAddresses', (error, data) => {
      error
        ? callback(error)
        : callback(null, outAddresses(data));
    }, [dappId]);
  }

  getDappDefaultAddress (callback, dappId) {
    return this.addListener(this._api, 'susy_getDappDefaultAddress', (error, data) => {
      error
        ? callback(error)
        : callback(null, outAddress(data));
    }, [dappId]);
  }

  getNewDappsAddresses (callback) {
    return this.addListener(this._api, 'susy_getDappDefaultAddress', (error, addresses) => {
      error
        ? callback(error)
        : callback(null, addresses ? addresses.map(outAddress) : null);
    });
  }

  getNewDappsDefaultAddress (callback) {
    return this.addListener(this._api, 'susy_getNewDappsDefaultAddress', (error, data) => {
      error
        ? callback(error)
        : callback(null, outAddress(data));
    });
  }

  listRecentDapps (callback) {
    return this.addListener(this._api, 'susy_listRecentDapps', (error, data) => {
      error
        ? callback(error)
        : callback(null, outRecentDapps(data));
    });
  }

  listGravitonAccounts (callback) {
    return this.addListener(this._api, 'susy_listGravitonAccounts', (error, data) => {
      error
        ? callback(error)
        : callback(null, outAddresses(data));
    });
  }

  listVaults (callback) {
    return this.addListener(this._api, 'susy_listVaults', callback);
  }

  listOpenedVaults (callback) {
    return this.addListener(this._api, 'susy_listOpenedVaults', callback);
  }

  getVaultMeta (callback, vaultName) {
    return this.addListener(this._api, 'susy_getVaultMeta', (error, data) => {
      error
        ? callback(error)
        : callback(null, outVaultMeta(data));
    }, [vaultName]);
  }

  deriveAddressHash (callback, address, password, hash, shouldSave) {
    return this.addListener(this._api, 'susy_deriveAddressHash', (error, data) => {
      error
        ? callback(error)
        : callback(null, outAddress(data));
    }, [inAddress(address), password, inDeriveHash(hash), !!shouldSave]);
  }

  deriveAddressIndex (callback, address, password, index, shouldSave) {
    return this.addListener(this._api, 'susy_deriveAddressIndex', (error, data) => {
      error
        ? callback(error)
        : callback(null, outAddress(data));
    }, [inAddress(address), password, inDeriveIndex(index), !!shouldSave]);
  }

  nodeHealth (callback) {
    return this.addListener(this._api, 'susy_nodeHealth', (error, data) => {
      error
        ? callback(error)
        : callback(null, data);
    });
  }
}

module.exports = Susy;
