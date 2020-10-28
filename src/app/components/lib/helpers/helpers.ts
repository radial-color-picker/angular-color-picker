import { Quadrant, Cache } from './constants';

/**
 * Calculates in which quadrant is the point, serves for calculating the right angle.
 *
 * @param point x,y coordinates of client's pointer position
 */
export const calculateQuadrant = (point: { x: number, y: number }): string => {
  if (point.x > 0) {
    if (point.y > 0) {
      return Quadrant.I;
    } else {
      return Quadrant.IV;
    }
  } else {
    if (point.y > 0) {
      return Quadrant.II;
    } else {
      return Quadrant.III;
    }
  }
};


/**
    * Calculates the distance between two points.
    *
    * This variant expects separate x/y values for each point. If you already have
    * the points as array or object use the corresponding methods.
    *
    * @param x1 The X value of the first point.
    * @param y1 The Y value of the first point.
    * @param x2 The X value of the second point.
    * @param y2 The Y value of the second point.
    * @return The distance between the two points.
    */
export const distanceOfSegmentByXYValues = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
};

/**
 * Calculates the angle of rotation
 *
 * @param point x,y coordinates of client's pointer position
 * @param quadrant one of four quarters of the coordinate plane
 * @param isSemiCircle means that the rotation should be adjusted from 360 to 180 degrees
 */
export const determineCSSRotationAngle = (point, isSemiCircle) => {
  let cx = point.x;
  let cy = point.y;
  let addQuadrant = 0;
  let addQuadrantColor = 0;
  const quadrant = calculateQuadrant(point);
  switch (quadrant) {
    case Quadrant.II:
      addQuadrant = 270;
      cx = ((point.x * Cache.cos90) - (point.y * Cache.sin90));
      cy = ((point.x * Cache.sin90) + (point.y * Cache.cos90));
      addQuadrantColor = 180;
      break;
    case Quadrant.III:
      addQuadrant = 180;
      cx = ((point.x * Cache.cos180) - (point.y * Cache.sin180));
      cy = ((point.x * Cache.sin180) + (point.y * Cache.cos180));
      break;
    case Quadrant.IV:
      addQuadrant = 90;
      cx = ((point.x * Cache.cos270) - (point.y * Cache.sin270));
      cy = ((point.x * Cache.sin270) + (point.y * Cache.cos270));
      break;
  }

  const toDegrees = 180 / Math.PI;

  const adjacent = distanceOfSegmentByXYValues(0, cy, 0, 0);
  const opposite = distanceOfSegmentByXYValues(0, cy, cx, cy);
  const rotation = Math.atan(opposite / adjacent) * toDegrees;

  return {
    rotation: rotation + addQuadrant,
    colorAngle: rotation * 2 + addQuadrantColor
  };
};

export const validPositionForSemicircle = (point) => {
  const quadrant = calculateQuadrant(point);
  return quadrant === Quadrant.II || quadrant === Quadrant.III;
};
