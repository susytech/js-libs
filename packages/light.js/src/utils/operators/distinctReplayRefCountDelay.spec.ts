// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { distinctReplayRefCountDelay } from './distinctReplayRefCountDelay';
import isObservable from '../isObservable';
import mockRpc$ from '../testHelpers/mockRpc';
import { Observable } from 'rxjs';

it('should return an Observable', () => {
  expect(isObservable(mockRpc$().pipe(distinctReplayRefCountDelay(2000)))).toBe(true);
});
