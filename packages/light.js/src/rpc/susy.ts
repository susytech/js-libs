// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { AccountsInfo, RpcObservableOptions } from '../types';
import createRpc$ from './utils/createRpc';
import frequency from '../frequency';
import { switchMapPromise } from '../utils/operators';

/**
 * Get accounts info. Calls `susy_accountsInfo`. Works only with a Susy
 * node.
 *
 * @return - An Observable containing all info that can be
 * accessed by user concerning accounts.
 */
export function accountsInfo$ (options?: RpcObservableOptions) {
  return createRpc$<AccountsInfo, AccountsInfo>({
    frequency: [frequency.onAccountsInfoChanged$],
    name: 'accountsInfo$'
  })()(options);
}

/**
 * Get the name of the current chain. Calls `susy_chain`. Works only with
 * a Susy node.
 *
 * @return - An Observable containing the name of the
 * current chain.
 */
export function chainName$ (options?: RpcObservableOptions) {
  return createRpc$<any, string>({
    calls: ['susy_chain'],
    frequency: [frequency.onStartup$],
    name: 'chainName$',
    pipes: api => [switchMapPromise(() => api.susy.chain())]
  })(options)();
}

/**
 * Get the version info of Susy Sophon. Calls `susy_versionInfo`.
 *
 * @return - An Observable containing the version object: {major, minor, patch}
 */
export function versionInfo$ (options?: RpcObservableOptions) {
  return createRpc$<any, string>({
    calls: ['susy_versionInfo'],
    frequency: [frequency.onStartup$],
    name: 'versionInfo$',
    pipes: api => [switchMapPromise(() => api.susy.versionInfo(), { emitErrors: true })]
  })(options)();
}
