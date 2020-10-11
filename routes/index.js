const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const userRoutes = require('./user');
const marketRoutes = require('./market');
const barrackRoutes = require('./barrack')
const farmRoutes = require('./farm')
const townhallRoutes = require('./townhall')
const attackRoutes = require('./attack')
const errorHandler = require('../middlewares/errorHandlers');



router.use('/users', userRoutes);
router.use(authentication);
router.use(townhallRoutes);
router.use('/markets', marketRoutes);
router.use('/barracks', barrackRoutes);
router.use('/farms', farmRoutes);
router.use('/attacks', attackRoutes)

router.use(errorHandler);   

module.exports = router;

