// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { timer } from 'rxjs';
import * as memoizee from 'memoizee';

import { FrequencyObservableOptions } from '../types';

/**
 * Observable that emits on every second.
 */
function onEverySecond$ (options?: FrequencyObservableOptions) {
  return timer(0, 1000);
}
// @ts-ignore
onEverySecond$ = memoizee(onEverySecond$);

/**
 * Observable that emits on every other second.
 */
function onEvery2Seconds$ (options?: FrequencyObservableOptions) {
  return timer(0, 2000);
}
// @ts-ignore
onEvery2Seconds$ = memoizee(onEvery2Seconds$);

/**
 * Observable that emits every five seconds.
 */
function onEvery5Seconds$ (options?: FrequencyObservableOptions) {
  return timer(0, 5000);
}
// @ts-ignore
onEvery5Seconds$ = memoizee(onEvery5Seconds$);

export { onEverySecond$, onEvery2Seconds$, onEvery5Seconds$ };
