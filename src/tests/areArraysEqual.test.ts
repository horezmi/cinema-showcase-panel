import { areArraysEqual } from '../utils/areArraysEqual';

describe('areArraysEqual', () => {
  test('should return true for equal arrays', () => {
    expect(areArraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(areArraysEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true);
    expect(areArraysEqual([true, false], [true, false])).toBe(true);
  });

  test('should return false for arrays of different lengths', () => {
    expect(areArraysEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(areArraysEqual(['a', 'b'], ['a'])).toBe(false);
  });

  test('should return false for arrays with different elements', () => {
    expect(areArraysEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(areArraysEqual(['a', 'b', 'c'], ['a', 'b', 'd'])).toBe(false);
    expect(areArraysEqual([true, false], [false, true])).toBe(false);
  });

  test('should return true for empty arrays', () => {
    expect(areArraysEqual([], [])).toBe(true);
  });

  test('should return false for different types', () => {
    expect(areArraysEqual([1, 2, 3], [1, 2, '3'])).toBe(false);
    expect(areArraysEqual([null], [undefined])).toBe(false);
  });
});
