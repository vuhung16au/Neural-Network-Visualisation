# AlexNet: A Mathematical Explanation

AlexNet is a groundbreaking Convolutional Neural Network (CNN) architecture introduced by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton in 2012 in their paper "ImageNet Classification with Deep Convolutional Neural Networks". This architecture achieved a significant performance improvement on the ImageNet challenge, reducing the top-5 error rate from 26% to 15.3%, which helped spark renewed interest in deep neural networks for computer vision tasks.

## Architecture Overview

AlexNet consists of 8 layers:
- 5 convolutional layers
- 3 fully connected layers

The network contains approximately 60 million parameters and 650,000 neurons.

## Mathematical Details of Each Layer

### Input Layer
- Input: RGB images of size 227×227×3 
  - Note: The original paper mentioned 224×224×3, but the actual implementation used 227×227×3

### Layer 1: Convolutional Layer with ReLU Activation
- **Filter Size**: 11×11
- **Stride**: 4
- **Number of Filters**: 96
- **Output Size**: 55×55×96
- **Mathematical Operation**:
  - For each filter $W_k$ and bias $b_k$:
  - $a_k^{(1)}(i,j) = (W_k * x)(i,j) + b_k$ 
  - $z_k^{(1)}(i,j) = \text{ReLU}(a_k^{(1)}(i,j)) = \max(0, a_k^{(1)}(i,j))$
  - Where $*$ is the convolution operation

### Local Response Normalization (LRN) after Layer 1
- For each position $(i,j)$ and channel $k$:
  - $b_{i,j,k} = a_{i,j,k} / \left( k + \alpha \sum_{n=\max(0,k-n/2)}^{\min(N-1,k+n/2)} (a_{i,j,n})^2 \right)^\beta$
  - Where:
    - $N$ is the total number of kernels
    - $n$ is the size of the normalization window (set to 5 in AlexNet)
    - $k = 2$, $\alpha = 10^{-4}$, and $\beta = 0.75$ are hyperparameters

### Max Pooling after Layer 1
- **Filter Size**: 3×3
- **Stride**: 2
- **Output Size**: 27×27×96
- **Mathematical Operation**: 
  - $p_{i,j,k} = \max_{0 \leq m,n < 3} z_{2i+m,2j+n,k}^{(1)}$

### Layer 2: Convolutional Layer with ReLU Activation
- **Filter Size**: 5×5
- **Padding**: 2
- **Number of Filters**: 256
- **Output Size**: 27×27×256
- **Mathematical Operation**: 
  - $a_k^{(2)}(i,j) = (W_k * p)(i,j) + b_k$
  - $z_k^{(2)}(i,j) = \text{ReLU}(a_k^{(2)}(i,j)) = \max(0, a_k^{(2)}(i,j))$

### Local Response Normalization (LRN) after Layer 2
- Same formula as previous LRN layer

### Max Pooling after Layer 2
- **Filter Size**: 3×3
- **Stride**: 2
- **Output Size**: 13×13×256

### Layer 3: Convolutional Layer with ReLU Activation
- **Filter Size**: 3×3
- **Padding**: 1
- **Number of Filters**: 384
- **Output Size**: 13×13×384
- **Mathematical Operation**: Similar to previous convolutional layers

### Layer 4: Convolutional Layer with ReLU Activation
- **Filter Size**: 3×3
- **Padding**: 1
- **Number of Filters**: 384
- **Output Size**: 13×13×384

### Layer 5: Convolutional Layer with ReLU Activation
- **Filter Size**: 3×3
- **Padding**: 1
- **Number of Filters**: 256
- **Output Size**: 13×13×256

### Max Pooling after Layer 5
- **Filter Size**: 3×3
- **Stride**: 2
- **Output Size**: 6×6×256

### Flattening
- Transforms the 3D output of the last pooling layer into a 1D vector
- Output size: 9216 (= 6×6×256)

### Layer 6: Fully Connected Layer with ReLU Activation and Dropout
- **Neurons**: 4096
- **Mathematical Operation**:
  - $a^{(6)} = W^{(6)} \times \text{flatten}(p) + b^{(6)}$
  - $z^{(6)} = \text{ReLU}(a^{(6)}) = \max(0, a^{(6)})$
- **Dropout**: With probability 0.5, set output of each neuron to 0 during training
  - $\tilde{z}^{(6)} = z^{(6)} \odot \text{Bernoulli}(0.5)$
  - Where $\odot$ is element-wise multiplication

### Layer 7: Fully Connected Layer with ReLU Activation and Dropout
- **Neurons**: 4096
- **Mathematical Operation**:
  - $a^{(7)} = W^{(7)} \times \tilde{z}^{(6)} + b^{(7)}$
  - $z^{(7)} = \text{ReLU}(a^{(7)}) = \max(0, a^{(7)})$
- **Dropout**: With probability 0.5, set output of each neuron to 0 during training
  - $\tilde{z}^{(7)} = z^{(7)} \odot \text{Bernoulli}(0.5)$

### Layer 8: Fully Connected Layer (Output)
- **Neurons**: 1000 (corresponding to the 1000 ImageNet classes)
- **Mathematical Operation**:
  - $a^{(8)} = W^{(8)} \times \tilde{z}^{(7)} + b^{(8)}$
- **Softmax Activation**:
  - $z^{(8)}_i = \frac{e^{a^{(8)}_i}}{\sum_{j=1}^{1000} e^{a^{(8)}_j}}$
  - This converts the raw outputs to class probabilities

## Loss Function

AlexNet uses multinomial logistic regression as the loss function (also called cross-entropy loss):

$$L = -\sum_{i=1}^n \log\left(\frac{e^{a^{(8)}_{y_i}}}{\sum_{j=1}^{1000} e^{a^{(8)}_j}}\right)$$

Where:
- $n$ is the number of training examples
- $y_i$ is the correct class for the $i$-th example

## Regularization

AlexNet employs two main regularization techniques:

1. **Dropout** with probability 0.5 in the first two fully connected layers
2. **Data Augmentation**:
   - Random crops from 256×256 images to get 227×227 inputs
   - Horizontal reflections
   - RGB intensity alterations using PCA color augmentation

## Weight Initialization

Weights in each layer are initialized from a normal distribution with mean 0 and standard deviation 0.01.
Biases in the 2nd, 4th, and 5th convolutional layers, as well as all fully connected layers are initialized with constant 1.
Other layers have bias initialized with constant 0.

## Optimization

- **Optimizer**: Stochastic Gradient Descent (SGD) with momentum
- **Momentum**: 0.9
- **Batch Size**: 128
- **Learning Rate**: Initially 0.01, reduced by a factor of 10 when validation error rate stopped improving
- **Weight Decay**: 0.0005

## Network Splitting

A notable feature of the original AlexNet implementation was splitting the network across two GPUs due to memory constraints:
- The first, second, and fifth convolutional layers were split across two GPUs
- The third and fourth convolutional layers had cross-GPU connections
- The fully connected layers received inputs from both GPUs

This splitting is not a conceptual necessity of the architecture but was a practical implementation detail of the original work.

## Key Innovations

1. Use of ReLU activation functions instead of tanh or sigmoid, which helped mitigate the vanishing gradient problem
2. Use of dropout to reduce overfitting in the fully-connected layers
3. Overlapping pooling to reduce the size of the network while minimally reducing spatial resolution
4. Local Response Normalization (LRN) to aid generalization
5. Heavy use of data augmentation techniques

AlexNet's success demonstrated the effectiveness of deep convolutional neural networks for computer vision tasks and played a crucial role in the resurgence of interest in deep learning approaches.
