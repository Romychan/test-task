/**
 * A function for creating an array of pages in a specified range
 *
 * @param {number} start The start of the range
 * @param {number} end The end of the range
 * @returns {number[]} List of page numbers
 */
export const generatePagesArray = (start, end) => {
  return Array.from({ length: end - start }, (_, index) => index + start);
};

/**
 * A function for calculating the range of displayed pages
 *
 * @param {number} currentPage Current page number
 * @param {number} totalCount Total number of page
 * @param {number} siblingPage Number of pages displayed before and after the current page
 * @returns {number[]} List of page numbers
 */
export const getPagesRange = (currentPage, totalCount, siblingPage = 2) => {
  const totalSiblingPage = 2 * siblingPage + 1;
  const floorSiblingPage = Math.floor(totalSiblingPage / 2);
  const ceilSiblingPage = Math.ceil(totalSiblingPage / 2);

  if (totalCount < totalSiblingPage) {
    return generatePagesArray(1, totalCount + 1);
  } else if (currentPage >= 1 && currentPage <= ceilSiblingPage) {
    return generatePagesArray(1, totalSiblingPage + 1);
  } else if (currentPage + floorSiblingPage >= totalCount) {
    return generatePagesArray(
      totalCount - totalSiblingPage + 1,
      totalCount + 1,
    );
  } else {
    return generatePagesArray(
      currentPage - ceilSiblingPage + 1,
      currentPage + floorSiblingPage + 1,
    );
  }
};
