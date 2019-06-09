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

const Current = require('./current');

function initProvider (sendAsync, isSusy = false) { // eslint-disable-line standard/no-callback-literal
  return new Current({
    sendAsync,
    isSusy
  });
}

describe('provider/Current', () => {
  describe('isSusy', () => {
    it('returns the value of the embedded provider', () => {
      expect(initProvider(null, true).isSusy).to.be.true;
    });
  });

  describe('send', () => {
    it('calls the sendAsync on the wrapped provider', (done) => {
      const sendAsync = (payload, callback) => {
        callback(null, { result: payload });
      };

      initProvider(sendAsync).send('method', ['params'], (error, payload) => {
        expect(error).not.to.be.ok;
        expect(payload).to.deep.equal({
          id: 1,
          jsonrpc: '2.0',
          method: 'method',
          params: ['params']
        });
        done();
      });
    });

    it('returns the embedded result object', (done) => {
      const sendAsync = (payload, callback) => callback(null, {
        result: 'xyz'
      });

      initProvider(sendAsync).send('', [], (error, result) => {
        expect(error).not.to.be.ok;
        expect(result).to.equal('xyz');
        done();
      });
    });

    it('returns a non-embedded result (fallback)', (done) => {
      const sendAsync = (payload, callback) => callback(null, 'xyz');

      initProvider(sendAsync).send('', [], (error, result) => {
        expect(error).not.to.be.ok;
        expect(result).to.equal('xyz');
        done();
      });
    });

    it('returns the error', (done) => {
      const sendAsync = (payload, callback) => {
        callback('error'); // eslint-disable-line
      };

      initProvider(sendAsync).send('method', ['params'], (error, payload) => {
        expect(error).to.equal('error');
        done();
      });
    });
  });
});
