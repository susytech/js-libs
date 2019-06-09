// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { AccountsInfo, Address, FrequencyObservableOptions } from '../types';
import createPubsubObservable from './utils/createPubsubObservable';

/**
 * Observable that emits each time the default account changes
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onAccountsChanged$ (options?: FrequencyObservableOptions) {
  return createPubsubObservable<Address[]>(
    'sof_accounts',
    'sof_accounts',
    options
  );
}

/**
 * Observable that emits each time the default account changes
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onAccountsInfoChanged$ (options?: FrequencyObservableOptions) {
  return createPubsubObservable<AccountsInfo>(
    'susy_accountsInfo',
    'susy_accountsInfo',
    options
  );
}
