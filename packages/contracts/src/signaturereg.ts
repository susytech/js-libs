// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { Api, ContractInstance } from './types';
import Registry from './registry';

export default class SignatureReg {
  private _api: Api;
  private _registry: Registry;

  constructor (api: Api, registry: Registry) {
    this._api = api;
    this._registry = registry;

    this.getInstance();
  }

  getInstance () {
    return this._registry.getContractInstance('signaturereg');
  }

  lookup (signature: string) {
    return this.getInstance().then((instance: ContractInstance) => {
      return instance.entries.call({}, [signature]);
    });
  }
}
