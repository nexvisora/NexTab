/**
 * NexTab Framework Core
 * A modern, tree-shakable JavaScript framework
 */

// Core utilities
export const utils = {
  /**
   * Create a custom event with optional detail
   */
  createEvent(name, detail = {}) {
    return new CustomEvent(name, {
      bubbles: true,
      cancelable: true,
      detail,
    });
  },

  /**
   * Get computed style value
   */
  getStyle(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
  },

  /**
   * Set CSS custom property
   */
  setCSSVar(name, value, element = document.documentElement) {
    element.style.setProperty(name, value);
  },

  /**
   * Get CSS custom property
   */
  getCSSVar(name, element = document.documentElement) {
    return getComputedStyle(element).getPropertyValue(name);
  },

  /**
   * Check if element is visible
   */
  isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  },

  /**
   * Get element's offset relative to document
   */
  offset(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
  },

  /**
   * Get element's position relative to offset parent
   */
  position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft,
    };
  },
};

// Plugin system
export class PluginManager {
  constructor() {
    this.plugins = new Map();
  }

  /**
   * Register a new plugin
   * @param {string} name - Plugin name
   * @param {object} plugin - Plugin instance
   * @param {object} options - Plugin options
   */
  register(name, plugin, options = {}) {
    if (this.plugins.has(name)) {
      console.warn(`Plugin "${name}" is already registered`);
      return false;
    }

    try {
      const instance = new plugin(options);
      this.plugins.set(name, instance);
      console.log(`Plugin "${name}" registered successfully`);
      return true;
    } catch (error) {
      console.error(`Failed to register plugin "${name}":`, error);
      return false;
    }
  }

  /**
   * Get a registered plugin
   * @param {string} name - Plugin name
   */
  get(name) {
    return this.plugins.get(name);
  }

  /**
   * Remove a plugin
   * @param {string} name - Plugin name
   */
  remove(name) {
    const plugin = this.plugins.get(name);
    if (plugin && typeof plugin.destroy === 'function') {
      plugin.destroy();
    }
    return this.plugins.delete(name);
  }

  /**
   * Get all registered plugins
   */
  getAll() {
    return Array.from(this.plugins.entries());
  }
}

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

// Initialize framework
export class NexTab {
  constructor() {
    this.plugins = new PluginManager();
    this.version = '1.0.0';
  }

  /**
   * Register a plugin
   */
  use(name, plugin, options = {}) {
    return this.plugins.register(name, plugin, options);
  }

  /**
   * Get a plugin instance
   */
  getPlugin(name) {
    return this.plugins.get(name);
  }
}

// Create global instance if needed
if (typeof window !== 'undefined') {
  window.NexTab = window.NexTab || new NexTab();
}

// Export individual components
export { Modal } from './components/modal.js';
export { Dropdown } from './components/dropdown.js';
export { Tooltip } from './components/tooltip.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modals
  document.querySelectorAll('[data-toggle="modal"]').forEach(element => {
    const target = document.querySelector(element.getAttribute('data-target'));
    if (target) {
      new Modal(target);
    }
  });

  // Initialize dropdowns
  document.querySelectorAll('.dropdown').forEach(element => {
    new Dropdown(element);
  });

  // Initialize tooltips
  document.querySelectorAll('[data-tooltip]').forEach(element => {
    new Tooltip(element);
  });
});
