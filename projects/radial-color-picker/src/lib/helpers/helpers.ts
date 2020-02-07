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
 */
export const determineCSSRotationAngle = (point, quadrant) => {
  let cx = point.x;
  let cy = point.y;
  let add = 0;
  switch (quadrant) {
    case Quadrant.II:
      add = 270;
      cx = ((point.x * Cache.cos90) - (point.y * Cache.sin90));
      cy = ((point.x * Cache.sin90) + (point.y * Cache.cos90));
      break;
    case Quadrant.III:
      add = 180;
      cx = ((point.x * Cache.cos180) - (point.y * Cache.sin180));
      cy = ((point.x * Cache.sin180) + (point.y * Cache.cos180));
      break;
    case Quadrant.IV:
      add = 90;
      cx = ((point.x * Cache.cos270) - (point.y * Cache.sin270));
      cy = ((point.x * Cache.sin270) + (point.y * Cache.cos270));
      break;
  }

  const rotation = Math.atan((distanceOfSegmentByXYValues(0, cy, cx, cy)) / (distanceOfSegmentByXYValues(0, cy, 0, 0)));

  return (rotation * (180 / Math.PI)) + add;
};
