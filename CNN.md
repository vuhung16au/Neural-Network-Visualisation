# Convolutional Neural Networks (CNNs): A Mathematical Explanation

Convolutional Neural Networks (CNNs) are a specialized type of neural networks designed primarily for processing grid-like data such as images. This document provides a detailed mathematical explanation of CNNs.

## 1. Architecture Overview

A CNN typically consists of the following layers:
- Convolutional layers
- Pooling layers
- Fully connected layers

## 2. Convolutional Layer

The core building block of a CNN is the convolutional layer, which performs the convolution operation.

### 2.1 Mathematical Definition of Convolution

For a 2D input $I$ and a 2D kernel $K$, the discrete convolution operation is defined as:

$$(I * K)(i, j) = \sum_{m} \sum_{n} I(i+m, j+n) \cdot K(m, n)$$

In practice, CNNs use cross-correlation rather than true convolution:

$$(I * K)(i, j) = \sum_{m} \sum_{n} I(i-m, j-n) \cdot K(m, n)$$

### 2.2 Multi-channel Convolution

For an input with multiple channels (e.g., RGB image with 3 channels), the convolution operation is:

$$Z^{(l)}_{j} = \sum_{i=1}^{C_{in}} X^{(l-1)}_{i} * K^{(l)}_{i,j} + b^{(l)}_{j}$$

Where:
- $Z^{(l)}_{j}$ is the $j$-th feature map in layer $l$
- $X^{(l-1)}_{i}$ is the $i$-th channel of the input from the previous layer
- $K^{(l)}_{i,j}$ is the kernel connecting the $i$-th input channel to the $j$-th output channel
- $b^{(l)}_{j}$ is the bias term for the $j$-th output channel
- $C_{in}$ is the number of input channels

### 2.3 Padding and Stride

With input size $(H_{in}, W_{in})$, kernel size $(K_h, K_w)$, padding $(P_h, P_w)$, and stride $(S_h, S_w)$, the output dimensions are:

$$H_{out} = \lfloor\frac{H_{in} + 2P_h - K_h}{S_h} + 1\rfloor$$
$$W_{out} = \lfloor\frac{W_{in} + 2P_w - K_w}{S_w} + 1\rfloor$$

## 3. Activation Functions

After convolution, an activation function is applied element-wise. Common choices include:

### 3.1 ReLU (Rectified Linear Unit)

$$f(x) = \max(0, x)$$

### 3.2 Leaky ReLU

$$f(x) = \begin{cases}
x, & \text{if } x > 0 \\
\alpha x, & \text{if } x \leq 0
\end{cases}$$

Where $\alpha$ is a small positive constant.

### 3.3 Sigmoid

$$f(x) = \frac{1}{1 + e^{-x}}$$

## 4. Pooling Layers

Pooling reduces the spatial dimensions of feature maps.

### 4.1 Max Pooling

$$y_{i,j} = \max_{0 \leq m < k_h, 0 \leq n < k_w} x_{i \cdot s_h + m, j \cdot s_w + n}$$

Where $(k_h, k_w)$ is the pooling kernel size and $(s_h, s_w)$ is the stride.

### 4.2 Average Pooling

$$y_{i,j} = \frac{1}{k_h \cdot k_w} \sum_{m=0}^{k_h-1} \sum_{n=0}^{k_w-1} x_{i \cdot s_h + m, j \cdot s_w + n}$$

## 5. Fully Connected Layers

After several convolutional and pooling layers, the feature maps are flattened and fed into fully connected layers:

$$z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$$
$$a^{(l)} = f(z^{(l)})$$

Where:
- $W^{(l)}$ is the weight matrix
- $a^{(l-1)}$ is the activation from the previous layer
- $b^{(l)}$ is the bias vector
- $f$ is the activation function

## 6. Backpropagation in CNNs

The backpropagation algorithm computes gradients using the chain rule:

### 6.1 For Fully Connected Layers

$$\frac{\partial L}{\partial W^{(l)}} = \frac{\partial L}{\partial z^{(l)}} \cdot \frac{\partial z^{(l)}}{\partial W^{(l)}} = \delta^{(l)} \cdot (a^{(l-1)})^T$$
$$\frac{\partial L}{\partial b^{(l)}} = \frac{\partial L}{\partial z^{(l)}} = \delta^{(l)}$$
$$\frac{\partial L}{\partial a^{(l-1)}} = \frac{\partial L}{\partial z^{(l)}} \cdot \frac{\partial z^{(l)}}{\partial a^{(l-1)}} = (W^{(l)})^T \cdot \delta^{(l)}$$

Where:
- $\delta^{(l)} = \frac{\partial L}{\partial z^{(l)}}$ is the error term
- $L$ is the loss function

### 6.2 For Convolutional Layers

For the convolutional layer, the gradients are:

$$\frac{\partial L}{\partial K^{(l)}_{i,j}} = \sum_{m} \sum_{n} X^{(l-1)}_{i}(m, n) \cdot \delta^{(l)}_{j}(m, n)$$
$$\frac{\partial L}{\partial X^{(l-1)}_{i}} = \sum_{j} \delta^{(l)}_{j} * \text{rot180}(K^{(l)}_{i,j})$$

Where $\text{rot180}$ denotes rotating the kernel by 180 degrees.

## 7. Common Loss Functions

### 7.1 Cross-Entropy Loss (for Classification)

$$L = -\sum_{i=1}^{C} y_i \log(\hat{y}_i)$$

Where:
- $y_i$ is the true probability for class $i$
- $\hat{y}_i$ is the predicted probability for class $i$
- $C$ is the number of classes

### 7.2 Mean Squared Error (for Regression)

$$L = \frac{1}{N} \sum_{i=1}^{N} (y_i - \hat{y}_i)^2$$

Where:
- $y_i$ is the true value
- $\hat{y}_i$ is the predicted value
- $N$ is the number of samples

## 8. Optimization

Gradient-based optimization algorithms are used to update the weights:

### 8.1 Stochastic Gradient Descent (SGD)

$$W_{t+1} = W_t - \eta \nabla L(W_t)$$

Where:
- $W_t$ is the weight at iteration $t$
- $\eta$ is the learning rate
- $\nabla L(W_t)$ is the gradient of the loss function with respect to $W_t$

### 8.2 Adam Optimizer

$$m_t = \beta_1 m_{t-1} + (1 - \beta_1) \nabla L(W_t)$$
$$v_t = \beta_2 v_{t-1} + (1 - \beta_2) (\nabla L(W_t))^2$$
$$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}$$
$$\hat{v}_t = \frac{v_t}{1 - \beta_2^t}$$
$$W_{t+1} = W_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$$

Where:
- $m_t$ and $v_t$ are the first and second moment estimates
- $\beta_1$ and $\beta_2$ are hyperparameters (typically 0.9 and 0.999)
- $\epsilon$ is a small constant to prevent division by zero

## 9. Regularization Techniques

### 9.1 L2 Regularization (Weight Decay)

$$L_{reg} = L + \frac{\lambda}{2} \sum_{l} \|W^{(l)}\|_2^2$$

Where $\lambda$ is the regularization parameter.

### 9.2 Dropout

During training, randomly set a fraction $p$ of the input units to zero:

$$\tilde{a}^{(l)} = r^{(l)} \odot a^{(l)}$$

Where:
- $r^{(l)}$ is a binary mask with each element drawn from a Bernoulli distribution with parameter $1-p$
- $\odot$ denotes element-wise multiplication

During testing, weights are scaled: $W_{test} = (1-p) \cdot W_{train}$

## 10. Transfer Learning

Transfer learning utilizes pre-trained CNN models by:

1. Freezing convolutional layers: $\nabla L(W^{(l)}) = 0$ for $l \in \{1, 2, \ldots, k\}$ where $k$ is the number of layers to freeze
2. Fine-tuning fully connected layers or specific convolutional layers

This approach leverages learned features from large datasets for new tasks with limited data.

## Conclusion

CNNs have revolutionized computer vision tasks by automatically learning hierarchical feature representations. Their mathematical foundations combine principles from linear algebra, calculus, probability theory, and optimization. The key insight of CNNs—parameter sharing through convolutions—makes them particularly efficient for grid-structured data like images.
