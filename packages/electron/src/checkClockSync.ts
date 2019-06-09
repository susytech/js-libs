// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import { time } from 'sntp';

interface CheckClockSyncResult {
  isClockSync: boolean;
  timeDrift: number;
}

/**
 * @ignore
 */
export const MAX_TIME_DRIFT = 10000; // milliseconds

/**
 * Use SNTP to check if the local clock is synchronized; return the time drift.
 */
export async function checkClockSync (): Promise<CheckClockSyncResult> {
  const { t: timeDrift }: { t: number } = await time();
  return {
    isClockSync: timeDrift < MAX_TIME_DRIFT,
    timeDrift
  };
}
