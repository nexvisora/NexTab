# NexTab

A modern, accessible CSS framework with dark mode and RTL support.

[![npm version](https://img.shields.io/npm/v/nextab.svg)](https://www.npmjs.com/package/nextab)
[![License](https://img.shields.io/npm/l/nextab.svg)](https://github.com/nexvisora/NexTab/blob/main/LICENSE)

## Quick Start

### 1. Install

```bash
npm install nextab
```

### 2. Import

```javascript
// Import CSS
import 'nextab/dist/css/framework.min.css';

// Import components
import { Modal, Dropdown, Tooltip } from 'nextab';
```

### 3. Use

```html
<!-- Add components to your HTML -->
<button class="btn btn-primary">Button</button>
<div class="modal" id="myModal">...</div>
<div class="dropdown">...</div>
```

## Features

- **Modern Design System**: Clean and customizable
- **Dark Mode**: Built-in with system preference detection
- **RTL Support**: Full right-to-left language support
- **Accessibility**: WCAG 2.1 compliant
- **Responsive**: Mobile-first approach
- **Tree-Shakable**: Import only what you need
- **Customizable**: Easy theming with CSS variables
- **Modular**: Use components independently

## Installation Options

```bash
# Using npm
npm install nextab

# Using yarn
yarn add nextab

# Using pnpm
pnpm add nextab
```

Or use via CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/nextab/dist/css/framework.min.css" />
<script src="https://unpkg.com/nextab/dist/js/framework.min.js"></script>
```

## Component Usage

### Modal

```javascript
// Import
import { Modal } from 'nextab';

// Initialize
const modal = new Modal('#myModal');

// HTML
<button data-toggle="modal" data-target="#myModal">Open Modal</button>
<div id="myModal" class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5>Modal Title</h5>
                <button class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">Content here...</div>
        </div>
    </div>
</div>
```

### Dropdown

```javascript
// Import
import { Dropdown } from 'nextab';

// Initialize
const dropdown = new Dropdown('.dropdown');

// HTML
<div class="dropdown">
  <button class="btn dropdown-toggle">Dropdown</button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">
      Item 1
    </a>
    <a class="dropdown-item" href="#">
      Item 2
    </a>
  </div>
</div>;
```

### Dark Mode

```html
<!-- Enable dark mode -->
<html data-theme="dark">
  <!-- Add theme toggle -->
  <button class="theme-toggle" data-theme-toggle>Toggle Theme</button>
</html>
```

### RTL Support

```html
<html dir="rtl"></html>
```

### Custom Theme

```css
:root {
  --primary: #007bff;
  --secondary: #6c757d;
  --success: #28a745;
  --danger: #dc3545;
}
```

## Advanced Usage

### SCSS Integration

```scss
// Import all
@import 'nextab/scss/framework';

// Or specific components
@import 'nextab/scss/components/buttons';
@import 'nextab/scss/components/modal';
```

### Tree Shaking

```javascript
// Import only what you need
import { Modal } from 'nextab/js/components/modal';
import { Dropdown } from 'nextab/js/components/dropdown';
```

## Browser Support

- Chrome, Firefox, Safari, Edge (last 2 versions)
- iOS 12+
- Android 5.0+

## Documentation

Visit [documentation site](https://nexvisora.github.io/NexTab) for detailed usage instructions and
examples.

## License

MIT NexVisora
