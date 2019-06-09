// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import createPubsubObservable from './utils/createPubsubObservable';
import { FrequencyObservableOptions } from '../types';

/**
 * Observable that emits when syncing status changes.
 */
// TODO Pubsub doesn't exist on `net_peerCount`

/**
 * Observable that emits when syncing status changes.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onSyncingChanged$ (options?: FrequencyObservableOptions) {
  return createPubsubObservable<object | false>(
    'sof_syncing',
    'sof_syncing',
    options
  );
}
