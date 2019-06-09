// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import * as debug from 'debug';
import { LoggerFunction } from './types';
import { setLogger } from './utils/logger';

export * from './checkClockSync';
export * from './getSusyPath';
export * from './fetchSusy';
export * from './isSusyRunning';
export * from './runSusy';
export * from './signerNewToken';

interface SusyElectronOptions {
  logger?: LoggerFunction;
}

/**
 * Set default options for @susy-js/electron. Can be skipped if we don't want to
 * override default options.
 */
function susyElectron (options: SusyElectronOptions = { logger: debug }) {
  if (options.logger) {
    setLogger(options.logger);
  }
}

export default susyElectron;
