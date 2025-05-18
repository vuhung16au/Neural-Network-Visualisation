/**
 * Neural Network Visualization Server-Side Export Service
 * Handles high-quality PNG export from SVG
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Setup temp directory for exports
const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

/**
 * Converts SVG to PNG using sharp library
 * @param {string} svgData - String representation of SVG
 * @param {number} width - Output width
 * @param {number} height - Output height
 * @returns {Promise<Buffer>} PNG buffer
 */
async function convertSVGtoPNG(svgData, width, height) {
  try {
    // Use sharp to convert SVG to PNG
    const pngBuffer = await sharp(Buffer.from(svgData))
      .resize(width, height)
      .png()
      .toBuffer();
    
    return pngBuffer;
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
    throw error;
  }
}

/**
 * Route handler for PNG export
 */
router.post('/png', upload.none(), async (req, res) => {
  try {
    const { svgData, width, height, filename } = req.body;
    
    if (!svgData) {
      return res.status(400).send('No SVG data provided');
    }
    
    // Convert dimensions to integers
    const outputWidth = parseInt(width, 10) || 800;
    const outputHeight = parseInt(height, 10) || 600;
    
    // Generate output filename
    const outputFilename = filename || 'nn.png';
    
    // Convert SVG to PNG
    const pngBuffer = await convertSVGtoPNG(svgData, outputWidth, outputHeight);
    
    // Send the PNG buffer as response
    res.set('Content-Type', 'image/png');
    res.set('Content-Disposition', `attachment; filename=${outputFilename}`);
    res.send(pngBuffer);
    
  } catch (error) {
    console.error('Error processing PNG export:', error);
    res.status(500).send('Error generating PNG');
  }
});

module.exports = router;
