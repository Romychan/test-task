import { $, Component } from '~/shared/lib/core';

import { getPagesRange } from '../lib/lib';
import {
  createPaginationTemplate,
  initialPaginationTemplate,
} from '../templates/templates';

/** A class for controlling pages */
export class Pagination extends Component {
  /**
   * Constructor
   *
   * @param {DOM} $root The main DOM element of the component
   * @param {Emitter} emitter The `Emitter` instance for event control
   */
  constructor($root, emitter) {
    super($root, emitter);

    /** Current page number */
    this.currentPage = 1;
    /** Total number of pages */
    this.totalCountPage = 0;
    /** Number of items per page */
    this.pageSize = 10;
  }

  /** Initialize the component */
  async init() {
    // Add an onClick event listener to the root element
    this.$root.on('click', this.onClick.bind(this));

    // Subscribe to listen to the change in the total count of data changes
    this.$on('pagination:update', (total) => {
      if (total > this.pageSize) {
        this.totalCountPage = Math.ceil(total / this.pageSize);

        this.#renderPagination();
      }
    });
  }

  /** Add an HTML template at initialization */
  toHTML() {
    return initialPaginationTemplate();
  }

  /** Render a pagination with updated pages */
  #renderPagination() {
    const pages = getPagesRange(this.currentPage, this.totalCountPage);
    const paginationTemplate = createPaginationTemplate(
      pages,
      this.currentPage,
      this.totalCountPage,
    );

    this.$root.find('[data-type="pagination"]').html(paginationTemplate);
  }

  /**
   * Actions for the onClick event on the root element
   *
   * @param {Event} event Click event
   */
  onClick(event) {
    const $target = $(event.target);

    // Action when clicking on a page with a number
    if ($target.closest('[data-type="page"]')) {
      const newPage = parseInt($target.data.number);
      this.currentPage = newPage;

      this.#renderPagination();

      // Trigger a listener to change the page
      this.$emit('pagination:change', this.currentPage);
    }

    // Action when clicking on the next page
    if ($target.closest('[data-type="next-page"]')) {
      this.currentPage = this.currentPage + 1;

      this.#renderPagination();

      // Trigger a listener to change the page
      this.$emit('pagination:change', this.currentPage);
    }

    // Action when clicking on the previous page
    if ($target.closest('[data-type="prev-page"]')) {
      this.currentPage = this.currentPage - 1;

      this.#renderPagination();

      // Trigger a listener to change the page
      this.$emit('pagination:change', this.currentPage);
    }
  }
}
