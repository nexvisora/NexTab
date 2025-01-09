/**
 * NexTab DatePicker Plugin
 * A lightweight, accessible date picker component
 */

import { Component } from '../framework';

export class DatePicker extends Component {
  static get defaults() {
    return {
      format: 'YYYY-MM-DD',
      locale: 'en-US',
      minDate: null,
      maxDate: null,
      initialDate: null,
      weekStart: 1, // Monday
      disabledDates: [],
      enabledDates: [],
      showWeekNumbers: false,
      todayHighlight: true,
      clearBtn: true,
      autoClose: true,
    };
  }

  constructor(element, options = {}) {
    super(element, options);
    this.selectedDate = null;
    this.viewDate = null;
    this.picker = null;
    this._init();
  }

  _init() {
    // Set initial dates
    this.selectedDate = this.options.initialDate ? new Date(this.options.initialDate) : null;
    this.viewDate = this.selectedDate || new Date();

    // Create picker element
    this._createPicker();

    // Set up event listeners
    this._setupEvents();

    // Set initial value
    if (this.selectedDate) {
      this._setInputValue(this.selectedDate);
    }

    // Add ARIA attributes
    this._setupAccessibility();
  }

  _createPicker() {
    this.picker = document.createElement('div');
    this.picker.className = 'datepicker';
    this.picker.setAttribute('role', 'dialog');
    this.picker.setAttribute('aria-modal', 'true');
    this.picker.setAttribute('aria-label', 'Choose date');

    // Create header
    const header = document.createElement('div');
    header.className = 'datepicker-header';
    header.innerHTML = `
            <button type="button" class="datepicker-prev" aria-label="Previous month">
                <span data-icon="arrow-left"></span>
            </button>
            <div class="datepicker-title"></div>
            <button type="button" class="datepicker-next" aria-label="Next month">
                <span data-icon="arrow-right"></span>
            </button>
        `;

    // Create body
    const body = document.createElement('div');
    body.className = 'datepicker-body';

    // Create footer
    const footer = document.createElement('div');
    footer.className = 'datepicker-footer';

    if (this.options.clearBtn) {
      footer.innerHTML = `
                <button type="button" class="btn btn-link datepicker-clear">Clear</button>
                <button type="button" class="btn btn-primary datepicker-today">Today</button>
            `;
    }

    this.picker.appendChild(header);
    this.picker.appendChild(body);
    this.picker.appendChild(footer);
    document.body.appendChild(this.picker);
  }

  _setupEvents() {
    // Input events
    this.on(this.element, 'click', this.show.bind(this));
    this.on(this.element, 'keydown', this._handleInputKeydown.bind(this));

    // Picker navigation
    this.on(this.picker.querySelector('.datepicker-prev'), 'click', this._prevMonth.bind(this));
    this.on(this.picker.querySelector('.datepicker-next'), 'click', this._nextMonth.bind(this));

    // Footer buttons
    if (this.options.clearBtn) {
      this.on(this.picker.querySelector('.datepicker-clear'), 'click', this.clear.bind(this));
    }
    this.on(this.picker.querySelector('.datepicker-today'), 'click', this._selectToday.bind(this));

    // Close on outside click
    this.on(document, 'click', e => {
      if (!this.picker.contains(e.target) && !this.element.contains(e.target)) {
        this.hide();
      }
    });
  }

  _setupAccessibility() {
    this.element.setAttribute('role', 'combobox');
    this.element.setAttribute('aria-haspopup', 'dialog');
    this.element.setAttribute('aria-expanded', 'false');
    this.element.setAttribute('autocomplete', 'off');
  }

  _handleInputKeydown(e) {
    switch (e.key) {
      case 'Enter':
        this.show();
        break;
      case 'Escape':
        this.hide();
        break;
      case 'Tab':
        this.hide();
        break;
    }
  }

  _setInputValue(date) {
    this.element.value = this._formatDate(date);
    this.element.dispatchEvent(new Event('change', { bubbles: true }));
  }

  _formatDate(date) {
    return new Intl.DateTimeFormat(this.options.locale).format(date);
  }

  _prevMonth() {
    this.viewDate.setMonth(this.viewDate.getMonth() - 1);
    this._updatePicker();
  }

  _nextMonth() {
    this.viewDate.setMonth(this.viewDate.getMonth() + 1);
    this._updatePicker();
  }

  _selectToday() {
    const today = new Date();
    if (this._isDateEnabled(today)) {
      this.setDate(today);
      if (this.options.autoClose) {
        this.hide();
      }
    }
  }

  _updatePicker() {
    // Update title
    const title = this.picker.querySelector('.datepicker-title');
    title.textContent = new Intl.DateTimeFormat(this.options.locale, {
      year: 'numeric',
      month: 'long',
    }).format(this.viewDate);

    // Update calendar
    const body = this.picker.querySelector('.datepicker-body');
    body.innerHTML = this._generateCalendarHTML();
  }

  _generateCalendarHTML() {
    // Calendar generation logic here
    // This is a simplified version
    return `
            <table class="datepicker-calendar">
                <thead>
                    <tr>
                        ${this._generateWeekdaysHTML()}
                    </tr>
                </thead>
                <tbody>
                    ${this._generateDaysHTML()}
                </tbody>
            </table>
        `;
  }

  _generateWeekdaysHTML() {
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      const day = (this.options.weekStart + i) % 7;
      weekdays.push(`
                <th scope="col">
                    <span aria-hidden="true">
                        ${new Intl.DateTimeFormat(this.options.locale, { weekday: 'short' }).format(new Date(2021, 0, day + 3))}
                    </span>
                </th>
            `);
    }
    return weekdays.join('');
  }

  _generateDaysHTML() {
    // Days generation logic here
    // This is a simplified version
    return '';
  }

  _isDateEnabled(date) {
    if (this.options.minDate && date < this.options.minDate) return false;
    if (this.options.maxDate && date > this.options.maxDate) return false;
    if (this.options.disabledDates.includes(date.toISOString().split('T')[0])) return false;
    if (
      this.options.enabledDates.length &&
      !this.options.enabledDates.includes(date.toISOString().split('T')[0])
    )
      return false;
    return true;
  }

  // Public methods
  show() {
    if (this.picker.classList.contains('show')) return;

    this.picker.classList.add('show');
    this._updatePicker();
    this.element.setAttribute('aria-expanded', 'true');

    // Position the picker
    const inputRect = this.element.getBoundingClientRect();
    this.picker.style.top = `${inputRect.bottom + window.scrollY}px`;
    this.picker.style.left = `${inputRect.left + window.scrollX}px`;

    // Focus first focusable element
    const focusable = this.picker.querySelector('button, [tabindex="0"]');
    if (focusable) focusable.focus();
  }

  hide() {
    if (!this.picker.classList.contains('show')) return;

    this.picker.classList.remove('show');
    this.element.setAttribute('aria-expanded', 'false');
    this.element.focus();
  }

  clear() {
    this.selectedDate = null;
    this.element.value = '';
    this.element.dispatchEvent(new Event('change', { bubbles: true }));
    this._updatePicker();
  }

  setDate(date) {
    if (!this._isDateEnabled(date)) return;

    this.selectedDate = new Date(date);
    this.viewDate = new Date(date);
    this._setInputValue(date);
    this._updatePicker();
  }

  getDate() {
    return this.selectedDate ? new Date(this.selectedDate) : null;
  }

  destroy() {
    if (this.picker) {
      this.picker.remove();
    }
    super.destroy();
  }
}

// Register as plugin
if (typeof window.NexTab !== 'undefined') {
  window.NexTab.use('datepicker', DatePicker);
}
