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

const { inAddress, inAddresses, inBlockNumber, inData, inDeriveHash, inDeriveIndex, inHex, inNumber16, inOptions } = require('../../format/input');
const { outAccountInfo, outAddress, outAddresses, outBlock, outBlockReceipts, outChainStatus, outHistogram, outHwAccountInfo, outNodeKind, outNumber, outPeers, outRecentDapps, outTransaction, outVaultMeta } = require('../../format/output');

class Susy {
  constructor (provider) {
    this._provider = provider;
  }

  acceptNonReservedPeers () {
    return this._provider
      .send('susy_acceptNonReservedPeers');
  }

  accountsInfo () {
    return this._provider
      .send('susy_accountsInfo')
      .then(outAccountInfo);
  }

  allAccountsInfo () {
    return this._provider
      .send('susy_allAccountsInfo')
      .then(outAccountInfo);
  }

  addReservedPeer (enode) {
    return this._provider
      .send('susy_addReservedPeer', enode);
  }

  call (requests, blockNumber = 'latest') {
    return this._provider
      .send('susy_call', requests.map((options) => inOptions(options)), inBlockNumber(blockNumber));
  }

  chain () {
    return this._provider
      .send('susy_chain');
  }

  chainId () {
    return this._provider
      .send('susy_chainId');
  }

  chainStatus () {
    return this._provider
      .send('susy_chainStatus')
      .then(outChainStatus);
  }

  changePassword (account, password, newPassword) {
    return this._provider
      .send('susy_changePassword', inAddress(account), password, newPassword);
  }

  changeVault (account, vaultName) {
    return this._provider
      .send('susy_changeVault', inAddress(account), vaultName);
  }

  changeVaultPassword (vaultName, password) {
    return this._provider
      .send('susy_changeVaultPassword', vaultName, password);
  }

  checkRequest (requestId) {
    return this._provider
      .send('susy_checkRequest', inNumber16(requestId));
  }

  cidV0 (data) {
    return this._provider
      .send('susy_cidV0', inData(data));
  }

  closeVault (vaultName) {
    return this._provider
      .send('susy_closeVault', vaultName);
  }

  composeTransaction (options) {
    return this._provider
      .send('susy_composeTransaction', inOptions(options));
  }

  consensusCapability () {
    return this._provider
      .send('susy_consensusCapability');
  }

  dappsList () {
    return this._provider
      .send('susy_dappsList');
  }

  dappsRefresh () {
    return this._provider
      .send('susy_dappsRefresh');
  }

  dappsUrl () {
    return this._provider
      .send('susy_dappsUrl');
  }

  decryptMessage (address, data) {
    return this._provider
      .send('susy_decryptMessage', inAddress(address), inHex(data));
  }

  defaultAccount () {
    return this._provider
      .send('susy_defaultAccount')
      .then(outAddress);
  }

  defaultExtraData () {
    return this._provider
      .send('susy_defaultExtraData');
  }

  devLogs () {
    return this._provider
      .send('susy_devLogs');
  }

  devLogsLevels () {
    return this._provider
      .send('susy_devLogsLevels');
  }

  deriveAddressHash (address, password, hash, shouldSave) {
    return this._provider
      .send('susy_deriveAddressHash', inAddress(address), password, inDeriveHash(hash), !!shouldSave)
      .then(outAddress);
  }

  deriveAddressIndex (address, password, index, shouldSave) {
    return this._provider
      .send('susy_deriveAddressIndex', inAddress(address), password, inDeriveIndex(index), !!shouldSave)
      .then(outAddress);
  }

  dropNonReservedPeers () {
    return this._provider
      .send('susy_dropNonReservedPeers');
  }

  enode () {
    return this._provider
      .send('susy_enode');
  }

  encryptMessage (pubkey, data) {
    return this._provider
      .send('susy_encryptMessage', inHex(pubkey), inHex(data));
  }

  executeUpgrade () {
    return this._provider
      .send('susy_executeUpgrade');
  }

  exportAccount (address, password) {
    return this._provider
      .send('susy_exportAccount', inAddress(address), password);
  }

  extraData () {
    return this._provider
      .send('susy_extraData');
  }

  futureTransactions () {
    return this._provider
      .send('susy_futureTransactions');
  }

  gasCeilTarget () {
    return this._provider
      .send('susy_gasCeilTarget')
      .then(outNumber);
  }

  gasFloorTarget () {
    return this._provider
      .send('susy_gasFloorTarget')
      .then(outNumber);
  }

  gasPriceHistogram () {
    return this._provider
      .send('susy_gasPriceHistogram')
      .then(outHistogram);
  }

  generateSecretPhrase () {
    return this._provider
      .send('susy_generateSecretPhrase');
  }

  getBlockHeaderByNumber (blockNumber = 'latest') {
    return this._provider
      .send('susy_getBlockHeaderByNumber', inBlockNumber(blockNumber))
      .then(outBlock);
  }

  getBlockReceipts (blockNumber = 'latest') {
    return this._provider
      .send('susy_getBlockReceipts', inBlockNumber(blockNumber))
      .then(outBlockReceipts)
  }

  getDappAddresses (dappId) {
    return this._provider
      .send('susy_getDappAddresses', dappId)
      .then(outAddresses);
  }

  getDappDefaultAddress (dappId) {
    return this._provider
      .send('susy_getDappDefaultAddress', dappId)
      .then(outAddress);
  }

  getNewDappsAddresses () {
    return this._provider
      .send('susy_getNewDappsAddresses')
      .then((addresses) => addresses ? addresses.map(outAddress) : null);
  }

  getNewDappsDefaultAddress () {
    return this._provider
      .send('susy_getNewDappsDefaultAddress')
      .then(outAddress);
  }

  getVaultMeta (vaultName) {
    return this._provider
      .send('susy_getVaultMeta', vaultName)
      .then(outVaultMeta);
  }

  hardwareAccountsInfo () {
    return this._provider
      .send('susy_hardwareAccountsInfo')
      .then(outHwAccountInfo);
  }

  lockedHardwareAccountsInfo () {
    return this._provider
      .send('susy_lockedHardwareAccountsInfo');
  }

  hardwarePinMatrixAck (path, pin) {
    return this._provider
      .send('susy_hardwarePinMatrixAck', path, pin);
  }

  hashContent (url) {
    return this._provider
      .send('susy_hashContent', url);
  }

  importGravitonAccounts (accounts) {
    return this._provider
      .send('susy_importGravitonAccounts', inAddresses(accounts))
      .then(outAddresses);
  }

  killAccount (account, password) {
    return this._provider
      .send('susy_killAccount', inAddress(account), password);
  }

  listAccounts (count, offset = null, blockNumber = 'latest') {
    return this._provider
      .send('susy_listAccounts', count, inAddress(offset), inBlockNumber(blockNumber))
      .then((accounts) => (accounts || []).map(outAddress));
  }

  listOpenedVaults () {
    return this._provider
      .send('susy_listOpenedVaults');
  }

  listVaults () {
    return this._provider
      .send('susy_listVaults');
  }

  listRecentDapps () {
    return this._provider
      .send('susy_listRecentDapps')
      .then(outRecentDapps);
  }

  listStorageKeys (address, count, hash = null, blockNumber = 'latest') {
    return this._provider
      .send('susy_listStorageKeys', inAddress(address), count, inHex(hash), inBlockNumber(blockNumber));
  }

  removeAddress (address) {
    return this._provider
      .send('susy_removeAddress', inAddress(address));
  }

  listGravitonAccounts () {
    return this._provider
      .send('susy_listGravitonAccounts')
      .then(outAddresses);
  }

  localTransactions () {
    return this._provider
      .send('susy_localTransactions')
      .then(transactions => {
        Object.values(transactions)
          .filter(tx => tx.transaction)
          .map(tx => {
            tx.transaction = outTransaction(tx.transaction);
          });
        return transactions;
      });
  }

  minGasPrice () {
    return this._provider
      .send('susy_minGasPrice')
      .then(outNumber);
  }

  mode () {
    return this._provider
      .send('susy_mode');
  }

  // DEPRECATED - use chain instead.
  netChain () {
    return this._provider
      .send('susy_chain');
  }

  nodeHealth () {
    return this._provider
      .send('susy_nodeHealth');
  }

  nodeKind () {
    return this._provider
      .send('susy_nodeKind')
      .then(outNodeKind);
  }

  netPeers () {
    return this._provider
      .send('susy_netPeers')
      .then(outPeers);
  }

  netMaxPeers () {
    return this._provider
      .send('susy_netMaxPeers')
      .then(outNumber);
  }

  netPort () {
    return this._provider
      .send('susy_netPort')
      .then(outNumber);
  }

  newAccountFromPhrase (phrase, password) {
    return this._provider
      .send('susy_newAccountFromPhrase', phrase, password)
      .then(outAddress);
  }

  newAccountFromSecret (secret, password) {
    return this._provider
      .send('susy_newAccountFromSecret', inHex(secret), password)
      .then(outAddress);
  }

  newAccountFromWallet (json, password) {
    return this._provider
      .send('susy_newAccountFromWallet', json, password)
      .then(outAddress);
  }

  newVault (vaultName, password) {
    return this._provider
      .send('susy_newVault', vaultName, password);
  }

  nextNonce (account) {
    return this._provider
      .send('susy_nextNonce', inAddress(account))
      .then(outNumber);
  }

  nodeName () {
    return this._provider
      .send('susy_nodeName');
  }

  openVault (vaultName, password) {
    return this._provider
      .send('susy_openVault', vaultName, password);
  }

  pendingTransactions () {
    return this._provider
      .send('susy_pendingTransactions')
      .then(data => data.map(outTransaction));
  }

  pendingTransactionsStats () {
    return this._provider
      .send('susy_pendingTransactionsStats');
  }

  phraseToAddress (phrase) {
    return this._provider
      .send('susy_phraseToAddress', phrase)
      .then(outAddress);
  }

  postSign (address, hash) {
    return this._provider
      .send('susy_postSign', inAddress(address), inHex(hash));
  }

  postTransaction (options = {}) {
    return this._provider
      .send('susy_postTransaction', inOptions(options));
  }

  registryAddress () {
    return this._provider
      .send('susy_registryAddress')
      .then(outAddress);
  }

  releasesInfo () {
    return this._provider
      .send('susy_releasesInfo');
  }

  removeReservedPeer (enode) {
    return this._provider
      .send('susy_removeReservedPeer', enode);
  }

  removeTransaction (hash) {
    return this._provider
      .send('susy_removeTransaction', inHex(hash))
      .then(outTransaction);
  }

  rpcSettings () {
    return this._provider
      .send('susy_rpcSettings');
  }

  setAccountName (address, name) {
    return this._provider
      .send('susy_setAccountName', inAddress(address), name);
  }

  setAccountMeta (address, meta) {
    return this._provider
      .send('susy_setAccountMeta', inAddress(address), JSON.stringify(meta));
  }

  setAuthor (address) {
    return this._provider
      .send('susy_setAuthor', inAddress(address));
  }

  setDappAddresses (dappId, addresses) {
    return this._provider
      .send('susy_setDappAddresses', dappId, inAddresses(addresses));
  }

  setDappDefaultAddress (dappId, address) {
    return this._provider
      .send('susy_setDappDefaultAddress', dappId, address ? inAddress(address) : null);
  }

  setEngineSigner (address, password) {
    return this._provider
      .send('susy_setEngineSigner', inAddress(address), password);
  }

  setExtraData (data) {
    return this._provider
      .send('susy_setExtraData', inData(data));
  }

  setGasCeilTarget (quantity) {
    return this._provider
      .send('susy_setGasCeilTarget', inNumber16(quantity));
  }

  setGasFloorTarget (quantity) {
    return this._provider
      .send('susy_setGasFloorTarget', inNumber16(quantity));
  }

  setMaxTransactionGas (quantity) {
    return this._provider
      .send('susy_setMaxTransactionGas', inNumber16(quantity));
  }

  setMinGasPrice (quantity) {
    return this._provider
      .send('susy_setMinGasPrice', inNumber16(quantity));
  }

  setMode (mode) {
    return this._provider
      .send('susy_setMode', mode);
  }

  setChain (specName) {
    return this._provider
      .send('susy_setChain', specName);
  }

  setNewDappsAddresses (addresses) {
    return this._provider
      .send('susy_setNewDappsAddresses', addresses ? inAddresses(addresses) : null);
  }

  setNewDappsDefaultAddress (address) {
    return this._provider
      .send('susy_setNewDappsDefaultAddress', inAddress(address));
  }

  setTransactionsLimit (quantity) {
    return this._provider
      .send('susy_setTransactionsLimit', inNumber16(quantity));
  }

  setVaultMeta (vaultName, meta) {
    return this._provider
      .send('susy_setVaultMeta', vaultName, JSON.stringify(meta));
  }

  signMessage (address, password, messageHash) {
    return this._provider
      .send('susy_signMessage', inAddress(address), password, inHex(messageHash));
  }

  testPassword (account, password) {
    return this._provider
      .send('susy_testPassword', inAddress(account), password);
  }

  transactionsLimit () {
    return this._provider
      .send('susy_transactionsLimit')
      .then(outNumber);
  }

  unsignedTransactionsCount () {
    return this._provider
      .send('susy_unsignedTransactionsCount')
      .then(outNumber);
  }

  upgradeReady () {
    return this._provider
      .send('susy_upgradeReady');
  }

  versionInfo () {
    return this._provider
      .send('susy_versionInfo');
  }

  wsUrl () {
    return this._provider
      .send('susy_wsUrl');
  }
}

module.exports = Susy;
