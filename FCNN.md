# Fully Connected Neural Network (FCNN): A Mathematical Explanation

Fully Connected Neural Networks (FCNNs), also known as Dense or Feedforward Neural Networks, are the most fundamental type of artificial neural networks. This document provides a comprehensive mathematical explanation of FCNNs, covering their structure, forward propagation, backward propagation, and optimization processes.

## 1. Network Architecture

A FCNN consists of an input layer, one or more hidden layers, and an output layer. Each layer is composed of neurons (or nodes), with every neuron in a layer connected to all neurons in the adjacent layers.

Let's denote:
- $L$: The total number of layers in the network (including input and output layers)
- $n^{[l]}$: Number of neurons in layer $l$, where $l \in \{0, 1, 2, ..., L-1\}$
- $n^{[0]}$: Number of input features
- $n^{[L-1]}$: Number of output neurons

## 2. Mathematical Representation

### 2.1 Parameters

For each layer $l \in \{1, 2, ..., L-1\}$:
- $W^{[l]} \in \mathbb{R}^{n^{[l]} \times n^{[l-1]}}$: Weight matrix connecting layer $l-1$ to layer $l$
- $b^{[l]} \in \mathbb{R}^{n^{[l]}}$: Bias vector for layer $l$

The element $W^{[l]}_{ij}$ represents the weight from neuron $j$ in layer $l-1$ to neuron $i$ in layer $l$.

### 2.2 Activation Functions

Common activation functions include:

1. **Sigmoid**: $\sigma(z) = \frac{1}{1 + e^{-z}}$
2. **Hyperbolic Tangent (tanh)**: $\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}$
3. **Rectified Linear Unit (ReLU)**: $\text{ReLU}(z) = \max(0, z)$
4. **Leaky ReLU**: $\text{LeakyReLU}(z) = \max(\alpha z, z)$, where $\alpha$ is a small constant
5. **Softmax** (often used in the output layer for classification):
   $\text{softmax}(z)_i = \frac{e^{z_i}}{\sum_{j=1}^{n} e^{z_j}}$

We'll denote the activation function for layer $l$ as $g^{[l]}$.

## 3. Forward Propagation

Forward propagation is the process of computing the network's output given an input. For an input vector $x \in \mathbb{R}^{n^{[0]}}$:

1. Set $a^{[0]} = x$ (the input)
2. For each layer $l \in \{1, 2, ..., L-1\}$:
   a. Compute the pre-activation: $z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$
   b. Apply the activation function: $a^{[l]} = g^{[l]}(z^{[l]})$

The final output is $a^{[L-1]}$.

### 3.1 Matrix Formulation for Batch Processing

For a batch of $m$ inputs $X \in \mathbb{R}^{n^{[0]} \times m}$, where each column represents one input sample:

1. Set $A^{[0]} = X$
2. For each layer $l \in \{1, 2, ..., L-1\}$:
   a. $Z^{[l]} = W^{[l]} A^{[l-1]} + b^{[l]}$, where $b^{[l]}$ is broadcasted
   b. $A^{[l]} = g^{[l]}(Z^{[l]})$

The final output is $A^{[L-1]} \in \mathbb{R}^{n^{[L-1]} \times m}$.

## 4. Loss Functions

The loss function measures how well the network performs. Common loss functions include:

1. **Mean Squared Error (MSE)** for regression:
   $J = \frac{1}{m} \sum_{i=1}^{m} \|y^{(i)} - \hat{y}^{(i)}\|^2$

2. **Binary Cross-Entropy** for binary classification:
   $J = -\frac{1}{m} \sum_{i=1}^{m} [y^{(i)} \log(\hat{y}^{(i)}) + (1-y^{(i)}) \log(1-\hat{y}^{(i)})]$

3. **Categorical Cross-Entropy** for multi-class classification:
   $J = -\frac{1}{m} \sum_{i=1}^{m} \sum_{j=1}^{n^{[L-1]}} y_j^{(i)} \log(\hat{y}_j^{(i)})$

Where:
- $m$ is the number of samples
- $y^{(i)}$ is the true label for the $i$-th sample
- $\hat{y}^{(i)} = a^{[L-1](i)}$ is the predicted output for the $i$-th sample

## 5. Backpropagation

Backpropagation is the algorithm used to compute gradients of the loss function with respect to the parameters of the network. These gradients are then used to update the parameters during optimization.

### 5.1 Gradient Computations

For a single training sample:

1. Compute the output error: $dL/da^{[L-1]} = \nabla_a J(a^{[L-1]}, y)$
2. For each layer $l$ from $L-1$ down to 1:
   a. Compute $dL/dz^{[l]} = dL/da^{[l]} \odot g^{[l]'}(z^{[l]})$, where $\odot$ is the element-wise product
   b. Compute the gradients:
      - $dL/dW^{[l]} = dL/dz^{[l]} \cdot (a^{[l-1]})^T$
      - $dL/db^{[l]} = dL/dz^{[l]}$
   c. Propagate to previous layer: $dL/da^{[l-1]} = (W^{[l]})^T \cdot dL/dz^{[l]}$

### 5.2 Matrix Formulation for Batch Processing

For a batch of $m$ samples:

1. Compute $dA^{[L-1]} = \nabla_A J(A^{[L-1]}, Y)$
2. For each layer $l$ from $L-1$ down to 1:
   a. $dZ^{[l]} = dA^{[l]} \odot g^{[l]'}(Z^{[l]})$
   b. $dW^{[l]} = \frac{1}{m} dZ^{[l]} \cdot (A^{[l-1]})^T$
   c. $db^{[l]} = \frac{1}{m} \sum_{i=1}^{m} dZ^{[l]}_i$
   d. $dA^{[l-1]} = (W^{[l]})^T \cdot dZ^{[l]}$

## 6. Optimization

The parameters of the network are updated using an optimization algorithm, most commonly some variant of gradient descent.

### 6.1 Gradient Descent

The update rule for gradient descent is:

$W^{[l]} := W^{[l]} - \alpha \cdot dW^{[l]}$
$b^{[l]} := b^{[l]} - \alpha \cdot db^{[l]}$

Where $\alpha$ is the learning rate.

### 6.2 Advanced Optimization Algorithms

Several advanced optimization algorithms improve upon basic gradient descent:

1. **Momentum**:
   - Introduces velocity terms $v_W^{[l]}$ and $v_b^{[l]}$ for each parameter
   - Update rules:
     - $v_W^{[l]} := \beta v_W^{[l]} + (1-\beta) dW^{[l]}$
     - $W^{[l]} := W^{[l]} - \alpha \cdot v_W^{[l]}$
     - Similarly for bias terms

2. **RMSProp**:
   - Maintains running averages of squared gradients
   - Update rules:
     - $s_W^{[l]} := \beta s_W^{[l]} + (1-\beta) (dW^{[l]})^2$
     - $W^{[l]} := W^{[l]} - \alpha \cdot \frac{dW^{[l]}}{\sqrt{s_W^{[l]}} + \epsilon}$
     - Similarly for bias terms

3. **Adam** (Adaptive Moment Estimation):
   - Combines momentum and RMSProp
   - Maintains both first and second moment estimates

## 7. Regularization Techniques

To prevent overfitting, several regularization techniques can be applied:

### 7.1 L2 Regularization

Adds a penalty term to the loss function:

$J_{regularized} = J + \frac{\lambda}{2m} \sum_{l=1}^{L-1} \|W^{[l]}\|_F^2$

Where $\|W^{[l]}\|_F^2$ is the squared Frobenius norm of the weight matrix.

### 7.2 Dropout

During training, randomly sets a fraction of neurons to zero:

$a^{[l]} = g^{[l]}(z^{[l]}) \odot d^{[l]}$

Where $d^{[l]}$ is a binary mask with entries drawn from a Bernoulli distribution with parameter $p$ (keep probability).

During testing, all neurons are kept, but their outputs are scaled by $p$ to maintain the same expected output magnitude.

### 7.3 Batch Normalization

Normalizes the activations of each layer for each mini-batch:

$\hat{z}^{[l]} = \frac{z^{[l]} - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}$
$\tilde{z}^{[l]} = \gamma \cdot \hat{z}^{[l]} + \beta$

Where:
- $\mu_B$ and $\sigma_B^2$ are the mean and variance of the mini-batch
- $\gamma$ and $\beta$ are learnable parameters
- $\tilde{z}^{[l]}$ replaces $z^{[l]}$ in the forward pass

## 8. Initialization Techniques

Proper weight initialization is crucial for effective training:

1. **Xavier/Glorot Initialization**:
   $W^{[l]} \sim \mathcal{U}\left[-\frac{\sqrt{6}}{\sqrt{n^{[l-1]} + n^{[l]}}}, \frac{\sqrt{6}}{\sqrt{n^{[l-1]} + n^{[l]}}}\right]$

2. **He Initialization** (for ReLU activations):
   $W^{[l]} \sim \mathcal{N}\left(0, \frac{2}{n^{[l-1]}}\right)$

## 9. Training Process

The complete training process involves:

1. **Initialization**: Initialize weights and biases
2. **Forward Propagation**: Compute network predictions
3. **Loss Computation**: Calculate the loss between predictions and true labels
4. **Backpropagation**: Compute gradients of the loss with respect to parameters
5. **Parameter Update**: Update weights and biases using an optimization algorithm
6. **Repeat**: Iterate steps 2-5 for multiple epochs until convergence

## 10. Computational Complexity

For a network with $L$ layers and $n$ neurons per layer (simplified assumption):

- Time complexity per forward/backward pass: $O(n^2 \times L)$
- Space complexity: $O(n^2 \times L)$ for parameters, $O(n \times L)$ for activations

## Conclusion

Fully Connected Neural Networks form the foundation of deep learning. While more complex architectures like CNNs and RNNs have been developed for specific tasks, understanding the mathematical underpinnings of FCNNs is essential for grasping more advanced neural network concepts. The interplay of forward propagation, loss computation, backpropagation, and parameter updates enables these networks to learn complex patterns from data.
