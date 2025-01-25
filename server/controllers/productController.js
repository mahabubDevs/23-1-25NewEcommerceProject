// const product = require('../models/Product');

// const createProduct = async (req, res) => {
//     try {
//         console.log(req.body);
//         res.status(201).json({ msg: 'Product created successfully' });
//     }catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const getProducts = async (req, res) => {
//     try {
//         const products = await product.find();
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
// const updateProduct = async (req, res) => {
//     res.status(200).json({ msg: 'Product updated successfully' });
// }
// const deleteProduct = async (req, res) => {
//     res.status(200).json({ msg: 'Product deleted successfully' });
// }

// module.exports = {
//     createProduct,
//     getProducts,
//     updateProduct,
//     deleteProduct
// };


const product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, image, brand } = req.body;

        // সব ফিল্ড যাচাই
        if (!name || !price || !description || !category ) {
            return res.status(400).json({ message: 'সব ফিল্ড পূরণ করা আবশ্যক।' });
        }

        // নতুন প্রোডাক্ট তৈরি এবং সেভ করা
        const newProduct = new product({
            name,
            price,
            description,
            category,
        });

        await newProduct.save(); // ডাটাবেজে প্রোডাক্ট সেভ

        res.status(201).json({ msg: 'প্রোডাক্ট সফলভাবে তৈরি হয়েছে।', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'প্রোডাক্ট তৈরি করতে সমস্যা হয়েছে।', error: error.message });
    }
};


const getProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProduct = await product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProduct = await product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
};
