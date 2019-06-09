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

describe('sofapi.trace', () => {
  const sofapi = createHttpApi();

  describe('block', () => {
    it('returns the latest block traces', () => {
      return sofapi.trace.block().then((traces) => {
        expect(traces).to.be.ok;
      });
    });

    it('returns traces for a specified block', () => {
      return sofapi.trace.block('0x65432').then((traces) => {
        expect(traces).to.be.ok;
      });
    });
  });

  describe('replayTransaction', () => {
    it('returns traces for a specific transaction', () => {
      return sofapi.sof.getBlockByNumber().then((latestBlock) => {
        return sofapi.trace.replayTransaction(latestBlock.transactions[0]).then((traces) => {
          expect(traces).to.be.ok;
        });
      });
    });
  });
});
