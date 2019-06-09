// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { of } from 'rxjs';
import * as memoizee from 'memoizee';

import { FrequencyObservableOptions } from '../types';

/**
 * Observable that emits only once.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
function onStartup$ (options?: FrequencyObservableOptions) {
  return of(0);
}
// @ts-ignore
onStartup$ = memoizee(onStartup$);

export { onStartup$ };
