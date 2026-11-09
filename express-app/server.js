import express from 'express';
const app = express();
app.use(express.json());
const Products = [];
// CREATE - Add Product
app.post("/Products", (req, res) => {
    const newProduct = req.body;
    Products.push(newProduct);
    res.status(201).json({
        message: "Product created successfully",
        data: newProduct
    });
});
// READ ALL - Get All Products
app.get("/Products", (req, res) => {
    res.status(200).json({
        message: "Data of Products fetched successfully",
        data: Products
    });
});
// READ ONE - Get Product by ID
app.get("/Products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = Products.find((pro) => pro.id === productId);
    if (product) {
        res.status(200).json({
            message: "Product details fetched successfully",
            data: product
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});
// UPDATE - Update Product by ID
app.put("/Products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const updateProduct = req.body;
    const productIndex = Products.findIndex(
        (prod) => prod.id === productId
    );
    if (productIndex !== -1) {
        Products[productIndex] = {
            ...Products[productIndex],
            ...updateProduct
        };
        res.status(200).json({
            message: "Product updated successfully",
            data: Products[productIndex]
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});
// DELETE - Delete Product by ID
app.delete("/Products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = Products.findIndex(
        (prod) => prod.id === productId
    );
    if (productIndex !== -1) {
        const deletedProduct = Products.splice(productIndex, 1)[0];
        res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});
// Start Server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});