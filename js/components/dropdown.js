/**
 * NexTab Dropdown Component
 * A versatile dropdown menu component with positioning and animation
 */

import { Component } from '../core/component.js';

export class Dropdown extends Component {
  static get defaults() {
    return {
      placement: 'bottom-start',
      offset: [0, 10],
      trigger: 'click',
      boundary: 'clippingParents',
      reference: 'toggle',
      display: 'dynamic',
    };
  }

  constructor(element, options = {}) {
    super(element, options);
    this._init();
  }

  _init() {
    this.isShown = false;
    this.menu = this.element.querySelector('.dropdown-menu');
    this.toggle = this.element.querySelector('[data-toggle="dropdown"]');

    if (!this.menu || !this.toggle) return;

    this._addEventListeners();
  }

  _addEventListeners() {
    // Toggle on click
    this.on(this.toggle, 'click', e => {
      e.preventDefault();
      this.toggle();
    });

    // Close on outside click
    this.on(document, 'click', e => {
      if (!this.element.contains(e.target) && this.isShown) {
        this.hide();
      }
    });

    // Close on escape key
    this.on(document, 'keydown', e => {
      if (e.key === 'Escape' && this.isShown) {
        this.hide();
      }
    });
  }

  show() {
    if (this.isShown) return;

    this.menu.classList.add('show');
    this.toggle.setAttribute('aria-expanded', 'true');
    this.isShown = true;

    this.element.dispatchEvent(new CustomEvent('shown.dropdown'));
  }

  hide() {
    if (!this.isShown) return;

    this.menu.classList.remove('show');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.isShown = false;

    this.element.dispatchEvent(new CustomEvent('hidden.dropdown'));
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
  }
}

// Auto-initialize dropdowns
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-toggle="dropdown"]').forEach(element => {
    new Dropdown(element);
  });
});
