// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { setApi, setProvider } from './api';
import frequency from './frequency';
import { makeContract } from './rpc/other/makeContract';
import rpc from './rpc';

export * from './types';

export { frequency, makeContract }; // makeContract is a bit special, because it's not a RpcObservable
export const {
  accounts$,
  accountsInfo$,
  balanceOf$,
  chainId$,
  transactionCountOf$,
  blockNumber$,
  chainName$,
  defaultAccount$,
  myBalance$,
  peerCount$,
  post$,
  postRaw$,
  syncStatus$,
  versionInfo$
} = rpc;
export default { setApi, setProvider };
