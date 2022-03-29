/**
 *
 * Generates color gradients between start and end color.
 * Only accepts full or shorthend hex representations.
 * RGB, RGBA and hex with opacity are not supported.
 */
export const calculateGradient = (
  startColor: string,
  endColor: string,
  numberOfGradents: number,
) => {
  if (!isValidHexColor(startColor)) {
    console.warn(startColor + ' is not a valid hex color');
    startColor = '#00000000';
  }

  if (!isValidHexColor(endColor)) {
    console.warn(endColor + ' is not a valid hex color');
    endColor = '#00000000';
  }

  const startColorRGB = extractIndividualRGB(startColor);
  const endColorRGB = extractIndividualRGB(endColor);

  let differenceR = endColorRGB.R - startColorRGB.R;
  let differenceG = endColorRGB.G - startColorRGB.G;
  let differenceB = endColorRGB.B - startColorRGB.B;

  const gradients: string[] = [];

  for (let i = 0; i < numberOfGradents; ++i) {
    let percent = i / numberOfGradents;

    let gradientR = (differenceR * percent + startColorRGB.R)
      .toString(16)
      .split('.')[0];
    let gradientG = (differenceG * percent + startColorRGB.G)
      .toString(16)
      .split('.')[0];
    let gradientB = (differenceB * percent + startColorRGB.B)
      .toString(16)
      .split('.')[0];

    // ensure 2 digits by color
    if (gradientR.length == 1) gradientR = '0' + gradientR;
    if (gradientG.length == 1) gradientG = '0' + gradientG;
    if (gradientB.length == 1) gradientB = '0' + gradientB;

    gradients.push('#' + gradientR + gradientG + gradientB);
  }

  return gradients;
};

/**
 *
 * Checks if given color is valid hex value.
 * Valid formats:
 * - #rrggbb
 * - #rrggbbaa
 * - #rgb
 * - #rgba
 */
export const isValidHexColor = (color: string) => {
  return /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i.test(color);
};

/**
 * Converts shorthend to full hex colors.
 * Example without opacity: #F00 -> #FF0000. Both are same red color.
 * Example with opacity: #F00C -> #FF0000CC. Both are same red color with alpha = 204 (opacity = 0.8).
 */
const shorthend2fullHex = (color: string) => {
  const red = color.slice(1, 2);
  const green = color.slice(2, 3);
  const blue = color.slice(3, 4);
  const alpha = color.slice(4, 5);

  return `#${red}${red}${green}${green}${blue}${blue}${alpha}${alpha}`;
};

/**
 *
 * @param color - Color to be modified.
 * @param opacity - Opacity value to be added to color.
 * Defaults to 1.
 * Ranges between 0 and 1. If number greater than 1 is provided,
 * 1 will be used. If number lower than 0 is provided than 0 is used.
 * @returns Input color with added opacity.
 */
export const adjustHexOpacity = (color: string, opacity = 1) => {
  if (!isValidHexColor(color)) {
    console.warn(color + ' is not a valid hex color');
    return '#00000000';
  }

  if (opacity > 1) opacity = 1;
  if (opacity < 0) opacity = 0;

  return color + Math.ceil(255 * opacity).toString(16); // alpha added to color
};

/**
 *
 * @param color - Input color.
 * @returns Object containing individual rgb values
 */
const extractIndividualRGB = (color: string) => {
  if (color.length < 5) color = shorthend2fullHex(color);

  return {
    R: parseInt(color.substring(1, 3), 16),
    G: parseInt(color.substring(3, 5), 16),
    B: parseInt(color.substring(5, 7), 16),
  };
};
