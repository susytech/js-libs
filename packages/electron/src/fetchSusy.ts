// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { app, BrowserWindow } from 'electron';
import axios from 'axios';
import { file } from 'checksum';
import { download } from 'electron-dl';
import { chmod, rename, unlink } from 'fs';
import { promisify } from 'util';
import * as retry from 'async-retry';

import { defaultSusyPath, getSusyPath } from './getSusyPath';
import logger from './utils/logger';

interface FetchSusyOptions {
  onProgress: (progress: number) => void;
  susyChannel: string;
}

/**
 * @ignore
 */
const checksum = promisify(file);
/**
 * @ignore
 */
const fsChmod = promisify(chmod);
/**
 * @ignore
 */
const fsRename = promisify(rename);
/**
 * @ignore
 */
const fsUnlink = promisify(unlink);

/**
 * @ignore
 */
const VANITY_URL = 'https://vanity-service.susy.io/susy-binaries';

/**
 * @ignore
 */
const getArch = () => {
  switch (process.platform) {
    case 'darwin':
    case 'win32':
      return 'x86_64';
    default: {
      switch (process.arch) {
        case 'arm':
          return 'arm';
        case 'arm64':
          return 'aarch64';
        case 'x32':
          return 'i686';
        default:
          return 'x86_64';
      }
    }
  }
};

/**
 * @ignore
 */
const getOs = () => {
  switch (process.platform) {
    case 'darwin':
      return 'darwin';
    case 'win32':
      return 'windows';
    default:
      return 'linux';
  }
};

/**
 * Remove susy binary or partial binary in the userData folder, if it exists.
 */
export async function deleteSusy () {
  const susyPath = await defaultSusyPath();

  // Remove susy binary
  try {
    await fsUnlink(susyPath);
  } catch (e) {
    /* Do nothing if error. */
  }

  // Remove susy partial binary (download was still in progress)
  try {
    await fsUnlink(`${susyPath}.part`);
  } catch (e) {
    /* Do nothing if error. */
  }
}

/**
 * Downloads Susy, saves it to Electron's `userData` folder, and returns the
 * path to the downloaded binary once finished.
 */
export async function fetchSusy (
  mainWindow: BrowserWindow,
  options: FetchSusyOptions = {
    onProgress: () => {
      /* Do nothing by defaut. */
    },
    susyChannel: 'beta'
  }
) {
  const { onProgress, susyChannel } = {
    onProgress: () => {
      /* Do nothing by defaut. */
    },
    susyChannel: 'beta',
    ...options
  };

  try {
    const susyPath = retry(
      async (_, attempt: number) => {
        if (attempt > 1) {
          logger()('@susy-js/electron:main')('Retrying.');
        }

        // Delete any old Susy if it exists, otherwise electron-dl will
        // download the new binary with a (1) at the end of the filename
        await deleteSusy();

        // Fetch the metadata of the correct version of susy
        const metadataUrl = `${VANITY_URL}?version=${susyChannel}&os=${getOs()}&architecture=${getArch()}`;
        logger()('@susy-js/electron:main')(`Downloading from ${metadataUrl}.`);
        const { data } = await axios.get(metadataUrl);

        // Get the binary's url
        const {
          name,
          downloadUrl,
          checksum: expectedChecksum
        }: {
          name: string;
          downloadUrl: string;
          checksum: string;
        } = data[0].files.find(
          ({ name }: { name: string }) =>
            name === 'susy' || name === 'susy.exe'
        );

        // Start downloading.
        const downloadItem = await download(mainWindow, downloadUrl, {
          directory: app.getPath('userData'),
          filename: `${name}.part`,
          onProgress
        });
        const downloadPath: string = downloadItem.getSavePath();

        // Once downloaded, we check the sha256 checksum
        // Calculate the actual checksum
        // @ts-ignore Types from @types/checksum are incorrect, checksum does
        // take 2 arguments: https://github.com/dshaw/checksum/blob/master/checksum.js#L26
        const actualChecksum: string = await checksum(downloadPath, {
          algorithm: 'sha256'
        });
        // The 2 checksums should of course match
        if (expectedChecksum !== actualChecksum) {
          throw new Error(
            `Checksum mismatch, expecting ${expectedChecksum}, got ${actualChecksum}.`
          );
        }

        // Set a+x permissions on the downloaded binary
        await fsChmod(downloadPath, '755');

        // Binary is ready to be used: remove `.part` from filename
        await fsRename(downloadPath, await defaultSusyPath());

        // Double-check that Susy exists now.
        return getSusyPath();
      },
      {
        retries: 3
      }
    );

    return susyPath;
  } catch (err) {
    await deleteSusy();
    throw err;
  }
}
