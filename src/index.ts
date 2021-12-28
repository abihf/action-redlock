import { getInput, saveState, getState } from '@actions/core';
import Redlock, { Lock } from 'redlock';

const REDIS = getInput('redis')
const KEY = getInput('key');
const TTL = getInput('ttl');

const redlock = new Redlock(REDIS.split(','));

export async function lock() {
  const lock = await redlock.acquire([KEY], parseInt(TTL, 10))
  // saveState('key', KEY)
  saveState('value', lock.value);
}

export async function unlock() {
  const lock = new Lock(redlock, [KEY], getState('value'), {} as any, 0);
  redlock.release(lock);
}
