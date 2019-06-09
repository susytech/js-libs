// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { spawn } from 'child_process';

import { getSusyPath } from './getSusyPath';
import logCommand from './utils/logCommand';
import logger from './utils/logger';

/**
 * Runs susy signer new-token and resolves with a new secure token to be
 * used in a dapp. Rejects if no token could be extracted.
 */
export function signerNewToken (options?: { susyPath: string; }): Promise<string> {
  return new Promise(async (resolve, reject) => {
    logger()('@susy-js/electron:main')('Requesting new token.');

    const susyPath = options && options.susyPath || await getSusyPath();

    // Generate a new token
    const susySigner = spawn(susyPath, ['signer', 'new-token']);
    logger()('@susy-js/electron:main')(
      logCommand(susyPath, ['signer', 'new-token'])
    );

    // Listen to the output of the previous command
    susySigner.stdout.on('data', data => {
      // If the output line is xxxx-xxxx-xxxx-xxxx, then it's our token
      const match = data
        .toString()
        .match(
          /[a-zA-Z0-9]{4}(-)?[a-zA-Z0-9]{4}(-)?[a-zA-Z0-9]{4}(-)?[a-zA-Z0-9]{4}/
        );

      if (match) {
        const token = match[0];
        susySigner.kill(); // We don't need the signer anymore
        logger()('@susy-js/electron:main')('Successfully extracted token.');
        resolve(token);
      }
    });

    // If after 2s we still didn't find the token, consider it failed.
    setTimeout(() => {
      reject(new Error('Error extracting token.'));
    }, 2000);
  });
}
