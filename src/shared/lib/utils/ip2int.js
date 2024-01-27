/**
 * A function for converting an IP address to a number
 *
 * @param {string} ip The IP to convert
 * @returns {number} Converted IP
 */
export const ip2int = (ip) =>
  ip
    .split('.')
    .reduce(
      (acc, cur, index) => acc + Number(cur) * Math.pow(256, 3 - index),
      0,
    );
