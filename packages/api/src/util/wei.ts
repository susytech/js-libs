// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

import { SophyDenomination } from '../types';

const UNITS: SophyDenomination[] = [
  'wei',
  'ada',
  'babbage',
  'shannon',
  'szabo',
  'finney',
  'sophy',
  'ksophy',
  'msophy',
  'gsophy',
  'tsophy'
];

/**
 * Returns the multiplication factor from wei to another sophy denomination.
 *
 * @param unit - An sophy denomiation.
 * @example
 * _getUnitMultiplier('wei'); // 1
 * _getUnitMultiplier('sophy'); // 10^^18
 * @ignore
 */
export const _getUnitMultiplier = (unit: SophyDenomination) => {
  const position = UNITS.indexOf(unit.toLowerCase() as SophyDenomination);

  if (position === -1) {
    throw new Error(`Unknown unit ${unit} passed to wei formatter`);
  }

  return Math.pow(10, position * 3);
};

/**
 * Convert from wei to another sophy denomination.
 *
 * @param value - The value in wei.
 * @param unit - The sophy denomination to convert to.
 */
export const fromWei = (
  value: string | number | BigNumber,
  unit: SophyDenomination = 'sophy'
) => new BigNumber(value).dividedBy(_getUnitMultiplier(unit));

/**
 * Convert a value from an sophy denomination to wei.
 *
 * @param value - The value in the sophy denomination.
 * @param unit - The sophy denomination to convert to.
 */
export const toWei = (
  value: string | number | BigNumber,
  unit: SophyDenomination = 'sophy'
) => new BigNumber(value).multipliedBy(_getUnitMultiplier(unit));
