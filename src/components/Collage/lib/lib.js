import { createDOMElement } from '~/shared/lib/core';

/**
 *	A function for waiting for the image to load
 *
 * @param {DOM} $element The element to add the image to
 * @param {string} imageSrc The link that needs to be added to the image
 * @returns {Promise<DOM>} An instance of the `DOM` class with an image
 */
export const onLoadCollageImage = ($element, imageSrc) => {
  return new Promise((resolve) => {
    // Create image element
    const $image = createDOMElement('img', 'collage__image hidden');

    // Add an event listener to wait for the image to load
    $image.on('load', () => {
      $image.data.type = 'collage-image';
      $element.append($image);

      resolve($image);
    });

    // Add an image link for an element
    $image.setAttribute('src', imageSrc);
  });
};
