export interface Point {
  x: number;
  y: number;
}

export interface PolarPoint {
  angle: number;
  distance: number;
}

/**
 * Transforms big integer to array of points by converting it to string and
 * splitting on 2-diggit integer pairs:
 *
 *  72731213 => [{72,73}] [{12,13}]
 *
 * Transforming integer with less than 4 diggits returns empty array of points:
 *
 *  324 => []
 *
 * Last diggits that don't form full 2-diggit integer pair are ignored:
 *
 *  72731213987 => [{72,73}] [{12,13}] (987 is ignored)
 *
 * @param {bigint} [n] The BigInt number to convert.
 * @returns {Array<Point>} An array of points.
 */
export function intToPoints(n: bigint): Point[] {
  if (n < BigInt(0)) {
    return [];
  }

  let nStr = n.toString();

  if (nStr.length < 4) {
    return [];
  }

  const extraChars = nStr.length % 4;
  if (extraChars > 0) {
    nStr = nStr.slice(0, nStr.length - extraChars);
  }

  return Array.from({ length: nStr.length / 4 }, (_, i) => i * 4).map((i) => {
    const xy = nStr.slice(i, i + 4);
    return { x: Number(xy.slice(0, 2)), y: Number(xy.slice(2, 4)) };
  });
}

/**
 * Calculates center of mass coordinates for given array of points
 * @param {Array<Point>} [points] An array of points.
 * @returns {Point} center of mass coordinates
 */
export function pointsCenterOfMass(points: Point[]): Point | undefined {
  if (points.length === 0) {
    return undefined;
  }

  return {
    x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
    y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
  };
}

/**
 * Converts cartesian coordinates to polar
 * @param {Point} [point] Point coordinates
 * @param {Point} [center] Center coordinates
 * @returns {PolarPoint} Polar coordinates
 */
export function cartesianToSquaredPolar(
  point: Point,
  center: Point
): PolarPoint {
  return {
    angle: Math.atan2(point.y - center.y, point.x - center.x),
    distance: Math.sqrt((point.x - center.x) ** 2 + (point.y - center.y) ** 2), // Square of distance
  };
}

/**
 * Sorts array of points by their polar coordinates relative to calculated center of mass
 * @param {Array<Point>} [points] An array of points.
 * @param {Point} [center] Center point for cartesian coordinates
 * @returns {Array<Point>} Sorted array of points.
 */
export function sortPointsPolar(points: Point[], center: Point): Point[] {
  return points
    .map((p) => {
      const s = cartesianToSquaredPolar(p, center);
      return {
        ...p,
        angle: s.angle,
        distance: s.distance,
      };
    })
    .sort((a, b) => {
      return a.angle - b.angle || a.distance - b.distance;
    })
    .map((p) => {
      return {
        x: p.x,
        y: p.y,
      };
    });
}
