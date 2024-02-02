// pointinpoly - point-in-polygon
//
// Copyright (c) 2019 Mark Warren
//
// The MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// Source: https://github.com/metafloor/pointinpoly

import type { Point } from './points';

/**
 * Detects if point is inside polygon (incl. on the edge or in the corner)
 * @param {Point} [point] Point coordinates.
 * @param {Array<Point>} [polygon] Array of point for polygon.
 * @returns {boolean} is point inside polygon or not
 */
export function pointInPolygon(point: Point, polygon: Point[]): boolean {
  let c = false;
  for (let l = polygon.length, i = 0, j = l - 1; i < l; j = i++) {
    const xj = polygon[j].x,
      yj = polygon[j].y,
      xi = polygon[i].x,
      yi = polygon[i].y;
    const where = (yi - yj) * (point.x - xi) - (xi - xj) * (point.y - yi);
    if (yj < yi) {
      if (point.y >= yj && point.y < yi) {
        if (where === 0) return true; // point on the line
        if (where > 0) {
          if (point.y === yj) {
            // ray intersects vertex
            if (point.y > polygon[j === 0 ? l - 1 : j - 1].y) {
              c = !c;
            }
          } else {
            c = !c;
          }
        }
      }
    } else if (yi < yj) {
      if (point.y > yi && point.y <= yj) {
        if (where === 0) return true; // point on the line
        if (where < 0) {
          if (point.y === yj) {
            // ray intersects vertex
            if (point.y < polygon[j === 0 ? l - 1 : j - 1].y) {
              c = !c;
            }
          } else {
            c = !c;
          }
        }
      }
    } else if (
      point.y === yi &&
      ((point.x >= xj && point.x <= xi) || (point.x >= xi && point.x <= xj))
    ) {
      return true; // point on horizontal edge
    }
  }
  return c;
}
