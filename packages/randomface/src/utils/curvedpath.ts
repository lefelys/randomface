import type { Point } from './points';

/**
 * Generates closed curved svg path from array of points.
 * @param {Array<Point>} [points] Array of point that form a closed path (sorted)
 * @param {number} [smoothing] Curves smoothing degree
 * @returns {string} svg path
 */
export function curvedSVGPath(points: Point[], smoothing = 0.2): string {
  if (points.length === 0) {
    return '';
  }

  if (points.length === 1) {
    points.push(points[0]);
  }

  // append first 2 points for smooth path closure
  let pointsI = points;
  if (points.length > 1) {
    pointsI = points.concat(points.slice(0, 2));
  }

  // Properties of a line
  const line = (pointA: Point, pointB: Point) => {
    const lengthX = pointB.x - pointA.x;
    const lengthY = pointB.y - pointA.y;
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX),
    };
  };

  // Position of a control point
  const controlPoint = (
    current: Point,
    previous?: Point,
    next?: Point,
    reverse = false
  ) => {
    const p = previous ?? current;
    const n = next ?? current;
    const o = line(p, n);

    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;

    const x = current.x + Math.cos(angle) * length;
    const y = current.y + Math.sin(angle) * length;
    return { x, y };
  };

  let pathData = pointsI.map((point, i) => {
    if (i === 0) {
      return { type: 'M ', values: [point.x, point.y] };
    }
    const cp1 = controlPoint(pointsI[i - 1], pointsI[i - 2], point);
    const cp2 = controlPoint(point, pointsI[i - 1], pointsI[i + 1], true);
    return {
      type: 'C ',
      values: [cp1.x, cp1.y, cp2.x, cp2.y, point.x, point.y],
    };
  });

  if (pointsI.length > 1) {
    const comLast = pathData[pathData.length - 1];
    const valuesLastC = comLast.values;
    const valuesFirstC = pathData[1].values;

    pathData[1] = {
      type: 'C ',
      values: [valuesLastC[0], valuesLastC[1], valuesFirstC.slice(2)].flat(),
    };

    pathData = pathData.slice(0, pathData.length - 1);
  }

  const d = pathData
    .map((com) => {
      return `${com.type}${com.values
        .map((value) => {
          return Number(value.toFixed(3));
        })
        .join(' ')}`;
    })
    .join(' ');

  return `${d} Z`;
}
