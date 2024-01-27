import { getUsersQuery, sortUsersData } from '~/entities/User';

import { $, Component } from '~/shared/lib/core';

import {
  createTableTemplate,
  initialUsersTableTemplate,
} from '../templates/templates';
import { getSortingOrder } from '../lib/lib';

/** A class for displaying a table with users */
export class UserTable extends Component {
  static #USERS_LIMIT = '10';
  static #USERS_DEFAULT_SORTING = { column: 'id', order: 'ascending' };
  static #USERS_TABLE_COLUMNS = [
    'id',
    'username',
    'email',
    'name',
    'birthDate',
    'height',
    'ip',
  ];

  /**
   * Constructor
   *
   * @param {DOM} $root The main DOM element of the component
   * @param {Emitter} emitter The `Emitter` instance for event control
   */
  constructor($root, emitter) {
    super($root, emitter);

    /** List of users */
    this.users = [];
    /** The total number of users for the request */
    this.total = 0;
    /** Sorting options */
    this.sorting = UserTable.#USERS_DEFAULT_SORTING;
    /** Parameters for the request */
    this.queryParams = { skip: '0', limit: UserTable.#USERS_LIMIT };
  }

  /** Initialize the component */
  init() {
    // Add an onClick event listener to the root element
    this.$root.on('click', this.onClick.bind(this));

    // Subscribe to listen to the page change in `Pagination`
    this.$on('pagination:change', (currentPage) => {
      const skipParam = (currentPage - 1) * parseInt(this.queryParams.limit);

      this.queryParams = {
        ...this.queryParams,
        skip: skipParam.toString(),
      };
      this.sorting = UserTable.#USERS_DEFAULT_SORTING;

      this.#fetchUsers();
    });

    this.#fetchUsers();
  }

  /** Add an HTML template at initialization */
  toHTML() {
    return initialUsersTableTemplate();
  }

  /** Fetch user data from the server */
  async #fetchUsers() {
    // Fetch data from the server
    const data = await getUsersQuery(this.queryParams);

    // Update parameters
    this.users = data?.users || [];
    this.total = data?.total || 0;
    this.queryParams = {
      ...this.queryParams,
      skip: data?.skip.toString() || 0,
    };

    // Trigger a listener to update pages in `Pagination` component
    this.$emit('pagination:update', this.total);

    // Render a table with new data
    this.#renderTable();
  }

  /** Render a table with updated data */
  #renderTable() {
    const tableTemplate = createTableTemplate(
      this.users,
      this.sorting,
      UserTable.#USERS_TABLE_COLUMNS,
    );
    this.$root.find('[data-type="table-container"]').html(tableTemplate);
  }

  /**
   * Actions for the onClick event on the root element
   *
   * @param {Event} event Click event
   */
  onClick(event) {
    const $target = $(event.target);

    // Action when clicking the header cell with sorting
    if ($target.closest('[data-type="table-sort"]')) {
      const { column, order } = $target.closest(
        '[data-type="table-sort"]',
      ).data;
      const newOrder = getSortingOrder(this.sorting.column, column, order);

      this.sorting = { column, order: newOrder };

      const sortedUsers = sortUsersData(this.users, this.sorting);

      this.users = sortedUsers;
      this.#renderTable();
    }

    // Action when clicking a table body row with a user
    if ($target.closest('[data-type="table-row"]')) {
      const userId = $target.closest('[data-type="table-row"]').data.rowId;
      const { id, name } = this.users.find(
        (user) => user.id === parseInt(userId),
      );

      // Trigger a listener to open a drawer with user posts
      this.$emit('posts-overview:open', { id, name });
    }
  }
}
