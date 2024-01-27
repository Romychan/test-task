import { $ } from './utils';

/** A class for manipulating DOM elements */
export class DOM {
  /**
   * Constructor
   *
   * @param {string | Element} selector A string containing a selector for matching or a DOM element
   */
  constructor(selector) {
    /** DOM element for manipulation */
    this.$element =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  /**
   * Add text to an element
   *
   * @param {string} text The text to be added
   */
  text(text) {
    this.$element.textContent = text;
  }

  /**
   * Add HTML markup to the element
   *
   * @param {DOM | string} html HTML markup that needs to be added
   */
  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html;
      return this;
    }

    return this.$element.outerHTML.trim();
  }

  /**
   * Append the content at the end of the element
   *
   * @param {DOM | Element} node The DOM element to append
   */
  append(node) {
    if (node instanceof DOM) {
      node = node.$element;
    }

    if (Element.prototype.append) {
      this.$element.append(node);
    } else {
      this.$element.appendChild(node);
    }
  }

  /**
   * Get the attribute value corresponding to the passed attribute
   *
   * @param {string} attribute A string containing attribute to match
   * @returns {string | null} If the attribute is found, it returns the attribute value, otherwise `null`
   */
  getAttribute(attribute) {
    return this.$element.getAttribute(attribute);
  }

  /**
   * Sets the attribute value for the element
   *
   * @param {string} attribute A string containing attribute to match
   * @param {string} value The value to set to attribute
   */
  setAttribute(attribute, value) {
    this.$element.setAttribute(attribute, value);
  }

  /**
   * Get the data attributes of an element
   *
   * @returns {object} An object containing data attributes
   */
  get data() {
    return this.$element.dataset;
  }

  /**
   * Get the current coordinates of the element
   *
   * @returns {{height: number, top: number, left: number}} An object containing coordinates
   */
  get offset() {
    return {
      top: this.$element.offsetTop,
      left: this.$element.offsetLeft,
      height: this.$element.offsetHeight,
    };
  }

  /**
   * Get the values of all CSS element properties
   *
   * @returns {CSSStyleDeclaration} An object with CSS element properties
   */
  getComputedStyle() {
    return window.getComputedStyle(this.$element);
  }

  /**
   * Add an event listener to the root element of the class
   *
   * @param {DocumentEventMap} eventType The name of the event to listen to
   * @param {Function} callback The callback that will be called when handling the event
   */
  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback);
  }

  /**
   * Add a class to element
   *
   * @param {string} className The class name
   */
  addClass(className) {
    this.$element.classList.add(className);
  }

  /**
   * Remove a class from an element
   *
   * @param {string} className The class name
   */
  removeClass(className) {
    this.$element.classList.remove(className);
  }

  /**
   * Find the first element that match selectors
   *
   * @param {string} selector A string containing selectors to match
   * @returns {DOM | null} If the element is found, it returns the instance `DOM`, otherwise `null`
   */
  find(selector) {
    return this.$element.querySelector(selector)
      ? $(this.$element.querySelector(selector))
      : null;
  }

  /**
   * Find all elements that match selectors
   *
   * @param {string} selector A string containing selectors to match
   * @returns {NodeList} A collection of found items on a page
   */
  findAll(selector) {
    return this.$element.querySelectorAll(selector);
  }

  /**
   * Get the first parent element or the parent element itself, which matches the selector
   *
   * @param {string} selector A string containing selectors to match
   * @returns {DOM | null} If the element is found, it returns the instance `DOM`, otherwise `null`
   */
  closest(selector) {
    return this.$element.closest(selector)
      ? $(this.$element.closest(selector))
      : null;
  }
}
