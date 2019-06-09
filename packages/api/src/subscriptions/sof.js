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

const BigNumber = require('bignumber.js');

class Sof {
  constructor (updateSubscriptions, api) {
    this._api = api;
    this._updateSubscriptions = updateSubscriptions;
    this._started = false;

    this._lastBlock = new BigNumber(-1);
    this._pollTimerId = null;
    this._pollBlockNumber = this._pollBlockNumber.bind(this);

    this._api.provider.on('close', () => {
      if (this.isStarted) {
        this.start();
      }
    });
  }

  get isStarted () {
    return this._started;
  }

  start () {
    this._started = true;

    if (this._api.isPubSub) {
      return Promise.all([
        this._pollBlockNumber(false),
        this._api.pubsub
          .subscribeAndGetResult(
            (callback) => this._api.pubsub.sof.newHeads(callback),
            () => {
              return this._api.sof
                .blockNumber()
                .then((blockNumber) => {
                  this.updateBlock(blockNumber);
                  return blockNumber;
                });
            }
          )
      ]);
    }

    return this._pollBlockNumber(true);
  }

  _pollBlockNumber (doTimeout) {
    const nextTimeout = (timeout = 1000, forceTimeout = doTimeout) => {
      if (forceTimeout) {
        this._pollTimerId = setTimeout(() => {
          this._pollBlockNumber(doTimeout);
        }, timeout);
      }
    };

    if (!this._api.provider.isConnected) {
      nextTimeout(500, true);
      return;
    }

    return this._api.sof
      .blockNumber()
      .then((blockNumber) => {
        this.updateBlock(blockNumber);

        nextTimeout();
      })
      .catch(() => nextTimeout());
  }

  updateBlock (blockNumber) {
    if (!blockNumber.eq(this._lastBlock)) {
      this._lastBlock = blockNumber;
      this._updateSubscriptions('sof_blockNumber', null, blockNumber);
    }
  }
}

module.exports = Sof;
