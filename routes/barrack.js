const router = require('express').Router();
const barrackController = require('../controllers/barrackControllers');
const barrackAuth = require('../middlewares/barrackAuth');
const barrackmax = require('../middlewares/barrackmax')

router.get('/', barrackController.list);
router.post('/',barrackmax, barrackController.post);
router.get('/:id', barrackAuth, barrackController.get);
router.put('/:id', barrackAuth, barrackController.put);
router.delete('/:id', barrackAuth, barrackController.delete);
router.get('/:id/collect', barrackAuth, barrackController.collect)

module.exports = router;