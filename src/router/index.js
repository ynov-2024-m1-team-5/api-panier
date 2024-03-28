const router = require('express').Router();
const cartRouter = require('./cart.router');


router.use('/cart', cartRouter);

module.exports = router;