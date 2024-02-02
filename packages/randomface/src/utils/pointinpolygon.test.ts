import { expect, test, describe } from 'vitest';
import { pointInPolygon } from './pointinpolygon';

describe('pointInPolygon', () => {
  const polygon = [
    { x: 3, y: 1 },
    { x: 1, y: 3 },
    { x: 3, y: 5 },
    { x: 5, y: 3 },
  ];

  const testCases = [
    // Points one pixel beyond edges
    { x: 3, y: 0, expected: false },
    { x: 4, y: 1, expected: false },
    { x: 5, y: 2, expected: false },
    { x: 6, y: 3, expected: false },
    { x: 5, y: 4, expected: false },
    { x: 4, y: 5, expected: false },
    { x: 3, y: 6, expected: false },

    { x: 2, y: 1, expected: false },
    { x: 1, y: 2, expected: false },
    { x: 0, y: 3, expected: false },
    { x: 1, y: 4, expected: false },
    { x: 2, y: 5, expected: false },

    // All points on the edges/vertices
    { x: 3, y: 1, expected: true },
    { x: 2, y: 2, expected: true },
    { x: 1, y: 3, expected: true },
    { x: 2, y: 4, expected: true },
    { x: 3, y: 5, expected: true },
    { x: 4, y: 4, expected: true },
    { x: 5, y: 3, expected: true },
    { x: 4, y: 2, expected: true },

    // All points in the middle
    { x: 3, y: 2, expected: true },
    { x: 2, y: 3, expected: true },
    { x: 3, y: 3, expected: true },
    { x: 4, y: 3, expected: true },
    { x: 3, y: 4, expected: true },
  ];

  testCases.map(({ x, y, expected }) => {
    test(`point {${x}, ${y}} in polygon`, () => {
      expect(pointInPolygon({ x, y }, polygon)).toBe(expected);
    });
  });
});
