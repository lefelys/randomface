import { expect, test, describe } from 'vitest';
import { RandomfaceSVG } from './randomface';

describe('RandomfaceSVG', () => {
  const testCases = [
    {
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      expected: {
        svg: "<svg viewBox='0 0 100 100' fill='currentColor' stroke-linejoin='round' stroke-linecap='round' stroke-width='2' preserveAspectRatio='xMinYMin meet' fill-rule='evenodd' clip-rule='evenodd'><path d='M 1 11 C 1.8 7.2 7.6 26.8 10 29 C 12.4 31.2 10.8 23.2 13 22 C 15.2 20.8 19.2 15.8 21 23 C 22.8 30.2 24.6 49.6 22 58 C 19.4 66.4 11.2 67 8 65 C 4.8 63 7.4 58.8 6 48 C 4.6 37.2 0.2 14.8 1 11 Z'></path><path d='M 97 2 C 98.6 2.4 97 28.8 95 35 C 93 41.2 86.6 39.6 87 33 C 87.4 26.4 95.4 1.6 97 2 Z'></path><path d='M 55 40 C 56.2 36.8 61.8 44 62 49 C 62.2 54 57.4 66.8 56 65 C 54.6 63.2 53.8 43.2 55 40 Z'></path><path d='M 19 80 C 18.8 76 29 81 33 79 C 37 77 25.8 67.8 39 70 C 52.2 72.2 91.2 84.6 99 90 C 106.8 95.4 91 95.2 78 97 C 65 98.8 45.8 102.4 34 99 C 22.2 95.6 19.2 84 19 80 Z'></path></svg>",
        paths: {
          leftEye:
            'M 1 11 C 1.8 7.2 7.6 26.8 10 29 C 12.4 31.2 10.8 23.2 13 22 C 15.2 20.8 19.2 15.8 21 23 C 22.8 30.2 24.6 49.6 22 58 C 19.4 66.4 11.2 67 8 65 C 4.8 63 7.4 58.8 6 48 C 4.6 37.2 0.2 14.8 1 11 Z',
          rightEye:
            'M 97 2 C 98.6 2.4 97 28.8 95 35 C 93 41.2 86.6 39.6 87 33 C 87.4 26.4 95.4 1.6 97 2 Z',
          nose: 'M 55 40 C 56.2 36.8 61.8 44 62 49 C 62.2 54 57.4 66.8 56 65 C 54.6 63.2 53.8 43.2 55 40 Z',
          mouth:
            'M 19 80 C 18.8 76 29 81 33 79 C 37 77 25.8 67.8 39 70 C 52.2 72.2 91.2 84.6 99 90 C 106.8 95.4 91 95.2 78 97 C 65 98.8 45.8 102.4 34 99 C 22.2 95.6 19.2 84 19 80 Z',
        },
      },
    },
    {
      hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      expected: {
        svg: "<svg viewBox='0 0 100 100' fill='currentColor' stroke-linejoin='round' stroke-linecap='round' stroke-width='2' preserveAspectRatio='xMinYMin meet' fill-rule='evenodd' clip-rule='evenodd'><path d='M 6 7 C 6 7 48 24 48 24 C 48 24 6 7 6 7 Z'></path><path d='M 72 15 C 77.4 11.2 76.4 5.2 81 4 C 85.6 2.8 98.6 4.4 95 9 C 91.4 13.6 71.2 24.2 63 27 C 54.8 29.8 52.2 25.4 54 23 C 55.8 20.6 66.6 18.8 72 15 Z'></path><path d='M 57 39 C 56 38.2 57.6 38.2 59 39 C 60.4 39.8 64.4 43 64 43 C 63.6 43 58 39.8 57 39 Z'></path><path d='M 32 66 C 38.4 62 44.8 68.6 48 69 C 51.2 69.4 43.8 67.2 48 68 C 52.2 68.8 62.2 70.2 69 73 C 75.8 75.8 80.8 78 82 82 C 83.2 86 82.2 92.6 75 93 C 67.8 93.4 57.6 83.6 46 84 C 34.4 84.4 23 94 17 95 C 11 96 13 94.8 16 89 C 19 83.2 25.6 70 32 66 Z'></path></svg>",
        paths: {
          leftEye: 'M 6 7 C 6 7 48 24 48 24 C 48 24 6 7 6 7 Z',
          rightEye:
            'M 72 15 C 77.4 11.2 76.4 5.2 81 4 C 85.6 2.8 98.6 4.4 95 9 C 91.4 13.6 71.2 24.2 63 27 C 54.8 29.8 52.2 25.4 54 23 C 55.8 20.6 66.6 18.8 72 15 Z',
          nose: 'M 57 39 C 56 38.2 57.6 38.2 59 39 C 60.4 39.8 64.4 43 64 43 C 63.6 43 58 39.8 57 39 Z',
          mouth:
            'M 32 66 C 38.4 62 44.8 68.6 48 69 C 51.2 69.4 43.8 67.2 48 68 C 52.2 68.8 62.2 70.2 69 73 C 75.8 75.8 80.8 78 82 82 C 83.2 86 82.2 92.6 75 93 C 67.8 93.4 57.6 83.6 46 84 C 34.4 84.4 23 94 17 95 C 11 96 13 94.8 16 89 C 19 83.2 25.6 70 32 66 Z',
        },
      },
    },
    {
      hash: '24f631f4661480c59987c09b117dd1a0ed334245d7e494088114bc81bb3470a9',
      expected: {
        svg: "<svg viewBox='0 0 100 100' fill='currentColor' stroke-linejoin='round' stroke-linecap='round' stroke-width='2' preserveAspectRatio='xMinYMin meet' fill-rule='evenodd' clip-rule='evenodd'><path d='M 1 1 C 2.8 -4.2 9.2 8.2 15 11 C 20.8 13.8 32.6 7.2 30 15 C 27.4 22.8 6.8 45.6 2 50 C -2.8 54.4 6.2 46.8 6 37 C 5.8 27.2 -0.8 6.2 1 1 Z'></path><path d='M 55 5 C 55 -1.4 58 -1.8 61 0 C 64 1.8 65.6 9 70 14 C 74.4 19 80.8 21 83 25 C 85.2 29 81.2 28.8 81 34 C 80.8 39.2 86 51.4 82 51 C 78 50.6 66.4 41.2 61 32 C 55.6 22.8 55 11.4 55 5 Z'></path><path d='M 37 43 C 37 43 37 43 37 43 C 37 43 37 43 37 43 Z'></path><path d='M 16 71 C 23.2 68 42 81.2 52 82 C 62 82.8 60.4 74 66 75 C 71.6 76 79.6 83.2 80 87 C 80.4 90.8 80.8 92 68 94 C 55.2 96 26.4 101.6 16 97 C 5.6 92.4 8.8 74 16 71 Z'></path></svg>",
        paths: {
          leftEye:
            'M 1 1 C 2.8 -4.2 9.2 8.2 15 11 C 20.8 13.8 32.6 7.2 30 15 C 27.4 22.8 6.8 45.6 2 50 C -2.8 54.4 6.2 46.8 6 37 C 5.8 27.2 -0.8 6.2 1 1 Z',
          rightEye:
            'M 55 5 C 55 -1.4 58 -1.8 61 0 C 64 1.8 65.6 9 70 14 C 74.4 19 80.8 21 83 25 C 85.2 29 81.2 28.8 81 34 C 80.8 39.2 86 51.4 82 51 C 78 50.6 66.4 41.2 61 32 C 55.6 22.8 55 11.4 55 5 Z',
          nose: 'M 37 43 C 37 43 37 43 37 43 C 37 43 37 43 37 43 Z',
          mouth:
            'M 16 71 C 23.2 68 42 81.2 52 82 C 62 82.8 60.4 74 66 75 C 71.6 76 79.6 83.2 80 87 C 80.4 90.8 80.8 92 68 94 C 55.2 96 26.4 101.6 16 97 C 5.6 92.4 8.8 74 16 71 Z',
        },
      },
    },
    {
      hash: 'e42ee5f2da36700fdbde15a391bc8dd91c8ec0ac3222a60f0c8114d9dbd5220e',
      expected: {
        svg: "<svg viewBox='0 0 100 100' fill='currentColor' stroke-linejoin='round' stroke-linecap='round' stroke-width='2' preserveAspectRatio='xMinYMin meet' fill-rule='evenodd' clip-rule='evenodd'><path d='M 10 19 C 11.8 17.6 12.4 24 19 25 C 25.6 26 43.6 18 43 24 C 42.4 30 22.6 53.4 16 55 C 9.4 56.6 11.2 39.2 10 32 C 8.8 24.8 8.2 20.4 10 19 Z'></path><path d='M 64 15 C 67.4 6.2 91.4 4.4 98 5 C 104.6 5.6 100.4 9.2 97 18 C 93.6 26.8 87.6 49.6 81 49 C 74.4 48.4 60.6 23.8 64 15 Z'></path><path d=''></path><path d='M 21 82 C 23 77.8 18.8 69.2 24 68 C 29.2 66.8 38.2 75.6 47 76 C 55.8 76.4 62.8 69.4 68 70 C 73.2 70.6 72.8 77 73 79 C 73.2 81 74.6 77 69 80 C 63.4 83 52 90.8 45 94 C 38 97.2 38 96.2 34 96 C 30 95.8 29 94.4 25 93 C 21 91.6 14.8 91.2 14 89 C 13.2 86.8 19 86.2 21 82 Z'></path></svg>",
        paths: {
          leftEye:
            'M 10 19 C 11.8 17.6 12.4 24 19 25 C 25.6 26 43.6 18 43 24 C 42.4 30 22.6 53.4 16 55 C 9.4 56.6 11.2 39.2 10 32 C 8.8 24.8 8.2 20.4 10 19 Z',
          rightEye:
            'M 64 15 C 67.4 6.2 91.4 4.4 98 5 C 104.6 5.6 100.4 9.2 97 18 C 93.6 26.8 87.6 49.6 81 49 C 74.4 48.4 60.6 23.8 64 15 Z',
          nose: '',
          mouth:
            'M 21 82 C 23 77.8 18.8 69.2 24 68 C 29.2 66.8 38.2 75.6 47 76 C 55.8 76.4 62.8 69.4 68 70 C 73.2 70.6 72.8 77 73 79 C 73.2 81 74.6 77 69 80 C 63.4 83 52 90.8 45 94 C 38 97.2 38 96.2 34 96 C 30 95.8 29 94.4 25 93 C 21 91.6 14.8 91.2 14 89 C 13.2 86.8 19 86.2 21 82 Z',
        },
      },
    },
  ];

  testCases.map(({ hash, expected }) => {
    test(`${hash} to randomFaceSVG`, () => {
      expect(RandomfaceSVG(hash)).toStrictEqual(expected);
    });
  });
});
