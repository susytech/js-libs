// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { checkClockSync } from './checkClockSync';

jest.mock('sntp', () => ({ time: () => Promise.resolve({ t: 1234 }) }));

it('should return the correct syncness', async done => {
  expect(await checkClockSync()).toEqual({
    isClockSync: true,
    timeDrift: 1234
  });
  done();
});
