# Introduction to NexTab Framework

NexTab is a modern, lightweight, and accessible CSS framework designed to help developers build
beautiful and responsive web applications. With a focus on modularity, customization, and developer
experience, NexTab provides everything you need to create modern web interfaces.

## Features

- 🎨 **Customizable Design System**: Easily customize colors, typography, spacing, and more through
  SCSS variables
- 📦 **Tree-Shakable Components**: Import only what you need, reducing bundle size
- 🌐 **RTL Support**: Built-in support for right-to-left languages
- ♿ **Accessibility First**: ARIA support and keyboard navigation built-in
- 🔌 **Plugin System**: Extend functionality with plugins
- 📱 **Responsive**: Mobile-first design approach
- 🎯 **Modern Build System**: Uses Rollup for optimal bundling

## Quick Start

### NPM

```bash
npm install nextab-framework
```

### Import Styles

```scss
// Import everything
@import 'nextab-framework/scss/framework';

// Or import individual components
@import 'nextab-framework/scss/components/buttons';
@import 'nextab-framework/scss/components/modal';
```

### Import JavaScript

```javascript
// Import everything
import NexTab from 'nextab-framework';

// Or import individual components
import { Modal, Dropdown } from 'nextab-framework/components';
```

### Use Components

```html
<!-- Button Example -->
<button class="btn btn-primary">Click Me</button>

<!-- Modal Example -->
<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="close" data-dismiss="modal">
          <span data-icon="close"></span>
        </button>
      </div>
      <div class="modal-body">Modal content goes here...</div>
    </div>
  </div>
</div>
```

## Browser Support

NexTab supports all modern browsers and is tested on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) before
submitting pull requests.
