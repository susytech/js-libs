// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import Abi from '@susy-js/abi';
import { abiEncode } from '@susy-js/api/lib/util/encode';
import * as memoizee from 'memoizee';

import { Address } from '../../types';
import { createApiFromProvider, getApi } from '../../api';
import createRpc from '../utils/createRpc';
import { switchMapPromise } from '../../utils/operators';
import frequency from '../../frequency';
import { post$ } from './post';

interface MakeContract {
  abi: any; // use types from @susy-js/abi
  address: string;
  readonly contractObject: any; // TODO from @susy-js/api
  [index: string]: any | string | ((...args: any[]) => any); // use types from @susy-js/abi
}

/**
 * Cache contracts, so that they are:
 * - only created after the first call/transaction to a contract has been made
 * - further calls/transactions to the same contract doesn't recreate the
 *   contract
 *
 * @ignore
 * @param address - The contract address.
 * @param abiJson - The contract abi.
 * @param api - The api Object.
 * @return - The contract object as defined in @susy-js/api.
 */
const getContract = memoizee(
  (address: Address, abiJson: any[], api: any) =>
    api.newContract(abiJson, address) // use types from @susy-js/abi
);

/**
 * Create a contract, given an api object.
 * Pure function version of {@link makeContract}.
 *
 * @ignore
 * @param address - The contract address.
 * @param abiJson - The contract abi.
 * @param api - The api Object.
 * @return - An object whose keys are all the functions of the
 * contract, and each function returns an Observable which will fire when the
 * function resolves.
 */
const makeContractWithApi = memoizee(
  (address: Address, abiJson: any[], api: any) => {
    const abi = new Abi(abiJson); // use types from @susy-js/abi

    // Variable result will hold the final object to return
    const result: MakeContract = {
      abi,
      address,
      get contractObject () {
        return getContract(address, abiJson, api);
      }
    };

    // We then copy every key inside contract.instance into our `result` object,
    // replacing each the value by an Observable instead of a Promise.
    abi.functions.forEach(({ name }: any) => {
      // use types from @susy-js/abi
      result[`${name}$`] = (...args: any[]) => {
        // We only get the contract when the function is called for the 1st
        // time. Note: getContract is memoized, won't create contract on each
        // call.
        const contract = getContract(address, abiJson, api);
        const method = contract.instance[name]; // Hold the method from the Abi

        // The last arguments in args can be an options object
        const options =
          args.length === method.inputs.length + 1 ? args.pop() : {};

        if (method.constant) {
          return createRpc({
            frequency: [frequency.onEveryBlock$],
            name: `${address}:${name}`,
            pipes: () => [
              switchMapPromise(() =>
                contract.instance[name].call(options, args)
              )
            ]
          })({ provider: api.provider })(...args);
        } else {
          const { estimate, passphrase, ...txFields } = options;

          return post$({
            to: address,
            data: abiEncode(
              method.name,
              method.inputs.map(({ kind: { type } }: any) => type), // TODO Use @susy-js/api types
              args
            ),
            ...txFields
          }, { estimate, passphrase });
        }
      };
    });

    return result;
  }
);

/**
 * Create a contract.
 *
 * @param address - The contract address.
 * @param abiJson - The contract abi.
 * @param options - The options to pass in when creating the contract.
 * @return - An object whose keys are all the functions of the
 * contract, and each function return an Observable which will fire when the
 * function resolves.
 */
export const makeContract = (
  address: Address,
  abiJson: any[],
  options: { provider?: any } = {}
) => {
  const { provider } = options;
  const api = provider ? createApiFromProvider(provider) : getApi();

  return makeContractWithApi(address, abiJson, api);
};
