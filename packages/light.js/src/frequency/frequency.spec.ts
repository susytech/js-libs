// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import * as Api from '@susy-js/api';
import { take } from 'rxjs/operators';

import frequency from './frequency';
import { FrequencyObservable, FrequencyKey, FrequencyMap } from '../types';
import isObservable from '../utils/isObservable';
import {
  MockProvider,
  rejectApi,
  resolveApi
} from '../utils/testHelpers/mockApi';
import { setApi } from '@susy-js/light.js/src/api';

jest.mock('@susy-js/api');
Api.mockImplementation(() => resolveApi('4'));

/**
 * Helper function to make basic tests for frequency$ observables.
 *
 * @ignore
 */
const testFrequency = (
  name: string,
  frequency$: FrequencyObservable<any>,
  resolveWith: any = 'foo'
) =>
  describe(`${name} frequency`, () => {
    beforeEach(() => {
      setApi(resolveApi(resolveWith));
    });

    it('should be an Observable', () => {
      expect(isObservable(frequency$())).toBe(true);
    });

    it('should be subscribable', () => {
      expect(() => frequency$().subscribe()).not.toThrow();
    });

    it('should return values', done => {
      frequency$()
        .pipe(take(1))
        .subscribe(data => {
          expect(data).not.toBeNull();
          done();
        });
    });
  });

Object.keys(frequency).forEach(key =>
  testFrequency(
    key,
    (frequency as FrequencyMap)[key as FrequencyKey],
    key.includes('Account') ? ['foo'] : 4 // Give string[] for accounts pubsub, or number elsewhere
  )
);
