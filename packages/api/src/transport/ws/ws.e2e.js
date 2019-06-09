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

/* eslint-disable no-unused-expressions */

const Ws = require('./ws');

const ws = new Ws('ws://localhost:8546/');

describe('transport/WsSecure', () => {
  it('connects and makes a call to web3_clientVersion', () => {
    return ws.execute('web3_clientVersion').then((version) => {
      const [client] = version.split('/');

      expect(client === 'Graviton' || client === 'Susy').to.be.ok;
    });
  });
});
