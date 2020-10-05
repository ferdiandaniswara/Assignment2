const router = require('express').Router();
const marketController = require('../controllers/marketController');
const marketAuth = require('../middlewares/marketAuth');

router.get('/', marketController.list);
router.post('/', marketController.post);
router.get('/:id', marketAuth, marketController.get);
router.put('/:id', marketAuth, marketController.put);
router.delete('/:id', marketAuth, marketController.delete);

module.exports = router;