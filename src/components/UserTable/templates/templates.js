import { cl } from '~/shared/lib/utils';

/**
 * Function for creating a table header cell template
 *
 * @param {string} column Current column
 * @param {{column: string, order: 'ascending' | 'descending'}} sorting Current sorting
 * @returns {string} A string with a table header cell
 */
const generateTableHeaderCell = (column, sorting) => {
  const isCurrentSortable = column === sorting.column;
  const isAscSort = isCurrentSortable && sorting.order === 'ascending';
  const isDescSort = isCurrentSortable && sorting.order === 'descending';

  return `
    <td data-type="table-sort" data-order="${sorting.order}"
      data-column="${column}" class="${cl('table-header__cell', {
        active: isCurrentSortable,
        asc: isAscSort,
        desc: isDescSort,
      })}"
    >
      ${column.toUpperCase()}
      <svg class="icon" width="14" height="14">
        <use xlink:href="/images/icons.svg#chevron" />
      </svg>
    </td>
  `;
};

/**
 * Function for creating a table body cell template
 *
 * @param {string} columns Columns for the table
 * @param {object} item An object with data for a cell
 * @returns {string} A string with a table body cell
 */
const generateTableBodyCell = (columns, item) => {
  return columns
    .map((column) => `<td class="table-body__cell">${item[column]}</td>`)
    .join('');
};

/**
 * Function for creating a table header template
 *
 * @param {number[]} columns Columns for the table
 * @param {{column: string, order: 'ascending' | 'descending'}} sorting Current sorting
 * @returns {string} A string with a table header
 */
const generateTableHeader = (columns, sorting) => {
  return `
    <thead class="table__header table-header">
			<tr class="table-header__row">
    		${columns.map((col) => generateTableHeaderCell(col, sorting)).join('')}
   		</tr>
	  </thead>
	`;
};

/**
 * Function for creating a table body template
 *
 * @param {number[]} columns Columns for the table
 * @param {number[]} data Data to display
 * @returns {string} A string with a table body
 */
const generateTableBody = (columns, data) => {
  if (!data.length) {
    return `
			<tbody class="table__body table-body">
				<tr class="table-body__row table-body__row_empty">
          <td colspan=${columns.length} class="table-body__cell">Empty data</td>
        </tr>
			</tbody>
		`;
  }

  return `
		<tbody class="table__body table-body">
			${data
        .map(
          (item) =>
            `<tr class="table-body__row" data-type="table-row" data-row-id=${item.id}>
              ${generateTableBodyCell(columns, item)}
            </tr>`,
        )
        .join('')}
		</tbody>
	`;
};

/**
 * Function for creating a table template
 *
 * @param {number[]} data Data to display
 * @param {{column: string, order: 'ascending' | 'descending'}} sorting Current sorting
 * @param {number[]} columns Columns for the table
 * @returns {string} A string with a table
 */
export const createTableTemplate = (data, sorting, columns) => {
  return `
    <table class="table">
			${generateTableHeader(columns, sorting)}
			${generateTableBody(columns, data)}
    </table>
	`;
};

/** Function for creating an initial template to display */
export const initialUsersTableTemplate = () => {
  return `
    <div class="users__content">
      <h1 class="users__title">User Table</h1>
      <div class="users__table" data-type="table-container"></div>
    </div>
  `;
};
