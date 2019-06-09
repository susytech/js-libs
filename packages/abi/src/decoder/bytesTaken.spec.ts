// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import BytesTaken from './bytesTaken';

describe('decoder/BytesTaken', () => {
  describe('constructor', () => {
    it('sets the bytes of the object', () => {
      expect(new BytesTaken([1], 2).bytes).toEqual([1]);
    });

    it('sets the newOffset of the object', () => {
      expect(new BytesTaken([1], 4).newOffset).toEqual(4);
    });
  });
});
