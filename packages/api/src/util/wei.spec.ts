// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { SophyDenomination } from '../types';
import { _getUnitMultiplier, fromWei, toWei } from './wei';

describe('util/wei', () => {
  /**
   * @test {_getUnitMultiplier}
   */
  describe('_getUnitMultiplier', () => {
    it('returns 10^0 for wei', () => {
      expect(_getUnitMultiplier('wei')).toEqual(Math.pow(10, 0));
    });

    it('returns 10^15 for finney', () => {
      expect(_getUnitMultiplier('finney')).toEqual(Math.pow(10, 15));
    });

    it('returns 10^18 for sophy', () => {
      expect(_getUnitMultiplier('sophy')).toEqual(Math.pow(10, 18));
    });

    it('throws an error on invalid units', () => {
      expect(() => _getUnitMultiplier('invalid' as SophyDenomination)).toThrow(
        /passed to wei formatter/
      );
    });
  });

  /**
   * @test {fromWei}
   */
  describe('fromWei', () => {
    it('formats into sophy when nothing specified', () => {
      expect(fromWei('1230000000000000000').toString()).toEqual('1.23');
    });

    it('formats into finney when specified', () => {
      expect(fromWei('1230000000000000000', 'finney').toString()).toEqual(
        '1230'
      );
    });
  });

  /**
   * @test {toWei}
   */
  describe('toWei', () => {
    it('formats from sophy when nothing specified', () => {
      expect(toWei(1.23).toString()).toEqual('1230000000000000000');
    });

    it('formats from finney when specified', () => {
      expect(toWei(1230, 'finney').toString()).toEqual('1230000000000000000');
    });
  });
});
