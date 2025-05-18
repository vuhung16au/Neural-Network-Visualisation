# LeNet: Mathematical Explanation

LeNet-5 is a pioneering convolutional neural network architecture introduced by Yann LeCun and his colleagues in 1998. It was primarily designed for handwritten and machine-printed character recognition.

## Architecture Overview

LeNet-5 consists of 7 layers (not counting the input layer) that include:
- 2 convolutional layers
- 2 subsampling (pooling) layers
- 2 fully connected layers
- 1 output layer

## Mathematical Formulation

### Input Layer
- Input: 32×32 grayscale image
- Mathematically represented as a 3D tensor $X \in \mathbb{R}^{1 \times 32 \times 32}$

### Layer C1: First Convolutional Layer
- 6 feature maps with 5×5 convolutional kernels
- Input size: $1 \times 32 \times 32$
- Output size: $6 \times 28 \times 28$

For each feature map $i$ in C1, the output is computed as:

$$C1_i = \sigma\left(\sum_{j=1}^{1} X_j * K_{ij} + b_i\right)$$

where:
- $\sigma$ is the activation function (typically sigmoid: $\sigma(x) = \frac{1}{1 + e^{-x}}$)
- $*$ denotes the 2D convolution operation
- $K_{ij}$ is the convolution kernel from input channel $j$ to feature map $i$
- $b_i$ is the bias term

Mathematically, the 2D convolution operation is defined as:

$$(X * K)_{m,n} = \sum_{k=0}^{K_h-1} \sum_{l=0}^{K_w-1} X_{m+k, n+l} \cdot K_{k,l}$$

where $K_h$ and $K_w$ are the height and width of the kernel.

### Layer S2: First Subsampling Layer (Average Pooling)
- 6 feature maps with 2×2 pooling
- Input size: $6 \times 28 \times 28$
- Output size: $6 \times 14 \times 14$

For each feature map $i$ in S2, the output is:

$$S2_i = \sigma\left(\beta_i \cdot \text{avgpool}(C1_i) + b_i\right)$$

where:
- $\text{avgpool}$ is the average pooling operation with 2×2 windows and stride 2
- $\beta_i$ is a trainable multiplicative parameter
- $b_i$ is a trainable additive bias

The average pooling operation is:

$$\text{avgpool}(X)_{m,n} = \frac{1}{4}\sum_{k=0}^{1}\sum_{l=0}^{1}X_{2m+k, 2n+l}$$

### Layer C3: Second Convolutional Layer
- 16 feature maps with 5×5 convolutional kernels
- Not all input maps are connected to all output maps (sparse connectivity)
- Input size: $6 \times 14 \times 14$
- Output size: $16 \times 10 \times 10$

For feature map $i$ in C3, the output is:

$$C3_i = \sigma\left(\sum_{j \in M_i} S2_j * K_{ij} + b_i\right)$$

where $M_i$ represents the set of input feature maps connected to output map $i$.

The sparse connectivity pattern in the original LeNet-5 follows this table:
| Output Map | Input Maps Connected |
|------------|---------------------|
| 0-5        | Three consecutive maps (e.g., 0,1,2 for output map 0) |
| 6-11       | Four consecutive maps (with wrap-around) |
| 12-14      | Four non-consecutive maps |
| 15         | All six input maps |

### Layer S4: Second Subsampling Layer (Average Pooling)
- 16 feature maps with 2×2 pooling
- Input size: $16 \times 10 \times 10$
- Output size: $16 \times 5 \times 5$

The computation is similar to S2:

$$S4_i = \sigma\left(\beta_i \cdot \text{avgpool}(C3_i) + b_i\right)$$

### Layer C5: First Fully Connected Layer
- 120 neurons, each connected to all 16×5×5 = 400 inputs
- Input size: $16 \times 5 \times 5$
- Output size: $120 \times 1$

Mathematically:

$$C5_i = \sigma\left(\sum_{j=1}^{16}\sum_{m=1}^{5}\sum_{n=1}^{5} W_{i,j,m,n} \cdot S4_{j,m,n} + b_i\right)$$

where $W_{i,j,m,n}$ represents the weight connecting the input at position $(j,m,n)$ to the $i$-th neuron in C5.

### Layer F6: Second Fully Connected Layer
- 84 neurons
- Input size: $120 \times 1$
- Output size: $84 \times 1$

Mathematically:

$$F6_i = \sigma\left(\sum_{j=1}^{120} W_{ij} \cdot C5_j + b_i\right)$$

### Output Layer
- 10 neurons (for 10 digit classes in MNIST)
- Input size: $84 \times 1$
- Output size: $10 \times 1$

In the original LeNet-5, a specialized layer called "Gaussian connections" was used, but in modern implementations, this is typically replaced with a standard fully connected layer followed by softmax:

$$y_i = \text{softmax}\left(\sum_{j=1}^{84} W_{ij} \cdot F6_j + b_i\right)$$

where the softmax function is defined as:

$$\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{10} e^{z_j}}$$

## Training

LeNet was trained using the backpropagation algorithm to minimize the mean squared error (MSE) loss:

$$L = \frac{1}{N}\sum_{i=1}^{N}\sum_{j=1}^{10}(y_{ij} - t_{ij})^2$$

where:
- $N$ is the number of training samples
- $y_{ij}$ is the network output for the $j$-th class of the $i$-th sample
- $t_{ij}$ is the target output (usually 1 for the correct class, 0 otherwise)

Modern implementations often use cross-entropy loss instead:

$$L = -\frac{1}{N}\sum_{i=1}^{N}\sum_{j=1}^{10}t_{ij}\log(y_{ij})$$

## Parameter Count

LeNet-5 has approximately 60,000 trainable parameters:
- C1: 6 × (5×5×1 + 1) = 156 parameters
- S2: 6 × (1+1) = 12 parameters
- C3: 16 × (5×5×~3.75 + 1) = ~1,516 parameters (varies due to sparse connectivity)
- S4: 16 × (1+1) = 32 parameters
- C5: 120 × (16×5×5 + 1) = 48,120 parameters
- F6: 84 × (120 + 1) = 10,164 parameters
- Output: 10 × (84 + 1) = 850 parameters

## Historical Significance

LeNet-5 demonstrated that convolutional neural networks could be effectively trained with backpropagation and achieved state-of-the-art performance on digit recognition tasks. Its architectural principles—local receptive fields, shared weights, and spatial subsampling—laid the foundation for modern CNN architectures that have revolutionized computer vision.
