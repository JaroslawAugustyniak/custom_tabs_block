# Custom Tabs Block

A flexible WordPress block for managing multi-level tabs and sections structure.

## Features

- **Multi-level Structure**: Support for 3 levels of nested items (tabs, children, and sub-children)
- **Easy Management**: Add/delete items with simple buttons
- **Rich Editing**: Edit titles, descriptions, button text, and URLs directly in the block editor
- **Responsive Design**: Beautiful styling that works on all devices
- **Gutenberg Compatible**: Fully integrated with WordPress block editor

## Installation

1. Navigate to the plugin directory:
   ```bash
   cd wp-content/plugins/custom_tabs_block
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

## Development

To develop with live reloading:

```bash
npm run dev
```

Or use the watch mode:

```bash
npm start
```

## Structure

The block manages items with the following structure:

```
Level 1: Tab (h2)
├── Title
├── Description
├── Button Text & URL
└── Children (Level 2 items)
    ├── Tab Child (h3)
    │   ├── Title
    │   ├── Description
    │   ├── Button Text & URL
    │   └── Children (Level 3 items)
    │       └── Tab Sub-child (h4)
    │           ├── Title
    │           ├── Description
    │           ├── Button Text & URL
```

## Frontend Output

The block outputs HTML structured as:

```html
<div class="tabs_block">
  <div class="tabs_block_item">
    <h2>Title</h2>
    <p>Description</p>
    <a href="" class="button">Button Text</a>
    <div class="children">
      <!-- Children items here -->
    </div>
  </div>
</div>
```

## Styling

Custom CSS variables and classes are available for styling:

- `.tabs_block` - Main container
- `.tabs_block_item` - Level 1 items (blue left border)
- `.tabs_block_children_item` - Level 2 items (purple left border)
- `.tabs_block_children_2_item` - Level 3 items (pink left border)

## License

GPL v2 or later
