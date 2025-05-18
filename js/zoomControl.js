/**
 * ZoomControl - A simple JavaScript utility for zooming in/out visualization areas
 */
const ZoomControl = () => {
    // Default settings
    let settings = {
        minZoom: 0.5,
        maxZoom: 3.0,
        zoomStep: 0.1,
        initialZoom: 1.0,
        containerSelector: '#graph-container',
    };
    
    let currentZoom = settings.initialZoom;
    let container = null;
    
    /**
     * Initialize zoom controls
     * @param {Object} options - Configuration options
     */
    const init = (options = {}) => {
        // Merge options with default settings
        settings = { ...settings, ...options };
        currentZoom = settings.initialZoom;
        
        // Find the container
        container = document.querySelector(settings.containerSelector);
        if (!container) {
            console.error(`Container ${settings.containerSelector} not found.`);
            return;
        }
        
        // Apply initial transform
        applyZoom();
        
        // Create zoom controls
        createZoomControls();
        
        return {
            zoomIn: zoomIn,
            zoomOut: zoomOut,
            resetZoom: resetZoom,
            setZoom: setZoom,
            getCurrentZoom: () => currentZoom
        };
    };
    
    /**
     * Create zoom control buttons
     */
    const createZoomControls = () => {
        const controls = document.createElement('div');
        controls.className = 'zoom-controls';
        
        const zoomInBtn = document.createElement('button');
        zoomInBtn.className = 'zoom-btn zoom-in';
        zoomInBtn.innerHTML = '<i class="fa fa-search-plus"></i>';
        zoomInBtn.title = 'Zoom in';
        zoomInBtn.setAttribute('aria-label', 'Zoom in');
        zoomInBtn.addEventListener('click', zoomIn);
        
        const resetBtn = document.createElement('button');
        resetBtn.className = 'zoom-btn zoom-reset';
        resetBtn.textContent = 'Reset';
        resetBtn.title = 'Reset zoom';
        resetBtn.setAttribute('aria-label', 'Reset zoom');
        resetBtn.addEventListener('click', resetZoom);
        
        const zoomOutBtn = document.createElement('button');
        zoomOutBtn.className = 'zoom-btn zoom-out';
        zoomOutBtn.innerHTML = '<i class="fa fa-search-minus"></i>';
        zoomOutBtn.title = 'Zoom out';
        zoomOutBtn.setAttribute('aria-label', 'Zoom out');
        zoomOutBtn.addEventListener('click', zoomOut);
        
        // Changed order to match visual top-to-bottom layout
        controls.appendChild(zoomInBtn);
        controls.appendChild(resetBtn);
        controls.appendChild(zoomOutBtn);
        
        document.body.appendChild(controls);
    };
    
    /**
     * Apply zoom to container
     */
    const applyZoom = () => {
        if (container) {
            container.style.transform = `scale(${currentZoom})`;
            container.style.transformOrigin = 'center center';
            container.style.transition = 'transform 0.3s ease-out';
            
            // Update zoom level indicator if visible
            const zoomControls = document.querySelector('.zoom-controls');
            if (zoomControls) {
                const resetBtn = zoomControls.querySelector('.zoom-reset');
                if (resetBtn) {
                    resetBtn.textContent = `${Math.round(currentZoom * 100)}%`;
                }
            }
        }
    };
    
    /**
     * Zoom in by one step
     */
    const zoomIn = () => {
        if (currentZoom < settings.maxZoom) {
            currentZoom = Math.min(settings.maxZoom, currentZoom + settings.zoomStep);
            applyZoom();
        }
    };
    
    /**
     * Zoom out by one step
     */
    const zoomOut = () => {
        if (currentZoom > settings.minZoom) {
            currentZoom = Math.max(settings.minZoom, currentZoom - settings.zoomStep);
            applyZoom();
        }
    };
    
    /**
     * Reset zoom to initial level
     */
    const resetZoom = () => {
        currentZoom = settings.initialZoom;
        applyZoom();
    };
    
    /**
     * Set zoom to specific level
     * @param {number} zoom - Zoom level
     */
    const setZoom = (zoom) => {
        if (zoom >= settings.minZoom && zoom <= settings.maxZoom) {
            currentZoom = zoom;
            applyZoom();
        }
    };
    
    // Public API
    return {
        init
    };
};