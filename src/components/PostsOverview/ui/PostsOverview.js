import { getUserPostsQuery } from '~/entities/Post';

import { $, Component } from '~/shared/lib/core';

import {
  createPostsInformation,
  initialOverviewTemplate,
} from '../templates/templates';

/** A class for displaying user posts */
export class PostsOverview extends Component {
  /**
   * Constructor
   *
   * @param {DOM} $root The main DOM element of the component
   * @param {Emitter} emitter The `Emitter` instance for event control
   */
  constructor($root, emitter) {
    super($root, emitter);

    /** List of user posts */
    this.posts = [];
  }

  /** Initialize the component */
  init() {
    // Add an onClick event listener to the root element
    this.$root.on('click', this.onClick.bind(this));

    // Subscribe to listen to the opening of the drawer
    this.$on('posts-overview:open', async ({ id, name }) => {
      const data = await getUserPostsQuery(id);

      this.posts = data.posts;
      const informationTemplate = createPostsInformation(this.posts);

      this.$root.find('[data-type="drawer-content"]').html(informationTemplate);
      this.$root.find('[data-type="drawer-description"]').text(name);
      this.$root.find('[data-type="drawer"]').removeClass('hidden');
    });
  }

  /** Add an HTML template at initialization */
  toHTML() {
    return initialOverviewTemplate();
  }

  /**
   * Actions for the onClick event on the root element
   *
   * @param {Event} event Click event
   */
  onClick(event) {
    const $target = $(event.target);

    // Action when closing the drawer
    if ($target.closest('[data-type="drawer-close"]')) {
      this.$root.find('[data-type="drawer"]').addClass('hidden');
    }
  }
}
