const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const userRoutes = require('./user');
const marketRoutes = require('./market');
const barrackRoutes = require('./barrack')
const farmRoutes = require('./farm')
const errorHandler = require('../middlewares/errorHandlers');


router.use('/users', userRoutes);
router.use(authentication);
router.use('/market', marketRoutes)
router.use('/barrack', barrackRoutes)
router.use('/farm', farmRoutes)

router.use(errorHandler);   

module.exports = router;

