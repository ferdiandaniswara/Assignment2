const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const userRoutes = require('./user');
const marketRoutes = require('./market');

const errorHandler = require('../middlewares/errorHandlers');

router.use('/users', userRoutes);
router.use(authentication);
router.use('/market', marketRoutes)

router.use(errorHandler);   

module.exports = router;

