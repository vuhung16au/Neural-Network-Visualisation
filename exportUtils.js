/**
 * Neural Network Visualization Export Utilities
 * Handles client-side export operations and communication with server
 */

function ExportUtils() {

    /**
     * Exports the SVG to PNG using server-side rendering
     * @param {string} containerId - ID of the SVG container element
     * @param {string} filename - Desired filename for the download
     * @param {object} options - Additional export options
     */
    function exportToPNG(containerId = 'graph-container', filename = 'nn.png', options = {}) {
        // Get the SVG element
        const svgElement = document.querySelector(`#${containerId} svg`);
        const svgData = new XMLSerializer().serializeToString(svgElement);
        
        // Get dimensions
        const svgSize = svgElement.getBoundingClientRect();
        const width = options.width || svgSize.width;
        const height = options.height || svgSize.height;
        
        // Set up form data for POST request
        const formData = new FormData();
        formData.append('svgData', svgData);
        formData.append('width', width);
        formData.append('height', height);
        formData.append('filename', filename);
        
        // Show loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'export-loading';
        loadingIndicator.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,255,255,0.95); padding: 20px; border-radius: 8px; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center;';
        
        // Add spinner
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        spinner.style.cssText = 'width: 40px; height: 40px; margin-bottom: 12px; border: 4px solid rgba(0, 0, 0, 0.1); border-left-color: #4361ee; border-radius: 50%; animation: spin 1s linear infinite;';
        
        // Add loading text
        const loadingText = document.createElement('div');
        loadingText.textContent = 'Generating PNG...';
        loadingText.style.cssText = 'font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; font-weight: 400; color: #212529;';
        
        // Add animation style
        const style = document.createElement('style');
        style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
        
        loadingIndicator.appendChild(spinner);
        loadingIndicator.appendChild(loadingText);
        document.body.appendChild(loadingIndicator);
        
        // Send request to server
        fetch('/export/png', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            document.body.removeChild(loadingIndicator);
        })
        .catch(error => {
            console.error('Error exporting PNG:', error);
            document.body.removeChild(loadingIndicator);
            alert('Failed to export PNG. Please try again.');
            
            // Fallback to client-side rendering if server fails
            exportToPNGClientSide(containerId, filename);
        });
    }
    
    /**
     * Fallback method to export PNG on the client side
     * @param {string} containerId - ID of the SVG container element
     * @param {string} filename - Desired filename for the download
     */
    function exportToPNGClientSide(containerId = 'graph-container', filename = 'nn.png') {
        // Get the SVG element
        const svgElement = document.querySelector(`#${containerId} svg`);
        const svgData = new XMLSerializer().serializeToString(svgElement);
        
        // Create a canvas element
        const canvas = document.createElement("canvas");
        const svgSize = svgElement.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        
        // Create an image from the SVG
        const img = new Image();
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = function() {
            // Draw the image on the canvas
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            
            // Convert the canvas to a data URL and trigger a download
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = filename;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
        
        img.src = url;
    }
    
    return {
        'exportToPNG': exportToPNG,
        'exportToPNGClientSide': exportToPNGClientSide
    };
}
