// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import DecodedLogParam from './decodedLogParam';

class DecodedLog {
  private _address: string;
  private _params: DecodedLogParam[];

  constructor (params: DecodedLogParam[], address: string) {
    this._params = params;
    this._address = address;
  }

  get address () {
    return this._address;
  }

  get params () {
    return this._params;
  }
}

export default DecodedLog;
