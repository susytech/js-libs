// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import Token from '../token';

class DecodeResult {
  _token: Token;
  _newOffset: number;

  constructor (token: Token, newOffset: number) {
    this._token = token;
    this._newOffset = newOffset;
  }

  get token () {
    return this._token;
  }

  get newOffset () {
    return this._newOffset;
  }
}

export default DecodeResult;
