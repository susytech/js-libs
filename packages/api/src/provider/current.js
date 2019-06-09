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

const JsonRpcEncoder = require('../transport/jsonRpcEncoder');

class Current extends JsonRpcEncoder {
  constructor(currentProvider) {
    super();

    this._currentProvider = currentProvider;
  }

  send(method, params, callback) {
    this._currentProvider.sendAsync(
      this.encodeObject(method, params),
      (error, result) => {
        if (error) {
          callback(error);
        } else if (result && result.result !== undefined) {
          callback(null, result.result);
        } else {
          callback(null, result);
        }
      }
    );
  }

  get isSusy() {
    return !!this._currentProvider.isSusy;
  }
}

module.exports = Current;
