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

const Transport = require('../transport').Ws;

class Ws extends Transport {
  constructor (url, token, autoconnect) {
    super(url, token, autoconnect);

    this.send = this.send.bind(this);
  }

  send (method, params, callback) {
    this
      ._execute(method, params)
      .then((result) => callback(null, result))
      .catch((error) => callback(error));
  }

  get isSusy () {
    return true;
  }
}

module.exports = Ws;
