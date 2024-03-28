const router = require('express').Router();
const cartController = require('../controller/cart.controller');

router.get('/:customer_id', cartController.getProductsInShoppingCart);
router.post('/createCart', cartController.createShoppingCart);
router.post('/:customer_id', cartController.createCartProduct);
router.delete('/:cartProductId', cartController.deleteCartProduct);
router.put('/:cartProductId', cartController.updateCartProduct);

module.exports = router;