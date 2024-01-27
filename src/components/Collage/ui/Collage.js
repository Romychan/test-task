import { downloadImage, getImageQuery } from '~/entities/Collage';

import { $, Component } from '~/shared/lib/core';
import { getHeightWithPadding } from '~/shared/lib/utils';

import { initialCollageTemplate } from '../templates/templates';
import { onLoadCollageImage } from '../lib/lib';

/** A class for creating and displaying a collage */
export class Collage extends Component {
  static #INTERVAL_DELAY = 3000;
  static #MAX_COUNT_IMAGES = 20;

  /**
   * Constructor
   *
   * @param {DOM} $root The main DOM element of the component
   * @param {Emitter} emitter The `Emitter` instance for event control
   */
  constructor($root, emitter) {
    super($root, emitter);

    /** Interval ID */
    this.intervalId = null;
  }

  /** Initialize the component */
  init() {
    // Add an onClick event listener to the root element
    this.$root.on('click', this.onClick.bind(this));

    // Create the first image without delay
    this.#createImage();

    // Set the interval for re-creating the image every 3 seconds
    this.intervalId = setInterval(
      this.#createImage.bind(this),
      Collage.#INTERVAL_DELAY,
    );
  }

  /** Add an HTML template at initialization */
  toHTML() {
    return initialCollageTemplate();
  }

  /** Remove images from a container */
  #removeImages() {
    const imagesElements = this.$root.findAll('[data-type="collage-image"]');
    imagesElements.forEach((image) => $(image).addClass('hidden'));

    // Clear the container after the fade animation is over
    imagesElements[0].onanimationend = () => {
      this.$root.find('[data-type="collage-items"]').html('');
    };
  }

  /** Create a new image */
  async #createImage() {
    const $container = this.$root.find('[data-type="collage-container"]');
    const $collage = this.$root.find('[data-type="collage-items"]');
    const images = this.$root.findAll('[data-type="collage-image"]');
    const containerHeight = getHeightWithPadding($container);

    // Action if the number of images is equal to the maximum
    if (images.length === Collage.#MAX_COUNT_IMAGES) {
      this.#removeImages();
      return;
    }

    // Fetch images from the server
    const data = await getImageQuery();

    // Create image element
    const $image = await onLoadCollageImage($collage, data?.message);
    const bottomPosition = $image.offset.top + $image.offset.height;

    // Action if the new image goes outside the container
    if (containerHeight <= bottomPosition) {
      this.#removeImages();
    } else {
      $image.removeClass('hidden');
    }
  }

  /**
   * Actions for the onClick event on the root element
   *
   * @param {Event} event Click event
   */
  onClick(event) {
    const $target = $(event.target);

    // Action when clicking on an image from a collage
    if ($target.closest('[data-type="collage-image"]')) {
      this.$root.find('[data-type="backdrop"]').removeClass('hidden');
      this.$root.find('[data-type="drawer"]').removeClass('hidden');

      const $collageImage = $target.closest('[data-type="collage-image"]');
      const $drawerImage = this.$root.find(
        '[data-type="collage-drawer-image"]',
      );
      const imageLink = $collageImage.getAttribute('src');

      $drawerImage.setAttribute('src', imageLink);

      // Reset the interval so that no new images are loaded
      clearInterval(this.intervalId);
    }

    // Action when clicking on the download button
    if ($target.closest('[data-type="collage-download"]')) {
      const imageLink = this.$root
        .find('[data-type="collage-drawer-image"]')
        .getAttribute('src');

      downloadImage(imageLink, `image-${new Date().getTime()}`);
    }

    // Action when closing the drawer
    if (
      $target.closest('[data-type="drawer-close"]') ||
      $target.closest('[data-type="backdrop"]')
    ) {
      this.$root.find('[data-type="backdrop"]').addClass('hidden');
      this.$root.find('[data-type="drawer"]').addClass('hidden');

      // Set a new interval after closing the drawer
      this.intervalId = setInterval(
        this.#createImage.bind(this),
        Collage.#INTERVAL_DELAY,
      );
    }
  }
}
