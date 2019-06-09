// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import * as debug from 'debug';

import { LoggerFunction } from '../types';

/**
 * @ignore
 */
let logger: LoggerFunction = debug;

/**
 * @ignore
 */
export const setLogger = (_logger: LoggerFunction) => {
  logger = _logger;
};

export default () => logger;
