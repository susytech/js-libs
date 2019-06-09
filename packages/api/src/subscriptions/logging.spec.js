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

const sinon = require('sinon');

const Logging = require('./logging');

describe('subscriptions/logging', () => {
  let cb;
  let logging;

  beforeEach(() => {
    cb = sinon.stub();
    logging = new Logging(cb);
  });

  describe('constructor', () => {
    it('starts the instance in a started state', () => {
      expect(logging.isStarted).to.be.true;
    });
  });

  describe('send', () => {
    const method = 'method';
    const params = 'params';
    const json = 'json';

    beforeEach(() => {
      Logging.send(method, params, json);
    });

    it('calls the subscription update', () => {
      expect(cb).to.have.been.calledWith('logging', null, { method, params, json });
    });
  });
});
