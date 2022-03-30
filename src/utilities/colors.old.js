export const shadeColor = (color, percent) => {
  color = rgbToHex(color);

  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
};
const rgbToHex = color => {
  if (color.charAt(0) == '#') {
    return color;
  }

  color = '' + color;
  if (!color || color.indexOf('rgb') < 0) {
    return;
  }

  var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
    r = parseInt(nums[2], 10).toString(16),
    g = parseInt(nums[3], 10).toString(16),
    b = parseInt(nums[4], 10).toString(16);

  return (
    '#' +
    ((r.length == 1 ? '0' + r : r) +
      (g.length == 1 ? '0' + g : g) +
      (b.length == 1 ? '0' + b : b))
  );
};
