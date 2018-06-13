/**
 * Modified version of Lea Verou's
 * {@link https://github.com/leaverou/conic-gradient conic-gradient}.
 *
 * @example
 * paintColorWheelToCanvas(document.querySelector('#canvas'), 250);
 *
 * @param canvas Canvas to paint the color wheel
 * @param size   Color wheel diameter in pixels
 * @returns canvas The passed canvas for easier chaining
 */
export const paintColorWheelToCanvas = (canvas: HTMLCanvasElement, size: number): HTMLCanvasElement => {
  const half = size / 2;
  const radius = Math.sqrt(2) * half;
  const deg = Math.PI / 180;
  const pi2 = Math.PI * 2;

  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');

  // .02: To prevent empty blank line and corresponding moire
  // only non-alpha colors are cared now
  const thetaOffset = 0.5 * deg + 0.02;

  // Transform coordinate system so that angles start from the top left, like in CSS
  ctx.translate(half, half);
  ctx.rotate(-Math.PI / 2);
  ctx.translate(-half, -half);

  for (let i = 0; i < 360; i += 0.5) {
    ctx.fillStyle = `hsl(${i}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(half, half);

    const beginArg = i * deg;
    const endArg = Math.min(pi2, beginArg + thetaOffset);

    ctx.arc(half, half, radius, beginArg, endArg);

    ctx.closePath();
    ctx.fill();
  }

  return canvas;
};

/**
 *
 * @param canvas Canvas to paint the color wheel
 * @param diameter Color wheel diameter in pixels
 * @param coefficient Relation between inner white circle outer border and color circle outer border, controls the width of the color gradient path
 * @returns canvas The passed canvas for easier chaining
 */
export const renderColorMap = (canvas: HTMLCanvasElement, diameter: number, coefficient: number = 0.77): HTMLCanvasElement => {
  canvas.width = canvas.height = diameter;
  const radius = diameter / 2;
  const toRad = (2 * Math.PI) / 360;
  const step = 0.2;
  const aliasing = 1;


  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, diameter, diameter);
  for (let i = 0; i < 360; i += step) {
    const sRad = (i - aliasing) * toRad;
    const eRad = (i + step) * toRad;
    ctx.beginPath();
    ctx.arc(radius, radius, radius / 2, sRad, eRad, false);
    ctx.strokeStyle = 'hsl(' + i + ', 100%, 50%)';
    ctx.lineWidth = radius;
    ctx.closePath();
    ctx.stroke();
  }

  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.beginPath();
  ctx.arc(radius, radius, radius * coefficient, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = 'rgb(255, 255, 255)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.stroke();


  return canvas;
};
