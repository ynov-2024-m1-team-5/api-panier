const router = require('express').Router();
const cartRouter = require('./cart.router');
const verifyToken = require('../middlewares/verifyToken');
const verifyUser = require('../middlewares/verifyUser');


router.use(verifyToken);
router.use(verifyUser);
router.use('/cart', cartRouter);

module.exports = router;