# PNG Export Service for Neural Network Visualization

This feature allows you to export neural network visualizations as high-quality PNG images using server-side rendering.

## Installation

To use the PNG export functionality, you need to install the required dependencies:

```bash
npm run setup
```

This will install all required packages including:
- `multer`: Handling multipart/form-data for uploading SVG to the server
- `sharp`: Converting SVG to PNG with high quality
- `uuid`: Generating unique filenames for temporary files

## How It Works

The PNG export process works in two ways:

1. **Server-side rendering** (default): The SVG is sent to the server where it's converted to a PNG using the sharp library, which provides higher quality and more consistent results across browsers.

2. **Client-side fallback**: If server-side rendering fails, the system falls back to client-side rendering using HTML Canvas.

## Code Structure

- `exportUtils.js`: Client-side utilities for handling PNG export requests
- `exportService.js`: Server-side Express.js middleware for processing SVG to PNG conversion

## Configuration Options

When using the export functionality, you can customize:

- Filename
- Image dimensions
- Quality settings

Example:

```javascript
const exportUtils = ExportUtils();
exportUtils.exportToPNG('graph-container', 'custom-filename.png', {
    width: 1200,
    height: 800
});
```

## Troubleshooting

If you encounter issues with PNG export:

1. Check that the server is running
2. Verify all dependencies are installed
3. Check browser console for errors
4. Try the client-side fallback by calling `exportToPNGClientSide` directly

## Integration

This feature is integrated into all three visualization styles with a modern UI experience:
- FCNN style (index.html)
- LeNet style (LeNet.html)
- AlexNet style (AlexNet.html)

## User Interface

The export process includes a visually appealing loading indicator with animation:

1. Click the "Export as PNG" button in any visualization
2. A loading indicator appears with a spinner animation
3. Once complete, the download starts automatically
4. If there's an error, the system falls back to client-side rendering

## Customizing the Export UI

The export loading UI uses our application's style variables:

```css
:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --secondary: #3a0ca3;
}
```

You can customize these variables in the HTML files to change the look of all UI components including the export dialog.
