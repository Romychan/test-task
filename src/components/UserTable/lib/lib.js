/**
 * A function for getting the sort order
 *
 * @param {string} oldColumn Previous selected column
 * @param {string} newColumn New selected column
 * @param {'ascending' | 'descending'} order New sorting type
 * @returns {'ascending' | 'descending'} A new type of sorting
 */
export const getSortingOrder = (oldColumn, newColumn, order) => {
  return oldColumn === newColumn && order === 'ascending'
    ? 'descending'
    : 'ascending';
};
