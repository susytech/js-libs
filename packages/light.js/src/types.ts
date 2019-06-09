// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { Observable, OperatorFunction, ReplaySubject } from 'rxjs';

import frequency from './frequency';
import rpc from './rpc';

declare global {
  interface Window {
    susy: any;
  }
}

// TODO This should be on @susy-js/api
export type AccountsInfo = {
  name: String;
};

// TODO This should be on @susy-js/api
export type Address = string;

// TODO This should be on @susy-js/api
export type ApiValue = any;

// TODO This should be on @susy-js/api
export type Block = {
  number: BigNumber;
};

export interface Metadata<Source, Out> {
  calledWithArgs?: {
    [key: string]: ReplaySubject<Out>;
  };
  calls?: string[];
  dependsOn?: RpcObservable<any, Source>;
  frequency?: FrequencyObservable<Source>[];
  name?: string;
  pipes?: (...args: any[]) => OperatorFunction<Source, Out>[];
}

export type FrequencyKey = keyof typeof frequency;

export interface FrequencyObservableOptions {
  provider?: any; // TODO types from @susy-js/abi
}

export interface FrequencyObservable<T> {
  (options?: FrequencyObservableOptions): Observable<T>;
}

export type FrequencyMap = {
  [index in FrequencyKey]: FrequencyObservable<any>
};

export interface MakeContract {
  abi: any; // TODO types from @susy-js/abi
  address: string;
  readonly contractObject: any; // TODO from @susy-js/api
  [index: string]: any | string | ((...args: any[]) => any); // TODO types from @susy-js/abi
}

export type RpcKey = keyof typeof rpc;

export interface RpcObservable<Source, Out> {
  (...args: any[]): Observable<Out>;
  metadata?: Metadata<Source, Out>;
  setFrequency? (frequency: FrequencyObservable<Source>[]): void; // post$, makeContract... don't have setFrequency
}

export type RpcMap = { [index in RpcKey]: RpcObservable<any, any> };

export interface RpcObservableOptions {
  provider?: any; // TODO types from @susy-js/abi
}

// TODO This should be on @susy-js/api
export type Tx = {
  from: Address;
  condition: any; // TODO Which type?
  to: Address;
};

export interface TxStatus {
  confirmed?: any; // TODO Receipt from @susy-js/api
  estimating?: boolean;
  estimated?: BigNumber;
  failed?: Error;
  signed?: string;
  sent?: string;
}
