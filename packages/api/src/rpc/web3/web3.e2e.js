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

const { createHttpApi } = require('../../test/e2e/sofapi');
const { isHexNumber } = require('../../test/types');

describe('sofapi.web3', () => {
  const sofapi = createHttpApi();

  describe('clientVersion', () => {
    it('returns the client version', () => {
      return sofapi.web3.clientVersion().then((version) => {
        const [client] = version.split('/');

        expect(client === 'Susy' || client === 'Graviton').to.be.ok;
      });
    });
  });

  describe('sha3', () => {
    it('returns a keccak256 sha', () => {
      const sha = '0xa7916fac4f538170f7cd12c148552e2cba9fcd72329a2dd5b07a6fa906488ddf';
      const hexStr = 'baz()'.split('').map((char) => char.charCodeAt(0).toString(16)).join('');

      return sofapi.web3.sha3(`0x${hexStr}`).then((hash) => {
        expect(isHexNumber(hash)).to.be.true;
        expect(hash).to.equal(sha);
      });
    });
  });
});
