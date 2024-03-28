const router = require('express').Router();
const cartRouter = require('./cart.router');
const verifyToken = require('../middlewares/verifyToken');


router.use(verifyToken);
router.use('/cart', cartRouter);

module.exports = router;