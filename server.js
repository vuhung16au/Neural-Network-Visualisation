const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const exportService = require('./exportService');

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

// Start the server
app.listen(port, () => {
  console.log(`Neural Network Visualisation server running at http://localhost:${port}`);
  console.log(`Available pages:`);
  console.log(`- Main page: http://localhost:${port}/`);
  console.log(`- AlexNet: http://localhost:${port}/AlexNet.html`);
  console.log(`- LeNet: http://localhost:${port}/LeNet.html`);
  console.log(`- About: http://localhost:${port}/about.html`);
});
