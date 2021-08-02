const express = require('express');

const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/:user', cartController.getCartByUser);
router.post('/', cartController.createCart);
router.post('/alterQuant', cartController.alterProductQuantity);
router.post('/:user', cartController.moveToWishlist);
router.post('/placeOrder', cartController.placeOrder);
module.exports = router;