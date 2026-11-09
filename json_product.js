import http from 'http';

const products = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // ========================================
    // POST - Add Product
    // ========================================
    if (method === 'POST' && url === '/products') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const newProduct = JSON.parse(body);

                products.push(newProduct);

                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Product added successfully',
                    data: newProduct
                }));

            } catch (error) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Invalid JSON'
                }));
            }
        });
    }

    // ========================================
    // GET - Get All Products
    // ========================================
    else if (method === 'GET' && url === '/products') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Products retrieved successfully',
            data: products
        }));
    }

    // ========================================
    // GET - Get Product By ID
    // ========================================
    else if (method === 'GET' && url.startsWith('/products/')) {
        const productId = parseInt(url.split('/')[2]);

        const product = products.find(
            p => p.productId === productId
        );

        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: 'Product not found'
            }));

            return;
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Product retrieved successfully',
            data: product
        }));
    }

    // ========================================
    // PUT - Update Product
    // ========================================
    else if (method === 'PUT' && url.startsWith('/products/')) {
        const productId = parseInt(url.split('/')[2]);

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const updatedProduct = JSON.parse(body);

                const productIndex = products.findIndex(
                    p => p.productId === productId
                );

                if (productIndex === -1) {
                    res.writeHead(404, {
                        'Content-Type': 'application/json'
                    });

                    res.end(JSON.stringify({
                        message: 'Product not found'
                    }));

                    return;
                }

                // Preserve the original productId
                products[productIndex] = {
                    productId: productId,
                    ...updatedProduct
                };

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Product updated successfully',
                    data: products[productIndex]
                }));

            } catch (error) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Invalid JSON'
                }));
            }
        });
    }

    // ========================================
    // DELETE - Delete Product
    // ========================================
    else if (method === 'DELETE' && url.startsWith('/products/')) {
        const productId = parseInt(url.split('/')[2]);

        const productIndex = products.findIndex(
            p => p.productId === productId
        );

        if (productIndex === -1) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: 'Product not found'
            }));

            return;
        }

        const deletedProduct = products.splice(productIndex, 1);

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Product deleted successfully',
            data: deletedProduct[0]
        }));
    }

    // ========================================
    // Invalid Route
    // ========================================
    else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Route not found'
        }));
    }
});

// ========================================
// Start Server
// ========================================
server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});