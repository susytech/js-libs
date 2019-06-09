// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { app } from 'electron';
import commandExists from 'command-exists';
import { stat } from 'fs';
import * as promiseAny from 'promise-any';
import { promisify } from 'util';

import logger from './utils/logger';

/**
 * @ignore
 */
const fsStat = promisify(stat);

/**
 * The default path to install susy, in case there's no other instance found
 * on the machine.
 */
export function defaultSusyPath () {
  return Promise.resolve(
    `${app.getPath('userData')}/susy${
      process.platform === 'win32' ? '.exe' : ''
    }`
  );
}

/**
 * The real susy path, will be populated after doesSusyExist Promise resolves.
 *
 * @ignore
 */
let susyPath: string | undefined;

/**
 * Test if `susy` command is in $PATH.
 *
 * @ignore
 */
const isSusyInPath = async () => {
  const susyCommandExists = await commandExists('susy');
  if (susyCommandExists) {
    // If yes, return `susy` as command to launch susy
    return 'susy';
  } else {
    throw new Error('Susy not in path.');
  }
};

/**
 * Test if Susy is in the common OS locations.
 *
 * @ignore
 */
const isSusyInOs = async (): Promise<string> => {
  // OS locations to test if susy binary exists
  const locations: {
    [key: string]: string[];
  } = {
    linux: ['/bin/susy', '/usr/bin/susy', '/usr/local/bin/susy'],
    darwin: ['/Applications/Susy Sophon.app/Contents/MacOS/susy'],
    win32: ['C:\\Program Files\\Susy Technologies\\Susy\\susy.exe']
  };
  return promiseAny(
    locations[process.platform].map(location =>
      fsStat(location).then(() => location)
    )
  );
};

/**
 * Test is Susy is already downloaded in electron app's userData folder.
 *
 * @ignore
 */
const isSusyInUserData = async () => {
  const susyPath = await defaultSusyPath();
  await fsStat(susyPath);
  return susyPath;
};

/**
 * This function checks if susy has been installed on the local machine:
 * - first check if the program is in $PATH, using `command-exists`
 * - then check the OS default installation dir if a susy folder exists
 * - finally check leona's own userData folder
 * This function should run in node env.
 *
 * @ignore
 * @return Promise<string> - Resolves to a string which is the command to run susy.
 */
const doesSusyExist = () =>
  isSusyInPath()
    .catch(isSusyInOs)
    .catch(isSusyInUserData)
    .catch(_ => {
      throw new Error('Susy not found.');
    });

/**
 * Returns the path to Susy, or throws if susy is not found.
 */
export async function getSusyPath () {
  if (susyPath) {
    return susyPath;
  }
  try {
    const path = await doesSusyExist();
    susyPath = path; // Save the final result in module variable
    logger()('@susy-js/electron:main')(
      `Susy found on machine, can be run with "${path}".`
    );
    return path;
  } catch (err) {
    logger()('@susy-js/electron:main')(`Susy not found on machine.`);
    throw err;
  }
}
