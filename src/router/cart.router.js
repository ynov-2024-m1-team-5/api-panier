const router = require('express').Router();
const cartController = require('../controller/cart.controller');
const verifyUser = require('../middlewares/verifyUser');
const verifyToken = require('../middlewares/verifyToken');


router.get('/:customer_id', verifyToken, verifyUser, cartController.getProductsInShoppingCart);
router.post('/createCart', cartController.createShoppingCart);
router.post('/:customer_id', verifyToken, verifyUser, cartController.createCartProduct);
router.delete('/:cartProductId', verifyToken, verifyUser, cartController.deleteCartProduct);
router.put('/:cartProductId', verifyToken, verifyUser, cartController.updateCartProduct);
router.get('/:customer_id/cartProducts', verifyToken, verifyUser, cartController.getAllCartProduct);

module.exports = router;