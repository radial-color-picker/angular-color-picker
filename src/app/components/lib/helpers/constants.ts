export const Cache = {
  sin90: Math.sin(270 * Math.PI / 180),
  sin180: Math.sin(180 * Math.PI / 180),
  sin270: Math.sin(90 * Math.PI / 180),
  cos90: Math.cos(270 * Math.PI / 180),
  cos180: Math.cos(180 * Math.PI / 180),
  cos270: Math.cos(90 * Math.PI / 180)
};

export const Quadrant = {
  I: 'q1',
  II: 'q2',
  III: 'q3',
  IV: 'q4'
};

export const bezierCurves = {
  // Standard easing puts subtle attention at the end of an animation,
  // by giving more time to deceleration than acceleration.It is the most common form of easing.
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  // Elements exiting a screen use acceleration easing, where they start at rest and end at peak velocity.
  acc: 'cubic-bezier(0.4, 0.0, 1, 1)',
  // Incoming elements are animated using deceleration easing,
  // which starts a transition at peak velocity(the fastest point of an element’s movement) and ends at rest.
  dec: 'cubic-bezier(0.0, 0.0, 0.2, 1)'
};

export const timings = {
  simpleMicro: '100ms',
  simpleEnter: '150ms',
  simpleExit: '75ms',
  complexEnter: '250ms',
  complexExit: '200ms',
  largeEnter: '300ms',
  largeExit: '250ms'
};
