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
const sinon = require('sinon');

const Sof = require('./sof');

const START_BLOCK = 5000;

function stubApi (blockNumber) {
  const _calls = {
    blockNumber: []
  };

  return {
    _calls,
    provider: {
      isConnected: true,
      on: () => {}
    },
    sof: {
      blockNumber: () => {
        const stub = sinon.stub().resolves(new BigNumber(blockNumber || START_BLOCK))();

        _calls.blockNumber.push(stub);
        return stub;
      }
    }
  };
}

describe('subscriptions/sof', () => {
  let api;
  let sof;
  let cb;

  beforeEach(() => {
    api = stubApi();
    cb = sinon.stub();
    sof = new Sof(cb, api);
  });

  describe('constructor', () => {
    it('starts the instance in a stopped state', () => {
      expect(sof.isStarted).to.be.false;
    });
  });

  describe('start', () => {
    describe('blockNumber available', () => {
      beforeEach(() => {
        return sof.start();
      });

      it('sets the started status', () => {
        expect(sof.isStarted).to.be.true;
      });

      it('calls sof_blockNumber', () => {
        expect(api._calls.blockNumber.length).to.be.ok;
      });

      it('updates subscribers', () => {
        expect(cb).to.have.been.calledWith('sof_blockNumber', null, new BigNumber(START_BLOCK));
      });
    });

    describe('blockNumber not available', () => {
      beforeEach(() => {
        api = stubApi(-1);
        sof = new Sof(cb, api);
        return sof.start();
      });

      it('sets the started status', () => {
        expect(sof.isStarted).to.be.true;
      });

      it('calls sof_blockNumber', () => {
        expect(api._calls.blockNumber.length).to.be.ok;
      });

      it('does not update subscribers', () => {
        expect(cb).not.to.been.called;
      });
    });
  });
});
