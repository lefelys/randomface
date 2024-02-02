import { expect, test, describe } from 'vitest';
import { curvedSVGPath } from './curvedpath';

describe('curvedSVGPath', () => {
  const testCases = [
    {
      points: [
        { x: 3, y: 1 },
        { x: 1, y: 3 },
        { x: 3, y: 5 },
        { x: 5, y: 3 },
      ],
      smoothing: 0.2,
      expected:
        'M 3 1 C 2.2 1 1 2.2 1 3 C 1 3.8 2.2 5 3 5 C 3.8 5 5 3.8 5 3 C 5 2.2 3.8 1 3 1 Z',
    },
    {
      points: [
        { x: 3, y: 1 },
        { x: 1, y: 3 },
        { x: 3, y: 5 },
        { x: 5, y: 3 },
      ],
      smoothing: 0.1,
      expected:
        'M 3 1 C 2.6 1 1 2.6 1 3 C 1 3.4 2.6 5 3 5 C 3.4 5 5 3.4 5 3 C 5 2.6 3.4 1 3 1 Z',
    },
    {
      points: [
        { x: 3, y: 1 },
        { x: 1, y: 3 },
      ],
      smoothing: 0.1,
      expected: 'M 3 1 C 3 1 1 3 1 3 C 1 3 3 1 3 1 Z',
    },
    {
      points: [{ x: 3, y: 1 }],
      smoothing: 0.1,
      expected: 'M 3 1 C 3 1 3 1 3 1 C 3 1 3 1 3 1 Z',
    },
    {
      points: [
        { x: 3, y: 1 },
        { x: 4, y: 2 },
        { x: 10, y: 25 },
        { x: 8, y: 60 },
        { x: 0, y: 0 },
      ],
      smoothing: 0.1,
      expected:
        'M 3 1 C 3.4 1.2 3.3 -0.4 4 2 C 4.7 4.4 9.6 19.2 10 25 C 10.4 30.8 9 62.5 8 60 C 7 57.5 0.5 5.9 0 0 C -0.5 -5.9 2.6 0.8 3 1 Z',
    },
    {
      points: [],
      smoothing: 0.1,
      expected: '',
    },
  ];

  testCases.map(({ points, smoothing, expected }) => {
    test(`points ${JSON.stringify(points, null, '').replace(
      /"/g,
      '\\"'
    )}, smoothing ${smoothing}`, () => {
      expect(curvedSVGPath(points, smoothing)).toBe(expected);
    });
  });
});
