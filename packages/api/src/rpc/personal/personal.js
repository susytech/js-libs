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

const { inAddress, inNumber16, inOptions } = require('../../format/input');
const { outAddress } = require('../../format/output');

class Personal {
  constructor (provider) {
    this._provider = provider;
  }

  listAccounts () {
    return this._provider
      .send('personal_listAccounts')
      .then((accounts) => (accounts || []).map(outAddress));
  }

  newAccount (password) {
    return this._provider
      .send('personal_newAccount', password)
      .then(outAddress);
  }

  signTransaction(options, password) {
    return this._provider
      .send('personal_signTransaction', inOptions(options), password);
  }

  sendTransaction (options, password) {
    return this._provider
      .send('personal_sendTransaction', inOptions(options), password);
  }

  unlockAccount (account, password, duration = 1) {
    return this._provider
      .send('personal_unlockAccount', inAddress(account), password, inNumber16(duration));
  }
}

module.exports = Personal;
