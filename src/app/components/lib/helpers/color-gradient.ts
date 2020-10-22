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
  const step = 0.5;
  const aliasing = 1;

  const INITIAL_ANGLE = 90
  const FINAL_ANGLE = 270
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, diameter, diameter);
  for (let i = INITIAL_ANGLE; i < FINAL_ANGLE; i+=step) {
    const startAngle = (i - aliasing) * toRad;
    const endAngle = (i + step) * toRad;
    ctx.beginPath();
    ctx.arc(radius, radius, radius / 2, startAngle, endAngle, false);
    ctx.strokeStyle = 'hsl(' + (i-INITIAL_ANGLE)*2+ ', 100%, 50%)';
    ctx.lineWidth = radius;
    ctx.closePath();
    ctx.stroke();
  }


  // Replaces circle with white
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.beginPath();
  ctx.arc(radius, radius, radius * coefficient, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  // Removes outline circle
  ctx.strokeStyle = 'rgb(255, 255, 255)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.stroke();


  return canvas;
};
