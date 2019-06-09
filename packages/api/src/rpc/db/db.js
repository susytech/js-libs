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

const { inHex } = require('../../format/input');

class Db {
  constructor (transport) {
    this._transport = transport;
  }

  getHex (dbName, keyName) {
    return this._transport
      .send('db_getHex', dbName, keyName);
  }

  getString (dbName, keyName) {
    return this._transport
      .send('db_getString', dbName, keyName);
  }

  putHex (dbName, keyName, hexData) {
    return this._transport
      .send('db_putHex', dbName, keyName, inHex(hexData));
  }

  putString (dbName, keyName, stringData) {
    return this._transport
      .send('db_putString', dbName, keyName, stringData);
  }
}

module.exports = Db;
