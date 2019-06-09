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
const { isAddress } = require('../../test/types');

describe('sofapi.sof', () => {
  const sofapi = createHttpApi();
  const address = '0x63cf90d3f0410092fc0fca41846f596223979195';

  let latestBlockNumber;
  let latestBlockHash;

  describe('accounts', () => {
    it('returns the available accounts', () => {
      return sofapi.sof.accounts().then((accounts) => {
        accounts.forEach((account) => {
          expect(isAddress(account)).to.be.true;
        });
      });
    });
  });

  describe('blockNumber', () => {
    it('returns the current blockNumber', () => {
      return sofapi.sof.blockNumber().then((blockNumber) => {
        latestBlockNumber = blockNumber;
        expect(blockNumber.gt(0xabcde)).to.be.true;
      });
    });
  });

  describe('coinbase', () => {
    it('returns the coinbase', () => {
      return sofapi.sof.coinbase().then((coinbase) => {
        expect(isAddress(coinbase)).to.be.true;
      });
    });
  });

  describe('gasPrice', () => {
    it('returns the current gasPrice', () => {
      return sofapi.sof.gasPrice().then((gasPrice) => {
        expect(gasPrice.gt(0)).to.be.true;
      });
    });
  });

  describe('getBalance', () => {
    it('returns the balance for latest block', () => {
      return sofapi.sof.getBalance(address).then((balance) => {
        expect(balance.gt(0)).to.be.true;
      });
    });

    it('returns the balance for a very early block', () => {
      const atBlock = '0x65432';
      const atValue = '18e07120a6e164fee1b';

      return sofapi.sof
        .getBalance(address, atBlock)
        .then((balance) => {
          expect(balance.toString(16)).to.equal(atValue);
        })
        .catch((error) => {
          // Susy doesn't support pruned-before-block balance lookups
          expect(error.message).to.match(/not supported/);
        });
    });

    it('returns the balance for a recent/out-of-pruning-range block', () => {
      return sofapi.sof
        .getBalance(address, latestBlockNumber.minus(1000))
        .then((balance) => {
          expect(balance.gt(0)).to.be.true;
        });
    });
  });

  describe('getBlockByNumber', () => {
    it('returns the latest block', () => {
      return sofapi.sof.getBlockByNumber().then((block) => {
        expect(block).to.be.ok;
      });
    });

    it('returns a block by blockNumber', () => {
      return sofapi.sof.getBlockByNumber(latestBlockNumber).then((block) => {
        latestBlockHash = block.hash;
        expect(block).to.be.ok;
      });
    });

    it('returns a block by blockNumber (full)', () => {
      return sofapi.sof.getBlockByNumber(latestBlockNumber, true).then((block) => {
        expect(block).to.be.ok;
      });
    });
  });

  describe('getBlockByHash', () => {
    it('returns the specified block', () => {
      return sofapi.sof.getBlockByHash(latestBlockHash).then((block) => {
        expect(block).to.be.ok;
        expect(block.hash).to.equal(latestBlockHash);
      });
    });

    it('returns the specified block (full)', () => {
      return sofapi.sof.getBlockByHash(latestBlockHash, true).then((block) => {
        expect(block).to.be.ok;
        expect(block.hash).to.equal(latestBlockHash);
      });
    });
  });

  describe('getBlockTransactionCountByHash', () => {
    it('returns the transactions of the specified hash', () => {
      return sofapi.sof.getBlockTransactionCountByHash(latestBlockHash).then((count) => {
        expect(count).to.be.ok;
        expect(count.gte(0)).to.be.true;
      });
    });
  });

  describe('getBlockTransactionCountByNumber', () => {
    it('returns the transactions of latest', () => {
      return sofapi.sof.getBlockTransactionCountByNumber().then((count) => {
        expect(count).to.be.ok;
        expect(count.gte(0)).to.be.true;
      });
    });

    it('returns the transactions of a specified number', () => {
      return sofapi.sof.getBlockTransactionCountByNumber(latestBlockNumber).then((count) => {
        expect(count).to.be.ok;
        expect(count.gte(0)).to.be.true;
      });
    });
  });

  describe('getTransactionCount', () => {
    it('returns the count for an address', () => {
      return sofapi.sof.getTransactionCount(address).then((count) => {
        expect(count).to.be.ok;
        expect(count.gte(0x1000c2)).to.be.ok;
      });
    });

    it('returns the count for an address at specified blockNumber', () => {
      return sofapi.sof.getTransactionCount(address, latestBlockNumber).then((count) => {
        expect(count).to.be.ok;
        expect(count.gte(0x1000c2)).to.be.ok;
      });
    });
  });
});
