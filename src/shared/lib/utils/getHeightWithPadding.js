/**
 * A function for getting the height of an element with padding
 *
 * @param {DOM} $element The element to get the height for
 * @returns {number} The height of the element with padding
 */
export const getHeightWithPadding = ($element) => {
  const height = $element.offset.height;
  const { paddingTop, paddingBottom } = $element.getComputedStyle();

  return height + parseInt(paddingTop) + parseInt(paddingBottom);
};
