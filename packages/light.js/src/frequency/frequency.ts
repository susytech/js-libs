// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import * as accounts from './accounts';
import * as blocks from './blocks';
import * as health from './health';
import * as other from './other';
import * as time from './time';

const frequency = {
  ...accounts,
  ...blocks,
  ...health,
  ...other,
  ...time
};

export default frequency;
