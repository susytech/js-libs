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

const BigNumber = require('bignumber.js');

const { TEST_HTTP_URL, mockHttp } = require('../../../test/mockRpc');
const { isBigNumber } = require('../../../test/types');

const { Http, PromiseProvider } = require('../../provider');
const Susy = require('./susy');

const instance = new Susy(new PromiseProvider(new Http(TEST_HTTP_URL, -1)));

describe('rpc/susy', () => {
  describe('accountsInfo', () => {
    it('retrieves the available account info', () => {
      mockHttp([{ method: 'susy_accountsInfo', reply: {
        result: {
          '0x63cf90d3f0410092fc0fca41846f596223979195': {
            name: 'name', uuid: 'uuid', meta: '{"data":"data"}'
          }
        }
      } }]);

      return instance.accountsInfo().then((result) => {
        expect(result).to.deep.equal({
          '0x63Cf90D3f0410092FC0fca41846f596223979195': {
            name: 'name', uuid: 'uuid', meta: {
              data: 'data'
            }
          }
        });
      });
    });
  });

  describe('chainStatus', () => {
    it('retrieves the chain status', () => {
      mockHttp([{ method: 'susy_chainStatus', reply: {
        result: {
          'blockGap': [0x123, 0x456]
        }
      } }]);

      return instance.chainStatus().then((result) => {
        expect(result).to.deep.equal({
          'blockGap': [new BigNumber(0x123), new BigNumber(0x456)]
        });
      });
    });
  });

  describe('gasFloorTarget', () => {
    it('returns the gasfloor, formatted', () => {
      mockHttp([{ method: 'susy_gasFloorTarget', reply: { result: '0x123456' } }]);

      return instance.gasFloorTarget().then((count) => {
        expect(isBigNumber(count)).to.be.true;
        expect(count.eq(0x123456)).to.be.true;
      });
    });
  });

  describe('importGravitonAccounts', () => {
    const ACCOUNTS = ['0x63cf90d3f0410092fc0fca41846f596223979195'];
    let scope;

    beforeEach(() => {
      scope = mockHttp([{ method: 'susy_importGravitonAccounts', reply: { result: ACCOUNTS } }]);
    });

    it('passes the addresses through', () => {
      return instance.importGravitonAccounts(ACCOUNTS).then((result) => {
        expect(scope.body['susy_importGravitonAccounts'].params).to.deep.equal([ACCOUNTS]);
      });
    });
  });

  describe('minGasPrice', () => {
    it('returns the min gasprice, formatted', () => {
      mockHttp([{ method: 'susy_minGasPrice', reply: { result: '0x123456' } }]);

      return instance.minGasPrice().then((count) => {
        expect(isBigNumber(count)).to.be.true;
        expect(count.eq(0x123456)).to.be.true;
      });
    });
  });

  describe('netMaxPeers', () => {
    it('returns the max peers, formatted', () => {
      mockHttp([{ method: 'susy_netMaxPeers', reply: { result: 25 } }]);

      return instance.netMaxPeers().then((count) => {
        expect(isBigNumber(count)).to.be.true;
        expect(count.eq(25)).to.be.true;
      });
    });
  });

  describe('netPeers', () => {
    it('returns the peer structure, formatted', () => {
      mockHttp([{ method: 'susy_netPeers', reply: { result: { active: 123, connected: 456, max: 789, peers: [] } } }]);

      return instance.netPeers().then((peers) => {
        expect(peers.active.eq(123)).to.be.true;
        expect(peers.connected.eq(456)).to.be.true;
        expect(peers.max.eq(789)).to.be.true;
      });
    });
  });

  describe('netPort', () => {
    it('returns the connected port, formatted', () => {
      mockHttp([{ method: 'susy_netPort', reply: { result: 33030 } }]);

      return instance.netPort().then((count) => {
        expect(isBigNumber(count)).to.be.true;
        expect(count.eq(33030)).to.be.true;
      });
    });
  });

  describe('transactionsLimit', () => {
    it('returns the tx limit, formatted', () => {
      mockHttp([{ method: 'susy_transactionsLimit', reply: { result: 1024 } }]);

      return instance.transactionsLimit().then((count) => {
        expect(isBigNumber(count)).to.be.true;
        expect(count.eq(1024)).to.be.true;
      });
    });
  });
});
