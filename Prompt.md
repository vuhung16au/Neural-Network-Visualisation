# Explain CNN

Explain CNN mathematically in detail.
Save your answer in a markdown format file, file name: CNN.md

# Explain AlexNet

Explain AlexNet mathematically in detail.
Save your answer in a markdown format file, file name: AlexNet.md

# Explain FCNN

Explain FCNN mathematically in detail.
Save your answer in a markdown format file, file name: FCNN.md

# Explain LeNet

Explain LeNet mathematically in detail.
Save your answer in a markdown format file, file name: LeNet.md

# Update `about.html` file

Update `about.html` 

0. Link to the algorithms 
https://github.com/vuhung16au/Neural-Network-Visualisation/blob/master/CNN.md
https://github.com/vuhung16au/Neural-Network-Visualisation/blob/master/AlexNet.md
https://github.com/vuhung16au/Neural-Network-Visualisation/blob/master/FCNN.md
https://github.com/vuhung16au/Neural-Network-Visualisation/blob/master/LeNet.md

1. Introduce what this app does 
2. Briefly mathematically introduce the algorithms CNN, FCNN, AlexNet, , LeNet

3. Change the style 

4. Make it responsive. 

5. Use mathjax lib to display maths formulas

# Create docker compose yml 

# Refactor the app.

Put all css to files under folder styles

You can help me decide the filenames and file structure.

# Add an option to show/hide the "NN-Visuals" setting box on the left hand side of the script?

Implement the Toggle Button for NN-Visuals Settings Box for the 3 pages:

http://localhost:3000/index.html
http://localhost:3000/LeNet.html
http://localhost:3000/AlexNet.html

# Upgrade to Bootstrap 5.3.6

# Upgrade to Font Awesome 6.7.2

# Add a page `howto.html` to show how to use the app

- How to use the app
- How to export the image
- How to use the app
- How to zoom in/out
- How to show/hide the NN-Visuals setting box
- How to change the color of the NN-Visuals setting box
- How to switch between the 3 styles
- How to change the size of the NN-Visuals setting box
- How to change the size of the NN-Visuals setting box

And link to this page from the `index.html`, `LeNet.html`, `AlexNet.html` pages.
- Add a link to the `howto.html` page in the `index.html`, `LeNet.html`, `AlexNet.html` pages
- Add a link to the `howto.html` page in the `about.html` page

# Implement zoom in/out feature
- Implement zoom in/out feature for the 3 pages:
http://localhost:3000/index.html
http://localhost:3000/LeNet.html
http://localhost:3000/AlexNet.html

add buttons to zoom in/out the image
"+" button to zoom in
"-" button to zoom out
- Add a button to reset the zoom level

# Shortcut keys

- Press key "H" to show/hide the NN-Visuals setting box
- Press key "F" to switch to FCNN style
- Press key "L" to switch to LeNet style
- Press key "A" to switch to AlexNet style

- Press key "Z" to zoom in
- Press key "X" to zoom out

# Simplify UI 

To improve the UI of this neural network visualization tool (NN-Visuals), here are some actionable suggestions:

1. **Simplify and Organize Controls**:
   - Group related settings into collapsible sections (e.g., "Edge Styling," "Node Styling," "Layout") to reduce clutter.
   - Use icons alongside text labels for settings (e.g., a line icon for "Edge Width") to make options more intuitive.

2. **Enhance Visual Hierarchy**:
   - Increase the font size and weight of section headers like "STYLE" and "ARCHITECTURE" for better readability.
   - Add subtle background shading or borders to separate the control panel from the visualization area.

3. **Improve Color Coding**:
   - The edge color options (blue, red, black) could use a color picker or more descriptive labels (e.g., "Positive: Blue," "Negative: Red") to clarify their purpose.
   - Ensure the default color scheme is accessible (e.g., avoid red-green combinations for colorblind users).

4. **Optimize Layout Options**:
   - The "Layer Spacing" slider could include numerical input for precision, and the "Direction" toggle (Horizontal/Vertical) could be a dropdown with a preview icon.
   - Add a "Reset to Default" button at the top of the control panel for quick access.

5. **Enhance Interactivity**:
   - Add tooltips to explain settings (e.g., hover over "Edge Opacity" to see "Controls transparency of connections").
   - Enable drag-and-drop for nodes in the visualization to allow manual adjustments.

6. **Improve Download and Navigation**:
   - The "Download PNG" button could be more prominent—place it in a fixed top bar with other actions like "Save Settings" or "Share."
   - The "FCNN," "LeNet," and "AlexNet" options could be a dropdown menu to save space.

7. **Add Feedback and Context**:
   - Display a small info panel showing the current architecture stats (e.g., "39 nodes, 322 edges") directly above the visualization, not at the bottom.
   - Include a "Help" or "Tutorial" link in the top-right corner for new users.

8. **Polish the Visualization**:
   - Add a subtle grid or background pattern to the visualization area to give it depth.
   - Highlight the selected layer or node when adjusting settings (e.g., glow effect on the "Hidden Layer").

These changes would make the UI more intuitive, visually appealing, and user-friendly while maintaining its functionality.

# UI Improvements

Controls are grouped into collapsible sections with icons.
Section headers are larger and bolder for better hierarchy.
The control panel has a subtle background and border for separation.
Color pickers have clear, accessible labels.
Sliders are paired with numeric inputs for precision.
Tooltips are added for better usability.
A prominent "Reset to Default" button is included.
Download and help actions are in a fixed top bar.
The stats/info panel is now above the visualization.
The visualization area features a subtle grid background.