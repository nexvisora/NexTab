import { Component } from '../core/component.js';

export class Tooltip extends Component {
  static get defaults() {
    return {
      placement: 'top',
      trigger: 'hover',
      delay: 0,
      html: false,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    };
  }

  constructor(element, options = {}) {
    super(element, options);
    this._init();
  }

  _init() {
    this.isShown = false;
    this.tip = null;
    this.title = this.element.getAttribute('title') || this.element.getAttribute('data-tooltip');

    if (!this.title) return;

    // Remove default title
    this._removeElementTitle();
    this._addEventListeners();
  }

  _addEventListeners() {
    if (this.options.trigger === 'hover') {
      this.on(this.element, 'mouseenter', () => this.show());
      this.on(this.element, 'mouseleave', () => this.hide());
    } else if (this.options.trigger === 'click') {
      this.on(this.element, 'click', () => this.toggle());
    }

    // Handle focus events for accessibility
    this.on(this.element, 'focus', () => this.show());
    this.on(this.element, 'blur', () => this.hide());
  }

  _createTooltipElement() {
    const template = document.createElement('div');
    template.innerHTML = this.options.template.trim();
    this.tip = template.firstChild;

    // Set content
    const inner = this.tip.querySelector('.tooltip-inner');
    if (this.options.html) {
      inner.innerHTML = this.title;
    } else {
      inner.textContent = this.title;
    }

    // Add to DOM
    document.body.appendChild(this.tip);
  }

  _removeElementTitle() {
    this.element.setAttribute('data-original-title', this.title);
    this.element.removeAttribute('title');
  }

  _position() {
    if (!this.tip) return;

    const elementRect = this.element.getBoundingClientRect();
    const tipRect = this.tip.getBoundingClientRect();

    let top, left;

    switch (this.options.placement) {
      case 'top':
        top = elementRect.top - tipRect.height;
        left = elementRect.left + (elementRect.width - tipRect.width) / 2;
        break;
      case 'bottom':
        top = elementRect.bottom;
        left = elementRect.left + (elementRect.width - tipRect.width) / 2;
        break;
      case 'left':
        top = elementRect.top + (elementRect.height - tipRect.height) / 2;
        left = elementRect.left - tipRect.width;
        break;
      case 'right':
        top = elementRect.top + (elementRect.height - tipRect.height) / 2;
        left = elementRect.right;
        break;
    }

    this.tip.style.top = `${top + window.scrollY}px`;
    this.tip.style.left = `${left + window.scrollX}px`;
  }

  show() {
    if (this.isShown || !this.title) return;

    this._createTooltipElement();
    this._position();

    this.tip.classList.add('show');
    this.isShown = true;

    this.element.dispatchEvent(new CustomEvent('shown.tooltip'));
  }

  hide() {
    if (!this.isShown || !this.tip) return;

    this.tip.classList.remove('show');
    this.isShown = false;

    // Remove tooltip element after animation
    setTimeout(() => {
      if (this.tip && this.tip.parentNode) {
        this.tip.parentNode.removeChild(this.tip);
        this.tip = null;
      }
    }, 150);

    this.element.dispatchEvent(new CustomEvent('hidden.tooltip'));
  }

  toggle() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  dispose() {
    super.dispose();
    this.hide();

    // Restore original title
    const originalTitle = this.element.getAttribute('data-original-title');
    if (originalTitle) {
      this.element.setAttribute('title', originalTitle);
      this.element.removeAttribute('data-original-title');
    }
  }
}
