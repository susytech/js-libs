// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { timer } from 'rxjs';

import createRpc from '../../rpc/utils/createRpc';
import { resolveApi } from '../testHelpers/mockApi';
import { setApi } from '../../api';

/**
 * Create a fake RpcObservable.
 *
 * @ignore
 */
setApi(resolveApi());
const mockRpc$ = createRpc({ frequency: [() => timer(0, 1000)] })();

export default mockRpc$;
