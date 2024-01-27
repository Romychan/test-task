/** A class that allows to subscribe to events and notify other subscribers about these events */
export class Emitter {
  /** Constructor */
  constructor() {
    /** An object with listeners, where the key is the event name, the value is the list of callbacks */
    this.listeners = new Map();
  }

  /**
   * Get callbacks from the list of listeners for the event
   *
   * @param {string} eventName Event name
   * @returns {Set} List of callbacks
   */
  #getCallbacks(eventName) {
    return this.listeners.get(eventName);
  }

  /**
   * Adds a listener for the specified event name
   *
   * @param {string} eventName Event name
   * @param {Function} callback The callback that will be called after the event happens
   * @returns Callback to unsubscribe a callback from the event
   */
  subscribe(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    this.#getCallbacks(eventName).add(callback);

    return () => this.unsubscribe(eventName, callback);
  }

  /**
   * Deletes the listener for the specified event
   *
   * @param {string} eventName Event name
   * @param {Function} callback The callback that needs to be removed from the list of listeners for this event
   */
  unsubscribe(eventName, callback) {
    const subs = this.#getCallbacks(eventName).filter(
      (listener) => listener !== callback,
    );

    this.listeners.set(eventName, subs);
  }

  /**
   * Trigger the listeners registered for this event name
   *
   * @param {string} eventName Event name
   * @param  {...any} args Arguments passed as parameters for callback
   * @returns {boolean} Returns `true` if listeners are added to the event, otherwise `false`
   */
  emit(eventName, ...args) {
    if (this.#getCallbacks(eventName).size === 0) {
      return false;
    }

    this.#getCallbacks(eventName).forEach((listener) => {
      listener(...args);
    });

    return true;
  }
}
