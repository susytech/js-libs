// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { Api, Contract, ContractInstance } from './types';
import Registry from './registry';

export default class TokenReg {
  private _api: Api;
  private _registry: Registry;

  constructor (api: Api, registry: Registry) {
    this._api = api;
    this._registry = registry;

    this.getInstance();
  }

  getContract () {
    return this._registry.getContract('tokenreg');
  }

  getInstance () {
    return this.getContract().then((contract: Contract) => contract.instance);
  }

  tokenCount () {
    return this.getInstance().then((instance: ContractInstance) => {
      return instance.tokenCount.call();
    });
  }

  token (index: number) {
    return this.getInstance().then((instance: ContractInstance) => {
      return instance.token.call({}, [index]);
    });
  }
}
