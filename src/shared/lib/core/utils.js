import { DOM } from './DOM';

/**
 * Creates a `DOM` instance for the specified selector
 *
 * @param {string} selector A string containing one or more selectors to match
 * @returns {DOM} Returns the instance `DOM`
 */
export const $ = (selector) => {
  return new DOM(selector);
};

/**
 * Creates an element for the specified tag
 *
 * @param {HTMLElementTagNameMap} tagName A string indicating the type of element to be created.
 * @param {string} className The class name to add to the element
 * @returns {DOM} Returns the instance `DOM`
 */
export const createDOMElement = (tagName, className = '') => {
  const element = document.createElement(tagName);
  element.className = className;

  return $(element);
};
