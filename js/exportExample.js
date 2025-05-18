/**
 * Example usage of the PNG export functionality
 * 
 * This file demonstrates how to use the exportUtils.js functionality
 * to export neural network visualizations as PNG images.
 */

// Basic usage - exports the current visualization with default settings
function exportVisualization() {
    const exportUtils = ExportUtils();
    exportUtils.exportToPNG('graph-container', 'neural-network.png');
}

// Advanced usage - customizes dimensions and handles errors
function exportHighResolution() {
    const exportUtils = ExportUtils();
    
    // Custom options
    const options = {
        width: 3000,  // Higher resolution width
        height: 2000, // Higher resolution height
        quality: 100  // Maximum quality
    };
    
    try {
        exportUtils.exportToPNG('graph-container', 'high-res-neural-network.png', options);
    } catch (error) {
        console.error('Error exporting high-resolution image:', error);
        // Fall back to client-side rendering
        exportUtils.exportToPNGClientSide('graph-container', 'fallback-neural-network.png');
    }
}

// Usage for batch exports (useful for research papers, presentations, etc.)
function batchExport() {
    const exportUtils = ExportUtils();
    const configurations = [
        { name: 'fcnn-8-12-8', filename: 'fcnn-8-12-8.png' },
        { name: 'fcnn-16-32-16', filename: 'fcnn-16-32-16.png' },
        { name: 'lenet-classic', filename: 'lenet-classic.png' }
    ];
    
    // In a real application, you would update the network visualization
    // between exports, or export different visualization containers
    configurations.forEach(config => {
        console.log(`Exporting ${config.name}...`);
        exportUtils.exportToPNG('graph-container', config.filename);
    });
}

/**
 * Integration with external tools
 * 
 * If you want to use the export functionality in your own code,
 * you can include the exportUtils.js file and call the exportToPNG method.
 * 
 * Example:
 * <script type="text/javascript" src="exportUtils.js"></script>
 * <script>
 *   document.getElementById('export-button').addEventListener('click', function() {
 *     const exportUtils = ExportUtils();
 *     exportUtils.exportToPNG('my-visualization-container', 'my-visualization.png');
 *   });
 * </script>
 */
