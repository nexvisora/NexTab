/**
 * NexTab Icon Component
 * A lightweight SVG icon system with accessibility support
 */

class Icon {
  constructor() {
    this.icons = new Map();
    this._initializeDefaultIcons();
  }

  static get DEFAULT_ICONS() {
    return {
      'arrow-right': `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            `,
      'arrow-left': `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            `,
      close: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `,
      menu: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `,
      search: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            `,
      user: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            `,
    };
  }

  _initializeDefaultIcons() {
    Object.entries(Icon.DEFAULT_ICONS).forEach(([name, svg]) => {
      this.icons.set(name, svg.trim());
    });
  }

  add(name, svg) {
    if (typeof svg !== 'string') {
      throw new Error('SVG must be a string');
    }
    this.icons.set(name, svg.trim());
  }

  get(name) {
    if (!this.icons.has(name)) {
      console.warn(`Icon "${name}" not found`);
      return null;
    }
    return this.icons.get(name);
  }

  render(name, options = {}) {
    const svg = this.get(name);
    if (!svg) return null;

    const wrapper = document.createElement('span');
    wrapper.className = 'icon';
    if (options.className) {
      wrapper.className += ` ${options.className}`;
    }
    if (options.size) {
      wrapper.className += ` icon-${options.size}`;
    }

    // Add accessibility attributes
    wrapper.setAttribute('role', 'img');
    wrapper.setAttribute('aria-hidden', options.ariaHidden || 'true');

    if (options.ariaLabel) {
      wrapper.setAttribute('aria-label', options.ariaLabel);
      wrapper.removeAttribute('aria-hidden');
    }

    wrapper.innerHTML = svg;
    return wrapper;
  }

  // Create icon element and insert it into the DOM
  insert(element, name, options = {}) {
    const icon = this.render(name, options);
    if (icon) {
      if (options.position === 'prepend') {
        element.prepend(icon);
      } else {
        element.append(icon);
      }
    }
    return icon;
  }

  // Replace an existing element with an icon
  replace(element, name, options = {}) {
    const icon = this.render(name, options);
    if (icon) {
      element.replaceWith(icon);
    }
    return icon;
  }
}

// Add to NexTab namespace
if (typeof NexTab === 'undefined') {
  window.NexTab = {};
}
NexTab.Icon = new Icon();

// Auto-initialize icons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-icon]').forEach(element => {
    const name = element.getAttribute('data-icon');
    const size = element.getAttribute('data-icon-size');
    const ariaLabel = element.getAttribute('aria-label');

    NexTab.Icon.replace(element, name, {
      size,
      ariaLabel,
      className: element.className,
    });
  });
});
