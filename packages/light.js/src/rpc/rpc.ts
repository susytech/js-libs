// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import * as sof from './sof';
import * as net from './net';
import { post$, postRaw$ } from './other';
import * as susy from './susy';

const rpc = { ...sof, ...net, ...susy, post$, postRaw$ };

export default rpc;
