export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return { r, g, b };
};
export const extractRGB = (rgb) => {
  const result = /^(?:rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\))$/i.exec(rgb);
  const r = parseInt(result[1], 10);
  const g = parseInt(result[2], 10);
  const b = parseInt(result[3], 10);

  return { r, g, b };
};
export const extractHSL = (hsl) => {
  const result = /^(?:hsl\((\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\))$/i.exec(hsl);
  const h = parseInt(result[1], 10);
  const s = parseInt(result[2], 10);
  const l = parseInt(result[3], 10);

  return { h, s, l };
};



/**
 * Converts RGB color model to hexadecimal string.
 *
 * @memberOf Utilities
 *
 * @param r Integer between 0 and 255
 * @param g Integer between 0 and 255
 * @param b Integer between 0 and 255
 *
 * @return 6 char long hex string
*/
export const rgbToHex = (r: number, g: number, b: number): string => {
  // tslint:disable-next-line:no-bitwise
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Converts RGB color model to HSL model.
 *
 * @memberOf Utilities
 *
 * @param r Integer between 0 and 255
 * @param g Integer between 0 and 255
 * @param Integer between 0 and 255
 *
 * @return The HSL representation containing the hue (in degrees),
 *                     saturation (in percentage) and luminosity (in percentage) fields.
 */
export const rgbToHsl = (r: number, g: number, b: number): { hue: number, saturation: number, luminosity: number } => {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  let h, s;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    }
    if (max === g) {
      h = (b - r) / d + 2;
    }
    if (max === b) {
      h = (r - g) / d + 4;
    }
  }

  return {
    hue: h * 60,
    saturation: s * 100,
    luminosity: l * 100
  };
};

/**
 * Converts HSL color model to hexademical string.
 *
 * @memberOf Utilities
 *
 * @param h Integer between 0 and 360
 * @param s Integer between 0 and 100
 * @param l Integer between 0 and 50
 *
 * @return 6 char long hex string
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  const colorModel = hslToRgb(h, s, l);

  return rgbToHex(colorModel.red, colorModel.green, colorModel.blue);
};

/**
 * Converts HSL color model to RGB model.
 * Shamelessly taken from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 *
 * @memberOf Utilities
 *
 * @param h The hue. Number in the 0-360 range
 * @param s The saturation. Number in the 0-100 range
 * @param l The luminosity. Number in the 0-100 range
 *
 * @return The RGB representation containing the red, green and blue fields
 */
export const hslToRgb = (h, s, l): { red: number, green: number, blue: number } => {
  let r, g, b;

  h = h / 360;
  s = s / 100;
  l = l / 100;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = _hue2rgb(p, q, h + 1 / 3);
    g = _hue2rgb(p, q, h);
    b = _hue2rgb(p, q, h - 1 / 3);
  }

  return {
    red: Math.round(r * 255),
    green: Math.round(g * 255),
    blue: Math.round(b * 255)
  };
};

export const _hue2rgb = (p, q, t) => {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }

  return p;
};
