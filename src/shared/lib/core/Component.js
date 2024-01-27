/** Base class for components */
export class Component {
  /**
   * Constructor
   *
   * @param {DOM} $root The main DOM element of the component
   * @param {Emitter} emitter The `Emitter` instance for event control
   */
  constructor($root, emitter) {
    /** Root components container */
    this.$root = $root;
    /** Emitter for event control */
    this.emitter = emitter;
  }

  /** Initialize the component */
  init() {}

  /** Add an HTML template at initialization */
  toHTML() {}

  /**
   * Adds a listener for the specified event name
   *
   * @param {string} eventName Event name
   * @param {Function} callback The callback that will be called after the event happens
   */
  $on(eventName, callback) {
    this.emitter.subscribe(eventName, callback);
  }

  /**
   * Trigger the listeners registered for this event name
   *
   * @param {string} eventName Event name
   * @param  {...any} args Arguments passed as parameters for callback
   */
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }
}
