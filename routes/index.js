const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const userRoutes = require('./user');
const townhallRoutes = require('./townhall');

const errorHandler = require('../middlewares/errorHandlers');

router.use('/users', userRoutes);
router.use(authentication);
router.use('/townhall', townhallRoutes)

router.use(errorHandler);   

module.exports = router;

