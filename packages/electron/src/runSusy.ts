// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { ChildProcess, spawn } from 'child_process';
import { chmod } from 'fs';
import { promisify } from 'util';

import { getSusyPath } from './getSusyPath';
import logCommand from './utils/logCommand';
import logger from './utils/logger';

interface RunSusyOptions {
  susyPath?: string;
  flags: string[];
  onSusyError: (error: Error) => void;
}

/**
 * @ignore
 */
const fsChmod = promisify(chmod);

/**
 * @ignore
 */
let susy: ChildProcess | null = null; // Will hold the running susy instance

/**
 * These are errors output by susy, which we should ignore (i.e. don't
 * panic). They happen when an instance of susy is already running, and
 * susy-electron tries to launch another one.
 *
 * @ignore
 */
const catchableErrors = [
  'is already in use, make sure that another instance of an Sophon client is not running',
  'IO error: While lock file:'
];

/**
 * Spawns a child process to run Susy.
 */
export async function runSusy (
  options: RunSusyOptions = {
    flags: [],
    onSusyError: () => {
      /* Do nothing if error. */
    }
  }
) {
  const { flags, onSusyError } = {
    flags: [],
    onSusyError: () => {
      /* Do nothing if error. */
    },
    ...options
  };
  const susyPath = options.susyPath || await getSusyPath();

  // Some users somehow had no +x on the susy binary after downloading
  // it. We try to set it here (no guarantee it will work, we might not
  // have rights to do it).
  try {
    await fsChmod(susyPath, '755');
  } catch (e) {
    /* Do nothing if error. */
  }

  return new Promise((resolve, reject) => {
    let logLastLine = ''; // Always contains last line of the Susy logs

    // Run an instance of susy with the correct flags
    susy = spawn(susyPath, flags);
    logger()('@susy-js/electron:main')(logCommand(susyPath, flags));

    // Save in memory the last line of the log file, for handling error
    const callback = (data: Buffer) => {
      // `susy signer new-token` requires Susy's folders to have already
      // been created. In order to be able to run `susy signer new-token`
      // right after runSusy resolves, we want runSusy to resolve once
      // Susy was launched and has set up its folders (if it's a first run).
      // As a heuristic, we resolve as soon as Susy outputs to stdout/stderr:
      // this happens just after the directories have been set up,
      // see https://git.io/fx9JE
      resolve();

      if (data && data.length) {
        logLastLine = data.toString();
      }
      logger()('@susy-js/susy')(data.toString());
    };
    susy.stdout.on('data', callback);
    susy.stderr.on('data', callback);

    susy.on('error', err => {
      onSusyError(err);
    });
    susy.on('close', (exitCode, signal) => {
      if (exitCode === 0) {
        return;
      }

      // When there's already an instance of susy running, then the log
      // is logging a particular line, see below. In this case, we just
      // silently ignore our local instance, and let the 1st susy
      // instance be the main one.
      if (
        logLastLine &&
        catchableErrors.some(error => logLastLine.includes(error))
      ) {
        logger()('@susy-js/electron:main')(
          'Another instance of susy is running, closing local instance.'
        );
        return;
      }

      // Otherwise, if the exit code is not 0, then we show some error message
      onSusyError(new Error(`Exit code ${exitCode}, with signal ${signal}.`));
    });
  });
}

/**
 * If a Susy process has been spawned with runSusy, then it kills this
 * process. However, there's no guarantee that Susy has been cleanly killed,
 * and the Promise resolves instantly.
 */
export function killSusy () {
  if (susy) {
    logger()('Stopping susy.');
    susy.kill();
    susy = null;
  }
  return Promise.resolve();
}
