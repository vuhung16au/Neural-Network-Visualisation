# Explanation of NN Visualization JavaScript Files

This document explains the purpose and main logic of the following files:
- `js/AlexNet.js`
- `js/FCNN.js`
- `js/LeNet.js`
- `js/OrbitControls.js`
- `js/Projector.js`
- `js/SVGRenderer.js`

---

## `js/AlexNet.js`

**Purpose:** 3D visualization of the AlexNet architecture using [Three.js](https://threejs.org/).

- Sets up a 3D scene, camera, and renderer.
- Defines materials/colors for different layer types (feature maps, convolutions, pyramids).
- The `redraw` function builds the network: each layer is a 3D box, with convolutional filters and pyramids connecting layers.
- Uses groups for layers, convolutions, pyramids, and text sprites.
- Handles window resizing and camera controls.
- Can show/hide dimensions and style the visualization.

---

## `js/FCNN.js`

**Purpose:** 2D SVG visualization of a Fully Connected Neural Network (FCNN) using [D3.js](https://d3js.org/).

- Sets up an SVG canvas and groups for nodes and links.
- The `redraw` function generates nodes for each layer and links between them, with random weights.
- Supports options for edge width/color, node size, arrowheads, and Bezier curves.
- The `redistribute` function positions nodes and links based on the architecture and window size.
- Handles zooming, panning, and resizing.
- Includes interactive highlighting on node focus.

---

## `js/LeNet.js`

**Purpose:** 2D SVG visualization of the LeNet architecture using D3.js.

- Sets up an SVG canvas and groups for rectangles (feature maps), convolutions, links, polygons (for FC layers), and text.
- The `redraw` function builds the architecture: each layer is a set of rectangles, with lines and polygons representing connections and fully connected layers.
- The `redistribute` function positions all elements based on the architecture and window size.
- Handles zooming, panning, and resizing.
- Supports styling and label display.

---

## `js/OrbitControls.js`

**Purpose:** Implements interactive camera controls for Three.js scenes, allowing users to orbit, zoom, and pan the camera with mouse, touch, or keyboard.

- Orbit: Rotate the camera around a target point (left mouse/touch drag).
- Zoom/Dolly: Move the camera closer/farther (mouse wheel, middle mouse, or pinch).
- Pan: Move the camera parallel to the view plane (right mouse or arrow keys).
- Damping: Optional inertia for smooth movement.
- Auto-rotate: Optionally rotates the camera automatically.
- Reset: Restore camera to its original position and orientation.
- Event Handling: Listens for mouse, touch, and keyboard events to update camera position.

**Usage:** Attach to a Three.js camera and renderer DOM element to enable intuitive 3D navigation.

---

## `js/Projector.js`

**Purpose:** Implements a scene projection system for Three.js, converting 3D objects into 2D renderable elements for non-WebGL renderers (like SVG or Canvas).

- Projection: Projects 3D vertices and objects into 2D screen space.
- Renderable Elements: Defines classes for renderable faces, lines, sprites, and objects.
- Visibility & Clipping: Determines which objects are visible and within the camera’s frustum.
- Sorting: Sorts objects and elements for correct rendering order (painter’s algorithm).
- Pooling: Uses object pools for efficient memory management.

**Usage:** Used internally by non-WebGL renderers (like SVGRenderer) to prepare scene data for 2D rendering.

---

## `js/SVGRenderer.js`

**Purpose:** Renders Three.js scenes as SVG (Scalable Vector Graphics) instead of WebGL, enabling vector-based output.

- SVG Output: Creates and manages an SVG DOM element as the rendering surface.
- Rendering: Converts projected 3D objects (from Projector) into SVG paths, lines, and shapes.
- Lighting: Simulates basic lighting for materials (ambient, directional, point lights).
- Quality & Precision: Allows setting rendering quality and numeric precision.
- Auto-clear: Optionally clears the SVG before each render.
- Custom SVG Objects: Supports embedding custom SVG nodes in the scene.

**Usage:** Instantiate and use like a Three.js renderer, but outputs SVG for high-quality, scalable graphics (useful for print/export or non-WebGL environments).

---

## Summary Table

| File                | Library   | Visualization | Main Focus                                 |
|---------------------|-----------|---------------|---------------------------------------------|
| `js/AlexNet.js`     | Three.js  | 3D            | AlexNet CNN architecture                    |
| `js/FCNN.js`        | D3.js     | 2D SVG        | Fully Connected NN                          |
| `js/LeNet.js`       | D3.js     | 2D SVG        | LeNet CNN architecture                      |
| `js/OrbitControls.js`| Three.js | Camera Control| Interactive orbit/pan/zoom for 3D scenes    |
| `js/Projector.js`   | Three.js  | 3D→2D         | Projection for SVG/Canvas renderers         |
| `js/SVGRenderer.js` | Three.js  | 2D SVG        | SVG rendering of 3D scenes                  |

