// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import * as EventEmitter from 'eventemitter3';

// Count the number of providers we have, so that each time we call createApi,
// we create a new provider.
let providerCount = 0;

/**
 * Provider used for tests.
 *
 * @ignore
 */
export class MockProvider extends EventEmitter {
  send () {
    return Promise.resolve();
  }
}

// List of JSONRPCs we want to mock
const listOfMockRps: { [index: string]: string[] } = {
  sof: ['accounts', 'blockNumber', 'chainId', 'getBalance', 'getTransactionCount', 'newHeads', 'syncing'],
  fake: ['method'],
  net: ['peerCount'],
  susy: ['accountsInfo', 'chain', 'postTransaction', 'versionInfo']
};

/**
 * Create a mock api object from the listOfMockRps above.
 *
 * @ignore
 */
const createApi = (
  resolveValueOrFunction: string | object | (() => any) | { error: string } | Error,
  isPubSub: boolean,
  isError: boolean
) => {

  const getResolveValue = () =>
    // TODO Casting as Function manually, or else we get:
    // "Cannot invoke an expression whose type lacks a call signature. Type 'Function | (() => any)' has no compatible call signatures."
    (typeof resolveValueOrFunction === 'function' ? (resolveValueOrFunction as Function)() : resolveValueOrFunction);

  const result = Object.keys(listOfMockRps).reduce(
    (apiObject, namespace: string) => {
      // Create methods on apiObject
      apiObject[namespace] = {};
      listOfMockRps[namespace].forEach(method => {
        apiObject[namespace][method] = isError
          ? () => Promise.reject(getResolveValue())
          : () => Promise.resolve(getResolveValue());
      });

      // Create pubsub on apiObject
      apiObject.pubsub = apiObject.pubsub || {
        unsubscribe: () => Promise.resolve()
      };
      apiObject.pubsub[namespace] = {};
      listOfMockRps[namespace].forEach(method => {
        apiObject.pubsub[namespace][method] = isError
          ? (callback: Function) => {
            callback(getResolveValue(), null);
            return Promise.resolve(1); // Resolves to subscriptionId
          }
          : (callback: Function) => {
            callback(null, getResolveValue());
            return Promise.resolve(1); // Resolves to subscriptionId
          };
      });

      // For sof.syncing pubsub, always return false
      apiObject.pubsub.sof.syncing = (callback: Function) => {
        callback(null, false);
        return Promise.resolve(1);
      };

      return apiObject;
    },
    {
      isPubSub,
      pollMethod () {
        return isError
          ? Promise.reject(getResolveValue())
          : Promise.resolve(getResolveValue());
      },
      provider: {
        id: ++providerCount,
        on: () => {
          /* Do nothing. */
        },
        send: () => {
          /* Do nothing. */
        }
      }
    } as { [index: string]: any }
  );

  result.resolveWith = resolveValueOrFunction.toString();

  return result;
};

/**
 * Mock api that resolves.
 *
 * @ignore
 */
export const rejectApi = (
  resolveValueOrFunction = new Error('bar'),
  isPubsub: boolean = true
) => createApi(resolveValueOrFunction, isPubsub, true);

/**
 * Mock api that resolves.
 *
 * @ignore
 */
export const resolveApi = (
  resolveValueOrFunction: string | object | (() => any) | { error: string } = 'foo',
  isPubsub: boolean = true
) => createApi(resolveValueOrFunction, isPubsub, false);
