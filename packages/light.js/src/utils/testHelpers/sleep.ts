// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

// TODO Use fake timers instead
export default (duration: number) => new Promise((resolve, reject) => {
  setTimeout(resolve, duration);
});
