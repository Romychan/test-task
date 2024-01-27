/**
 * Function for creating a pagination template
 *
 * @param {number[]} pages List of page numbers
 * @param {number} currentPage Current page number
 * @param {number} totalCountPage Total number of page
 * @returns {string} A string with a pagination element
 */
export const createPaginationTemplate = (
  pages,
  currentPage,
  totalCountPage,
) => {
  return `
	  <div class="pagination__inner">
      <button class="page prev button secondary sm visible-icon" data-type="prev-page" ${currentPage === 1 ? 'disabled' : ''}>
        <svg class="icon">
          <use xlink:href="/images/icons.svg#chevron" />
        </svg>
      </button>

      ${
        pages[0] > 1
          ? `<button class="page prev button secondary sm visible-icon" data-type="prev-page">...</button>`
          : ``
      }

      ${pages
        .map(
          (number) =>
            `<button class="page button sm visible-icon ${currentPage == number ? 'primary' : 'secondary'}" data-type="page" data-number="${number}">
          ${number}
        </button>`,
        )
        .join('')}

        ${
          totalCountPage !== pages.at(-1)
            ? `<button class="page prev button secondary sm visible-icon" data-type="next-page">...</button>`
            : ``
        }

      <button class="page next button secondary sm visible-icon" data-type="next-page" ${currentPage === totalCountPage ? 'disabled' : ''}>
        <svg class="icon">
          <use xlink:href="/images/icons.svg#chevron" />
        </svg>
      </button>
    </div>
	`;
};

/** Function for creating an initial template to display */
export const initialPaginationTemplate = () => {
  return `<div class="pagination" data-type="pagination"></div>`;
};
