export const shadeColor = (color: string, percent: number) => {
  color = rgbToHex(color);

  let R: number = parseInt(color.substring(1, 3), 16);
  let G: number = parseInt(color.substring(3, 5), 16);
  let B: number = parseInt(color.substring(5, 7), 16);

  R = (R * (100 + percent)) / 100;
  G = (G * (100 + percent)) / 100;
  B = (B * (100 + percent)) / 100;

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
};
const rgbToHex = (color: string) => {
  if (color.charAt(0) == '#') {
    return color;
  }

  color = '' + color;
  if (!color || color.indexOf('rgb') < 0) {
    return '#FFFFFF';
  }

  let nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color);

  if (!nums) return '#FFFFFF';

  let r = parseInt(nums[2], 10).toString(16);
  let g = parseInt(nums[3], 10).toString(16);
  let b = parseInt(nums[4], 10).toString(16);

  return (
    '#' +
    ((r.length == 1 ? '0' + r : r) +
      (g.length == 1 ? '0' + g : g) +
      (b.length == 1 ? '0' + b : b))
  );
};

/**
 *
 * @param hex - hex color to be converted. Accepts only shorthend hex colors (#f00 -> rgb(255, 0, 0))
 * or full hex colors (#ff0000 -> rgb(255, 0, 0))
 * If invalid color is entered, it will return white color rgb(255, 255, 255)
 * @returns converted rgb color
 */
export const hexToRgb = (hex: string) => {
  // if hex doesnt start with #, return white
  if (hex.charAt(0) != '#') return `rgb(255, 255, 255)`;

  // remove #
  hex = hex.substring(1);

  // if it's shorthend hex, expand it
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }

  if (hex.length != 6) return `rgb(255, 255, 255)`;

  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
};

export const calculateGradient = (
  startColor: string,
  endColor: string,
  numberOfGradents: number,
) => {
  if (startColor.charAt(0) !== '#') startColor = rgbToHex(startColor);
  if (endColor.charAt(0) !== '#') endColor = rgbToHex(endColor);

  startColor = startColor.substring(1);
  endColor = endColor.substring(1);

  const startR = parseInt(startColor.substring(0, 2), 16);
  const startG = parseInt(startColor.substring(2, 4), 16);
  const startB = parseInt(startColor.substring(4, 6), 16);

  const endR = parseInt(endColor.substring(0, 2), 16);
  const endG = parseInt(endColor.substring(2, 4), 16);
  const endB = parseInt(endColor.substring(4, 6), 16);

  let differenceR = endR - startR;
  let differenceG = endG - startG;
  let differenceB = endB - startB;

  const gradients: string[] = [];

  for (let i = 0; i < numberOfGradents; ++i) {
    let percent = i / numberOfGradents;

    let gradientR = (differenceR * percent + startR).toString(16).split('.')[0];
    let gradientG = (differenceG * percent + startG).toString(16).split('.')[0];
    let gradientB = (differenceB * percent + startB).toString(16).split('.')[0];

    // ensure 2 digits by color
    if (gradientR.length == 1) gradientR = '0' + gradientR;
    if (gradientG.length == 1) gradientG = '0' + gradientG;
    if (gradientB.length == 1) gradientB = '0' + gradientB;

    gradients.push('#' + gradientR + gradientG + gradientB);
  }

  return gradients;
};
export const adjustHexOpacity = (color: string, opacity: number) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
};
