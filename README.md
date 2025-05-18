# [NN-Visuals](https://github.com/vuhung16au/Neural-Network-Visualisation)

Creating illustrations of Neural Network architectures is traditionally a time-consuming process, where machine learning researchers often spend hours constructing intricate diagrams manually. This repetitive task diverts valuable research time and creates inconsistencies across publications.

NN-Visuals is an advanced tool for generating Neural Network (NN) architecture visualizations parametrically through an intuitive interface. It allows researchers to quickly export high-quality diagrams as both Scalable Vector Graphics (SVG) for vector-based publication needs and PNG images for presentations and digital sharing.

## Features

- **Interactive Visualization Engine**: Create complex neural network architecture visualizations through a parameter-driven interface
- **Comprehensive Customization**: Fine-tune node sizes, colors, edge styles, transparency, spacing, and layout properties
- **Multiple Export Options**: Download as SVG files for vector graphics in publications or PNG images for presentations
- **Three Specialized Visualization Styles**:
  - FCNN: Classic fully-connected network visualization with customizable layers and connections
  - LeNet-style: CNN visualization with feature maps and convolutional filters
  - AlexNet-style: Modern 3D deep network visualization with interactive camera controls
- **Responsive Design**: Optimized for both desktop and mobile viewing experiences
- **Server-Side Rendering**: High-quality PNG export with server-side processing for consistent results

I designed this tool to save valuable time for machine learning researchers while ensuring publication-quality visualizations. Additionally, NN-Visuals serves as an effective pedagogical tool for teaching neural network concepts through visual representation.


## Examples

<div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <img src="images/alexnet.png" alt="AlexNet-style visualization" width="32%" />
    <img src="images/lenet.png" alt="LeNet-style CNN visualization" width="32%" />
    <img src="images/nn.png" alt="Classic neural network visualization" width="32%" />
</div>


## How to Run

To run the application in development mode:

```bash
npm run start:dev
```

This will start the server with hot-reloading enabled.

## Recent Updates

- Completely redesigned UI with modern color scheme and improved visual hierarchy (May 2025)
- Enhanced PNG export functionality with improved loading indicators
- Added responsive design improvements for better mobile experience
- Reorganized controls into logical groupings for better usability
- Enhanced form control styling (checkboxes, radio buttons, range sliders)
- Added 404 page, improved server console output, and SEO enhancements
- Added a new "How to Use" page with detailed instructions and tips
- Added a new "About" page with information about the project and its creator