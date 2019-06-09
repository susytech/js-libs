// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import * as Api from '@susy-js/api';

import { getApi, setApi, setProvider } from './api';
import { resolveApi } from './utils/testHelpers/mockApi';

it('should return the Null provider', () => {
  expect(getApi).toThrow();
});

it('should correctly set a new api', () => {
  const api = resolveApi();
  setApi(api);
  expect(getApi()).toBe(api);
});

it('should correctly set a new provider', () => {
  const provider = new Api.Provider.Ws('ws://127.0.0.1:8546');
  setProvider(provider);
  expect(getApi().provider).toBe(provider);
});
