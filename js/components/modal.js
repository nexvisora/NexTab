import { Component } from '../core/component.js';

/**
 * NexTab Modal Component
 * A lightweight, customizable modal dialog component
 */
export class Modal extends Component {
  static get defaults() {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      transition: 300,
      backdropClass: 'modal-backdrop',
      showClass: 'show',
      modalTemplate: `
                <div class="modal" role="dialog" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title"></h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div class="modal-body"></div>
                            <div class="modal-footer"></div>
                        </div>
                    </div>
                </div>`,
    };
  }

  constructor(element, options = {}) {
    super(element, options);
    this._init();
  }

  _init() {
    // Initialize modal
    this.isShown = false;
    this.backdrop = null;
    this.focusElement = null;
    this._addEventListeners();
  }

  _addEventListeners() {
    // Close on backdrop click
    if (this.options.backdrop) {
      this.on(this.element, 'click', e => {
        if (e.target === this.element) {
          this.hide();
        }
      });
    }

    // Close on escape key
    if (this.options.keyboard) {
      this.on(document, 'keydown', e => {
        if (e.key === 'Escape' && this.isShown) {
          this.hide();
        }
      });
    }

    // Setup event listeners for modal
    this.on(this.element, 'click', '[data-dismiss="modal"]', () => this.hide());
  }

  show() {
    if (this.isShown) return;

    const event = new CustomEvent('show.modal');
    this.element.dispatchEvent(event);

    this.isShown = true;
    this._createModal();
    this._createBackdrop();
    this._showModal();

    if (this.options.focus) {
      this.focusElement = document.activeElement;
      const focusable = this.element.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) {
        focusable.focus();
      }
    }

    this.element.dispatchEvent(new CustomEvent('shown.modal'));
  }

  hide() {
    if (!this.isShown) return;

    const event = new CustomEvent('hide.modal');
    this.element.dispatchEvent(event);

    this.isShown = false;
    this._hideModal();
    this._removeBackdrop();

    if (this.focusElement) {
      this.focusElement.focus();
      this.focusElement = null;
    }

    this.element.dispatchEvent(new CustomEvent('hidden.modal'));
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

  _createModal() {
    const template = document.createElement('div');
    template.innerHTML = Modal.defaults.modalTemplate.trim();
    this.modal = template.firstChild;
    document.body.appendChild(this.modal);

    // Set content
    if (this.options.title) {
      this.modal.querySelector('.modal-title').textContent = this.options.title;
    }
    if (this.options.content) {
      this.modal.querySelector('.modal-body').innerHTML = this.options.content;
    }
  }

  _showModal() {
    this.modal.style.display = 'block';
    setTimeout(() => {
      this.modal.classList.add(Modal.defaults.showClass);
    }, 10);
  }

  _hideModal() {
    this.modal.classList.remove(Modal.defaults.showClass);
    setTimeout(() => {
      this.modal.style.display = 'none';
      this.modal.remove();
    }, Modal.defaults.transition);
  }

  _createBackdrop() {
    if (!this.options.backdrop) return;

    this.backdrop = document.createElement('div');
    this.backdrop.className = Modal.defaults.backdropClass;
    document.body.appendChild(this.backdrop);

    setTimeout(() => {
      this.backdrop.classList.add(Modal.defaults.showClass);
    }, 10);

    if (this.options.backdrop === 'static') return;
    this.backdrop.addEventListener('click', () => this.hide());
  }

  _removeBackdrop() {
    if (!this.backdrop) return;

    this.backdrop.classList.remove(Modal.defaults.showClass);
    setTimeout(() => {
      this.backdrop.remove();
      this.backdrop = null;
    }, Modal.defaults.transition);
  }
}

// Add to NexTab namespace
if (typeof NexTab === 'undefined') {
  window.NexTab = {};
}
NexTab.Modal = Modal;
