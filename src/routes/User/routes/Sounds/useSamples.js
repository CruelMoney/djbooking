import { useMemo } from "react";

const useSamples = ({ resolution, samples }) => {
  const bars = useMemo(() => {
    return splitUp(samples, resolution).map(average);
  }, [samples, resolution]);

  return bars;
};

const average = array =>
  Math.round(array.reduce((sum, current) => sum + current, 0) / array.length);

function splitUp(arr, n) {
  if (arr.length < n) {
    return arr.map(n => [n]);
  }
  const partLength = Math.floor(arr.length / n);
  let rest = arr.length % n;
  const result = [];

  let maxDistance = Math.floor(1 / (rest / n));
  let bucket = 0;

  for (let i = 0; i < arr.length; i += partLength) {
    let end = partLength + i;
    const shouldAddExtra = bucket % maxDistance === 0 && rest;
    if (shouldAddExtra) {
      end++;
      rest--;
    }
    result.push(arr.slice(i, end)); // part of the array
    if (shouldAddExtra) {
      i++;
    }
    bucket++;
  }

  return result;
}

export default useSamples;
