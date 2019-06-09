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

const { inData, inNumber16, inOptions } = require('../../format/input');
const { outSignerRequest } = require('../../format/output');

class Signer {
  constructor (provider) {
    this._provider = provider;
  }

  confirmRequest (requestId, options, password) {
    return this._provider
      .send('signer_confirmRequest', inNumber16(requestId), inOptions(options), password);
  }

  confirmRequestRaw (requestId, data) {
    return this._provider
      .send('signer_confirmRequestRaw', inNumber16(requestId), inData(data));
  }

  confirmRequestWithToken (requestId, options, password) {
    return this._provider
      .send('signer_confirmRequestWithToken', inNumber16(requestId), inOptions(options), password);
  }

  generateAuthorizationToken () {
    return this._provider
      .send('signer_generateAuthorizationToken');
  }

  generateWebProxyAccessToken (domain) {
    return this._provider
      .execute('signer_generateWebProxyAccessToken', domain);
  }

  rejectRequest (requestId) {
    return this._provider
      .send('signer_rejectRequest', inNumber16(requestId));
  }

  requestsToConfirm () {
    return this._provider
      .send('signer_requestsToConfirm')
      .then((requests) => (requests || []).map(outSignerRequest));
  }

  signerEnabled () {
    return this._provider
      .send('signer_signerEnabled');
  }
}

module.exports = Signer;
