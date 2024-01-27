import { Emitter } from './Emitter';
import { $, createDOMElement } from './utils';

/** A class for initializing application components */
export class Screen {
  /**
   * Constructor
   *
   * @param {string} $root Selector of the root application container
   * @param {Array<Component>} components List of components to display in the container
   * @param {string} elementClassName A class for the main container with components
   */
  constructor($root, components = [], elementClassName = '') {
    /** Root application container */
    this.$element = $($root);
    /** List of components */
    this.components = components;
    /** A class for the main container with components */
    this.elementClassName = elementClassName;
    /** Emitter for event control */
    this.emitter = new Emitter();
  }

  /**
   * Create the root container for the list of components
   *
   * @returns {DOM} Root element
   */
  createRoot() {
    const $root = createDOMElement('div', this.elementClassName);

    this.components = this.components.map((Component) => {
      const $element = createDOMElement('div');
      const component = new Component($element, this.emitter);

      $element.html(component.toHTML());
      $root.append($element);

      return component;
    });

    return $root;
  }

  /** Initialize and render the list of components */
  render() {
    this.$element.append(this.createRoot());

    this.components.forEach((element) => {
      element.init();
    });
  }
}
