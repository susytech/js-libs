// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import logCommand from './logCommand';

test('should correctly log a command', () => {
  expect(logCommand('foo', ['-a', '23'])).toBe('Running "foo -a 23".');
});
