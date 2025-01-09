/**
 * Base Component class for NexTab framework
 * Provides common functionality for all components
 */
export class Component {
  constructor(element, options = {}) {
    this.element = element;
    this.options = { ...this.constructor.defaults, ...options };
    this._events = [];
  }

  /**
   * Add event listener and store reference for cleanup
   */
  on(element, event, selector, handler) {
    if (typeof selector === 'function') {
      handler = selector;
      selector = null;
    }

    const listener = selector
      ? e => {
          if (e.target.matches(selector)) {
            handler.call(this, e);
          }
        }
      : handler.bind(this);

    element.addEventListener(event, listener);
    this._events.push({ element, event, listener });
  }

  /**
   * Remove event listener
   */
  off(element, event, listener) {
    element.removeEventListener(event, listener);
  }

  /**
   * Clean up component
   */
  dispose() {
    this._events.forEach(({ element, event, listener }) => {
      this.off(element, event, listener);
    });
    this._events = [];
  }
}
