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

const { TEST_HTTP_URL, mockHttp } = require('../../../test/mockRpc');

const { Http, PromiseProvider } = require('../../provider');
const Web3 = require('./web3');

const instance = new Web3(new PromiseProvider(new Http(TEST_HTTP_URL, -1)));

describe('rpc/Web3', () => {
  let scope;

  describe('sha3', () => {
    beforeEach(() => {
      scope = mockHttp([{ method: 'web3_sha3', reply: { result: [] } }]);
    });

    it('formats the inputs correctly', () => {
      return instance.sha3('1234').then(() => {
        expect(scope.body.web3_sha3.params).to.deep.equal(['0x1234']);
      });
    });
  });
});
