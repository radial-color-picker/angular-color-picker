/**
 *
 * @param canvas Canvas to paint the color wheel
 * @param diameter Color wheel diameter in pixels
 * @param currentColorDegree deegre value of the current selected color, defaults to 180
 * @param coefficient Relation between inner white circle outer border and color circle outer border, controls the width of the color gradient path
 * @returns canvas The passed canvas for easier chaining
 */
export const renderColorMap = (canvas: HTMLCanvasElement, diameter: number, currentColorDegree: number = 0, coefficient: number = 0.77): HTMLCanvasElement => {
  canvas.width = canvas.height = diameter;
  const radius = diameter / 2;
  const toRad = (2 * Math.PI) / 360;
  const step = 0.5;
  const aliasing = 1;
  const lineWidth = 2;

  const INITIAL_ANGLE = 0;
  const FINAL_ANGLE = 360;
  const ANGLE_OFFSET = 90;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, diameter, diameter);
  for (let i = INITIAL_ANGLE; i <= FINAL_ANGLE; i += step) {
    const startAngle = i > INITIAL_ANGLE ? (i - aliasing + ANGLE_OFFSET) * toRad : (i + ANGLE_OFFSET) * toRad;
    const endAngle = (i + step + ANGLE_OFFSET) * toRad;
    ctx.beginPath();
    ctx.arc(radius, radius, radius, startAngle, endAngle, false);
    if (i >= 180) {
      const lightnessValue = Math.abs((i * 100 / 180) - 200);
      ctx.strokeStyle = `hsl(${currentColorDegree}, 100%, ${lightnessValue}%)`;
    } else {
      ctx.strokeStyle = 'hsl(' + i * 2 + ', 100%, 50%)';
    }

    ctx.lineWidth = radius;
    ctx.closePath();
    ctx.stroke();
  }


  // Replaces circle with white
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.beginPath();
  ctx.arc(radius + lineWidth, radius, radius * coefficient, INITIAL_ANGLE * toRad, FINAL_ANGLE * toRad, false);
  ctx.closePath();
  ctx.fill();

  // Removes outline circle
/*  ctx.strokeStyle = 'rgb(255, 255, 255)';
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.arc(radius, radius, 50, 270*toRad, 90 * toRad);
  ctx.stroke();*/


  return canvas;
};
