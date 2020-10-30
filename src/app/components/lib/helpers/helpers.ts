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
 */
export const determineCSSRotationAngle = (point) => {
  let cx = point.x;
  let cy = point.y;
  let addQuadrant = 0;
  let addQuadrantColor = 0;
  const quadrant = calculateQuadrant(point);
  switch (quadrant) {
    case Quadrant.I:
      addQuadrant = 180;
      break;
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
      addQuadrant = 270;
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

/**
 * Quadrant I and IV => opacity knob (right semicircle)
 * Quadrant II and III => color knob (left semicircle)
 * @param point
 */
export const isRightSemicircleSelected = (point) => {
  const quadrant = calculateQuadrant(point);
  return quadrant === Quadrant.I || quadrant === Quadrant.IV
};

const _normalizeX = (coordX, elementRect) => {
  return coordX - elementRect.left - elementRect.width / 2;
}

const _normalizeY = (coordY, elementRect) => {
  return ((coordY - elementRect.top) * -1) + elementRect.height / 2;
}

export const createPoint = (mouseEvent, elementRect): {x: number, y: number} => {
  let point;
  if (mouseEvent.targetTouches) {
    point = {
      x: _normalizeX(mouseEvent.targetTouches[0].clientX, elementRect),
      y: _normalizeY(mouseEvent.targetTouches[0].clientY, elementRect)
    };
  } else {
    point = {
      x: _normalizeX(mouseEvent.clientX, elementRect),
      y: _normalizeY(mouseEvent.clientY, elementRect)
    };
  }
  return point;
}
