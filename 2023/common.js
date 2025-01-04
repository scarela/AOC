import { readFileSync } from 'fs';
import { argv } from 'process';

const inputFileName = argv[1].split('/').with(-1, "input").join('/');
const isTesting = argv[2] === '-test';

const data = isTesting ? null : readFileSync(inputFileName, 'utf-8');

export const getNumbers = str => [...str.match(/-?\d+/g)]//Array.from(str.matchAll(/(\d+)/g), m => +m[1]);

export function useData(testData = null) {
  return { data: data ?? testData };
}

export function dayWrapper(fn, label) {
  if (typeof fn !== 'function') throw Error("Not a function");

  console.time("Processing...")
  console.log(`${label}${isTesting ? " [testing]:" : ":"}`, fn());
  console.timeEnd("Processing...")
}