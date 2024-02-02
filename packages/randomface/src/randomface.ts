import type { Point } from './utils/points';
import {
  intToPoints,
  pointsCenterOfMass,
  sortPointsPolar,
} from './utils/points';
import { pointInPolygon } from './utils/pointinpolygon';
import { curvedSVGPath } from './utils/curvedpath';

// Points are mapped to the following areas to plot parts of the face:
//
// +---------------+
// | left  | right |
// | eye  / \  eye |
// |     / n \     |
// |____/_____\____|
// |     mouth     |
// +---------------+

const leftEyeArea = [
  { x: 0, y: 0 },
  { x: 50, y: 0 },
  { x: 50, y: 25 },
  { x: 20, y: 65 },
  { x: 0, y: 65 },
];

const rightEyeArea = [
  { x: 51, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 65 },
  { x: 80, y: 65 },
  { x: 51, y: 25 },
];

const mouthArea = [
  { x: 0, y: 66 },
  { x: 100, y: 66 },
  { x: 100, y: 100 },
  { x: 0, y: 100 },
];

export interface FacePaths {
  leftEye: string;
  rightEye: string;
  nose: string;
  mouth: string;
}
export interface RandomfaceSVGData {
  svg: string;
  paths: FacePaths;
}

/**
 * Returns SVG data of randomface from provided SHA256 hash
 * @param {string} [sha256hash] - SHA256 hash in hex
 * @returns {RandomfaceSVGData} svg data of generated face
 */
export function RandomfaceSVG(sha256hash: string): RandomfaceSVGData {
  if (sha256hash.length !== 64) {
    throw new Error(
      'Input must be SHA-256 hash in hex format (exactly 64 characters long).'
    );
  }

  const leftEyePoints = new Array<Point>();
  const rightEyePoints = new Array<Point>();
  const nosePoints = new Array<Point>();
  const mouthPoints = new Array<Point>();

  const hashBigInt = BigInt(`0x${sha256hash}`);
  const points = intToPoints(hashBigInt);

  points.forEach((point) => {
    if (pointInPolygon(point, leftEyeArea)) {
      leftEyePoints.push(point);
    } else if (pointInPolygon(point, rightEyeArea)) {
      rightEyePoints.push(point);
    } else if (pointInPolygon(point, mouthArea)) {
      mouthPoints.push(point);
    } else {
      nosePoints.push(point);
    }
  });

  const leftEyePath = sortPointsAndBuildPath(leftEyePoints);
  const righEyePath = sortPointsAndBuildPath(rightEyePoints);
  const nosePath = sortPointsAndBuildPath(nosePoints);
  const mouthPath = sortPointsAndBuildPath(mouthPoints);

  return {
    svg: `<svg viewBox='0 0 100 100' fill='currentColor' stroke-linejoin='round' stroke-linecap='round' stroke-width='2' preserveAspectRatio='xMinYMin meet' fill-rule='evenodd' clip-rule='evenodd'><path d='${leftEyePath}'></path><path d='${righEyePath}'></path><path d='${nosePath}'></path><path d='${mouthPath}'></path></svg>`,
    paths: {
      leftEye: leftEyePath,
      rightEye: righEyePath,
      nose: nosePath,
      mouth: mouthPath,
    },
  };
}

function sortPointsAndBuildPath(points: Point[]) {
  if (points.length === 0) return '';

  return curvedSVGPath(
    sortPointsPolar(points, pointsCenterOfMass(points) ?? ({} as Point)),
    0.2
  );
}
