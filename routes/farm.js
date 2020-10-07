const router = require('express').Router();
const farmController = require('../controllers/farmControllers');
const farmAuth = require('../middlewares/farmAuth');


router.get('/', farmController.list);
router.post('/', farmController.post);
router.get('/:id',farmAuth, farmController.get);
router.put('/:id',farmAuth, farmController.put);
router.delete('/:id',farmAuth, farmController.delete);

module.exports = router;