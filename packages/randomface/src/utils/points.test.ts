import { expect, test, describe } from 'vitest';
import type { Point } from './points';
import {
  cartesianToSquaredPolar,
  intToPoints,
  pointsCenterOfMass,
  sortPointsPolar,
} from './points';

describe('intToPoints', () => {
  const testCases = [
    { int: BigInt(-1234), expected: new Array<Point>() },
    { int: BigInt(0), expected: new Array<Point>() },
    { int: BigInt(123), expected: new Array<Point>() },
    { int: BigInt(1234), expected: new Array<Point>({ x: 12, y: 34 }) },
    { int: BigInt(12345), expected: new Array<Point>({ x: 12, y: 34 }) },
    { int: BigInt(123456), expected: new Array<Point>({ x: 12, y: 34 }) },
    { int: BigInt(1234567), expected: new Array<Point>({ x: 12, y: 34 }) },
    {
      int: BigInt(12345678),
      expected: new Array<Point>({ x: 12, y: 34 }, { x: 56, y: 78 }),
    },
    {
      int: BigInt(12040078),
      expected: new Array<Point>({ x: 12, y: 4 }, { x: 0, y: 78 }),
    },
  ];

  testCases.map(({ int, expected }) => {
    test(`${int} to points`, () => {
      expect(intToPoints(int)).toStrictEqual(expected);
    });
  });
});

describe('pointsCenterOfMass', () => {
  const testCases = [
    {
      points: [
        { x: 3, y: 1 },
        { x: 1, y: 3 },
        { x: 3, y: 5 },
        { x: 5, y: 3 },
      ],
      expected: { x: 3, y: 3 },
    },
    {
      points: [
        { x: 3, y: 1 },
        { x: 4, y: 2 },
        { x: 10, y: 25 },
        { x: 8, y: 60 },
        { x: 0, y: 0 },
      ],
      expected: { x: 5, y: 17.6 },
    },
    {
      points: [
        { x: -3, y: -1 },
        { x: -4, y: -2 },
        { x: 10, y: 25 },
        { x: 8, y: 60 },
        { x: 0, y: 0 },
      ],
      expected: { x: 2.2, y: 16.4 },
    },
    {
      points: [{ x: 3, y: 1 }],
      expected: { x: 3, y: 1 },
    },
    {
      points: [],
      expected: undefined,
    },
  ];

  testCases.map(({ points, expected }) => {
    test(`points ${JSON.stringify(points, null, '').replace(
      /"/g,
      '\\"'
    )}`, () => {
      expect(pointsCenterOfMass(points)).toStrictEqual(expected);
    });
  });
});

describe('cartesianToSquaredPolar', () => {
  const testCases = [
    {
      point: { x: 1, y: 1 },
      center: { x: 0, y: 0 },
      expected: { angle: 0.7853981633974483, distance: 1.4142135623730951 },
    },
    {
      point: { x: 1, y: 0 },
      center: { x: 0, y: 0 },
      expected: { angle: 0, distance: 1 },
    },
    {
      point: { x: 1, y: 2 },
      center: { x: 0, y: 0 },
      expected: { angle: 1.1071487177940904, distance: 2.23606797749979 },
    },
    {
      point: { x: 121, y: 332 },
      center: { x: 0, y: 0 },
      expected: { angle: 1.2212999848468977, distance: 353.3624201864143 },
    },
    {
      point: { x: 121, y: 332 },
      center: { x: 100, y: 100 },
      expected: { angle: 1.4805250909542953, distance: 232.94849216082082 },
    },
    {
      point: { x: -121, y: -332 },
      center: { x: -100, y: -100 },
      expected: { angle: -1.661067562635498, distance: 232.94849216082082 },
    },
  ];

  testCases.map(({ point, center, expected }) => {
    test(`[point {${point}}, center {${center}}`, () => {
      expect(cartesianToSquaredPolar(point, center)).toStrictEqual(expected);
    });
  });
});

describe('sortPointsPolar', () => {
  const testCases = [
    {
      points: [
        { x: 3, y: 1 },
        { x: 1, y: 3 },
        { x: 3, y: 5 },
        { x: 5, y: 3 },
      ],
      center: { x: 0, y: 0 },
      expected: [
        { x: 3, y: 1 },
        { x: 5, y: 3 },
        { x: 3, y: 5 },
        { x: 1, y: 3 },
      ],
    },
    {
      points: [
        { x: 3, y: 1 },
        { x: 4, y: 2 },
        { x: 10, y: 25 },
        { x: 8, y: 60 },
        { x: 0, y: 0 },
      ],
      center: { x: 11, y: 10 },
      expected: [
        { x: 0, y: 0 },
        { x: 3, y: 1 },
        { x: 4, y: 2 },
        { x: 8, y: 60 },
        { x: 10, y: 25 },
      ],
    },
    {
      points: [
        { x: -3, y: -1 },
        { x: -4, y: -2 },
        { x: 10, y: 25 },
        { x: 8, y: 60 },
        { x: 0, y: 0 },
      ],
      center: { x: -10, y: -20 },
      expected: [
        { x: 0, y: 0 },
        { x: 10, y: 25 },
        { x: -3, y: -1 },
        { x: -4, y: -2 },
        { x: 8, y: 60 },
      ],
    },
    {
      points: [{ x: 3, y: 1 }],
      center: { x: 0, y: 0 },
      expected: [{ x: 3, y: 1 }],
    },
    {
      points: [],
      center: { x: 0, y: 0 },
      expected: [],
    },
  ];

  testCases.map(({ points, center, expected }) => {
    test(`points ${JSON.stringify(points, null, '').replace(
      /"/g,
      '\\"'
    )}, center ${center}`, () => {
      expect(sortPointsPolar(points, center)).toStrictEqual(expected);
    });
  });
});
