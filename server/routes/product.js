const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.post('/create', authenticate, createProduct);
router.get('/all', getProducts);
router.put('/update/:id',authenticate,updateProduct);
router.delete('/delete/:id',authenticate, deleteProduct);




module.exports = router;