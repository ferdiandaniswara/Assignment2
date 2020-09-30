const router = require('express').Router();
const townhallController = require('../controllers/townhallController');
const townhallAuth = require('../middlewares/townhallAuth');

router.get('/', townhallController.list);
router.post('/', townhallController.post);
router.get('/:id', townhallAuth, townhallController.get);

module.exports = router;