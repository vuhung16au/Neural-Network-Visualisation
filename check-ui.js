#!/usr/bin/env node

/**
 * UI Improvement Verification Script
 * 
 * This script checks if all UI improvements have been correctly applied
 * across the Neural Network Visualization application.
 */

const fs = require('fs');
const path = require('path');

// Files to check
const filesToCheck = [
  'index.html',
  'LeNet.html',
  'AlexNet.html',
  'about.html',
  'exportUtils.js',
  'server.js',
  '404.html',
  'robots.txt',
  'sitemap.xml'
];

// CSS variables that should be present
const cssVariables = [
  '--primary:',
  '--primary-light:',
  '--secondary:',
  '--light:',
  '--dark:',
  '--gray:',
  '--success:',
  '--warning:',
  '--danger:'
];

// UI components that should exist
const uiComponents = [
  '.control-group',
  '.spinner',
  '@keyframes spin',
  'font-family:',
  'box-shadow:'
];

// Check if files exist
console.log('\x1b[36m%s\x1b[0m', '\n=== Checking Files ===');
filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ \x1b[32m${file}\x1b[0m exists`);
  } else {
    console.log(`✗ \x1b[31m${file}\x1b[0m is missing`);
  }
});

// Check HTML files for CSS variables
console.log('\x1b[36m%s\x1b[0m', '\n=== Checking CSS Variables ===');
['index.html', 'LeNet.html', 'AlexNet.html', 'about.html'].forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    let allVariablesFound = true;
    
    cssVariables.forEach(variable => {
      if (content.includes(variable)) {
        console.log(`✓ \x1b[32m${variable}\x1b[0m found in ${file}`);
      } else {
        console.log(`✗ \x1b[31m${variable}\x1b[0m missing in ${file}`);
        allVariablesFound = false;
      }
    });
    
    if (allVariablesFound) {
      console.log(`✓ \x1b[32mAll CSS variables\x1b[0m present in ${file}`);
    }
  }
});

// Check UI components
console.log('\x1b[36m%s\x1b[0m', '\n=== Checking UI Components ===');
['index.html', 'LeNet.html', 'AlexNet.html'].forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    let allComponentsFound = true;
    
    uiComponents.forEach(component => {
      if (content.includes(component)) {
        console.log(`✓ \x1b[32m${component}\x1b[0m found in ${file}`);
      } else {
        console.log(`✗ \x1b[31m${component}\x1b[0m missing in ${file}`);
        allComponentsFound = false;
      }
    });
    
    if (allComponentsFound) {
      console.log(`✓ \x1b[32mAll UI components\x1b[0m present in ${file}`);
    }
  }
});

// Check PNG export enhancements
console.log('\x1b[36m%s\x1b[0m', '\n=== Checking PNG Export Enhancements ===');
const exportUtilsPath = path.join(__dirname, 'exportUtils.js');
if (fs.existsSync(exportUtilsPath)) {
  const content = fs.readFileSync(exportUtilsPath, 'utf8');
  if (content.includes('spinner') && content.includes('@keyframes spin')) {
    console.log('✓ \x1b[32mPNG export loading animation\x1b[0m is implemented');
  } else {
    console.log('✗ \x1b[31mPNG export loading animation\x1b[0m is missing');
  }
}

// Summary
console.log('\x1b[36m%s\x1b[0m', '\n=== Summary ===');
console.log('\x1b[32mUI improvements verification complete.\x1b[0m');
console.log('\nTo test the server:\n1. Run: npm start\n2. Visit: http://localhost:3000\n');
