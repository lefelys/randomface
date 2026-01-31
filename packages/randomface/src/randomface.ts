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

const noseArea = [
  { x: 20, y: 65 },
  { x: 50, y: 25 },
  { x: 51, y: 25 },
  { x: 80, y: 65 },
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
  const nosePoints = new Array<Point>();
  const mouthPoints = new Array<Point>();

  const hashBigInt = BigInt(`0x${sha256hash}`);
  const points = intToPoints(hashBigInt);

  points.forEach((point) => {
    if (pointInPolygon(point, leftEyeArea)) {
      leftEyePoints.push(point);
    } else if (pointInPolygon(point, mouthArea)) {
      mouthPoints.push(point);
    } else if (!pointInPolygon(point, rightEyeArea)) {
      // Only add to nose if not in right eye area (we're ignoring right eye points)
      nosePoints.push(point);
    }
  });

  // Mirror left eye points to create right eye
  const rightEyePoints = leftEyePoints.map((point) => ({
    x: 100 - point.x,
    y: point.y,
  }));

  const leftEyePath = buildPathWithCross(leftEyePoints, leftEyeArea);
  const rightEyePath = buildPathWithCross(rightEyePoints, rightEyeArea);
  const nosePath = buildPathWithCross(nosePoints, noseArea);
  const mouthPath = buildPathWithCross(mouthPoints, mouthArea);

  return {
    svg: `<svg viewBox='0 0 100 100' fill='currentColor' stroke-linejoin='round' stroke-linecap='round' stroke-width='2' preserveAspectRatio='xMinYMin meet' fill-rule='evenodd' clip-rule='evenodd'><path d='${leftEyePath}'></path><path d='${rightEyePath}'></path><path d='${nosePath}'></path><path d='${mouthPath}'></path></svg>`,
    paths: {
      leftEye: leftEyePath,
      rightEye: rightEyePath,
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

function buildPathWithCross(points: Point[], area: Point[]): string {
  if (points.length === 0) {
    // No points - put cross in center of area
    const center = polygonCenter(area);
    return crossPath(center.x, center.y);
  }
  if (points.length === 1) {
    // One point - put cross at that point
    return crossPath(points[0].x, points[0].y);
  }
  return sortPointsAndBuildPath(points);
}

function polygonCenter(polygon: Point[]): Point {
  const sum = polygon.reduce(
    (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
    { x: 0, y: 0 }
  );
  return { x: sum.x / polygon.length, y: sum.y / polygon.length };
}

function crossPath(cx: number, cy: number, size = 5): string {
  // Draw an X cross centered at (cx, cy)
  return `M ${cx - size} ${cy - size} L ${cx + size} ${cy + size} M ${cx + size} ${cy - size} L ${cx - size} ${cy + size}`;
}
