// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import * as apiutil from '@susy-js/api/lib/util';

import { ContractInstance } from '../types';

/**
 * @ignore
 */
const mockApi = (instance: ContractInstance) => ({
  sof: {
    getCode: jest.fn(() => Promise.resolve('0x123456'))
  },
  susy: {
    registryAddress: jest.fn(() => Promise.resolve('testRegistryAddress'))
  },
  util: apiutil,
  newContract: jest.fn(() => ({ instance }))
});

export default mockApi;
