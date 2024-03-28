const router = require('express').Router();
const cartController = require('../controller/cart.controller');
const verifyUser = require('../middlewares/verifyUser');


router.get('/:customer_id', verifyUser, cartController.getProductsInShoppingCart);
router.post('/createCart', cartController.createShoppingCart);
router.post('/:customer_id', cartController.createCartProduct);
router.delete('/:cartProductId', cartController.deleteCartProduct);
router.put('/:cartProductId', cartController.updateCartProduct);
router.get('/:customer_id/cart/:shoppingCartId', verifyUser, cartController.getAllCartProduct);

module.exports = router;