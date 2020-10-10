const router = require('express').Router();
const AttackController = require('../controllers/attackController')

router.post('/:id', AttackController.attack);

module.exports = router;
