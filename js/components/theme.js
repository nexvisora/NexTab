/**
 * NexTab Theme System
 * Handles theme switching and persistence
 */

import { Component } from '../framework';

export class Theme extends Component {
  static get defaults() {
    return {
      storageKey: 'nexTab-theme',
      defaultTheme: 'light',
      themes: ['light', 'dark'],
      toggleSelector: '[data-theme-toggle]',
      rootElement: document.documentElement,
    };
  }

  constructor(options = {}) {
    super(document.body, options);
    this._init();
  }

  _init() {
    // Set initial theme
    this.currentTheme = this._getStoredTheme() || this.options.defaultTheme;
    this._applyTheme(this.currentTheme);

    // Set up event listeners
    this._setupEventListeners();

    // Watch for system theme changes
    this._watchSystemTheme();
  }

  _setupEventListeners() {
    // Theme toggle buttons
    document.querySelectorAll(this.options.toggleSelector).forEach(toggle => {
      this.on(toggle, 'click', () => {
        const theme = toggle.dataset.themeToggle || this._getNextTheme();
        this.setTheme(theme);
      });
    });
  }

  _watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = e => {
      if (!this._getStoredTheme()) {
        this.setTheme(e.matches ? 'dark' : 'light', false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    this.on(window, 'unload', () => {
      mediaQuery.removeEventListener('change', handleChange);
    });
  }

  _getStoredTheme() {
    return localStorage.getItem(this.options.storageKey);
  }

  _storeTheme(theme) {
    localStorage.setItem(this.options.storageKey, theme);
  }

  _getNextTheme() {
    const currentIndex = this.options.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.options.themes.length;
    return this.options.themes[nextIndex];
  }

  _applyTheme(theme) {
    // Update data attribute
    this.options.rootElement.dataset.theme = theme;

    // Update toggles
    document.querySelectorAll(this.options.toggleSelector).forEach(toggle => {
      const targetTheme = toggle.dataset.themeToggle;
      if (targetTheme) {
        toggle.setAttribute('aria-pressed', targetTheme === theme);
      }
    });

    // Dispatch event
    this.options.rootElement.dispatchEvent(
      new CustomEvent('themechange', {
        bubbles: true,
        detail: { theme },
      })
    );
  }

  // Public methods
  setTheme(theme, store = true) {
    if (!this.options.themes.includes(theme)) {
      console.warn(`Theme "${theme}" is not defined`);
      return;
    }

    this.currentTheme = theme;
    this._applyTheme(theme);

    if (store) {
      this._storeTheme(theme);
    }
  }

  getTheme() {
    return this.currentTheme;
  }

  clearTheme() {
    localStorage.removeItem(this.options.storageKey);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    this.setTheme(systemTheme, false);
  }
}

// Register as plugin
if (typeof window.NexTab !== 'undefined') {
  window.NexTab.use('theme', Theme);
}
