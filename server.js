const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const exportService = require('./js/exportService');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Register the export service routes
app.use('/export', exportService);

// Handle 404 errors with custom page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(port, () => {
  console.log('\n\x1b[36m%s\x1b[0m', '┌──────────────────────────────────────────────────┐');
  console.log('\x1b[36m%s\x1b[0m', '│           Neural Network Visualisation            │');
  console.log('\x1b[36m%s\x1b[0m', '└──────────────────────────────────────────────────┘');
  console.log('\n\x1b[32m%s\x1b[0m', `✓ Server running at: \x1b[1mhttp://localhost:${port}\x1b[0m`);
  console.log('\n\x1b[33m%s\x1b[0m', 'Available pages:');
  console.log('\x1b[0m%s\x1b[0m', `- Main page: \x1b[34mhttp://localhost:${port}/\x1b[0m`);
  console.log('\x1b[0m%s\x1b[0m', `- AlexNet: \x1b[34mhttp://localhost:${port}/AlexNet.html\x1b[0m`);
  console.log('\x1b[0m%s\x1b[0m', `- LeNet: \x1b[34mhttp://localhost:${port}/LeNet.html\x1b[0m`);
  console.log('\x1b[0m%s\x1b[0m', `- About: \x1b[34mhttp://localhost:${port}/about.html\x1b[0m`);
  console.log('\n\x1b[33m%s\x1b[0m', 'PNG Export:');
  console.log('\x1b[0m%s\x1b[0m', '- Service status: \x1b[32mActive\x1b[0m');
  console.log('\x1b[0m%s\x1b[0m', '- Endpoint: /export/png');
  console.log('\x1b[0m%s\x1b[0m', '- Documentation: See EXPORT_README.md\n');
});
