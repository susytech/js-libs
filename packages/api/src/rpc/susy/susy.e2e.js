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

describe('sofapi.susy', () => {
  const sofapi = createHttpApi();

  describe('chainStatus', () => {
    it('returns and translates the status', () => {
      return sofapi.susy.chainStatus().then((value) => {
        expect(value).to.be.ok;
      });
    });
  });

  describe('gasFloorTarget', () => {
    it('returns and translates the target', () => {
      return sofapi.susy.gasFloorTarget().then((value) => {
        expect(value.gt(0)).to.be.true;
      });
    });
  });

  describe('gasPriceHistogram', () => {
    it('returns and translates the target', () => {
      return sofapi.susy.gasPriceHistogram().then((result) => {
        expect(Object.keys(result)).to.deep.equal(['bucketBounds', 'counts']);
        expect(result.bucketBounds.length > 0).to.be.true;
        expect(result.counts.length > 0).to.be.true;
      });
    });
  });

  describe('netChain', () => {
    it('returns and the chain', () => {
      return sofapi.susy.netChain().then((value) => {
        expect(value).to.equal('morden');
      });
    });
  });

  describe('netPort', () => {
    it('returns and translates the port', () => {
      return sofapi.susy.netPort().then((value) => {
        expect(value.gt(0)).to.be.true;
      });
    });
  });

  describe('transactionsLimit', () => {
    it('returns and translates the limit', () => {
      return sofapi.susy.transactionsLimit().then((value) => {
        expect(value.gt(0)).to.be.true;
      });
    });
  });

  describe('rpcSettings', () => {
    it('returns and translates the settings', () => {
      return sofapi.susy.rpcSettings().then((value) => {
        expect(value).to.be.ok;
      });
    });
  });
});
