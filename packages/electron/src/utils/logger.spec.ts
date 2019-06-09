// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import getLogger, { setLogger } from './logger';

test('should correctly set logger', () => {
  const logger = () => () => {
    /* Do nothing. */
  };
  setLogger(logger);
  expect(getLogger()).toBe(logger);
});
