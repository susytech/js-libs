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

const { outNumber } = require('../../format/output');

class Net extends PubsubBase {
  constructor (provider) {
    super(provider);
    this._api = 'susy';
  }

  version (callback) {
    return this.addListener(this._api, 'net_version', callback);
  }

  peerCount (callback) {
    return this.addListener(this._api, 'net_peerCount', (error, data) => {
      error
        ? callback(error)
        : callback(null, outNumber(data));
    });
  }

  listening (callback) {
    return this.addListener(this._api, 'net_listening', callback);
  }
}

module.exports = Net;
