const router = require('express').Router();
const CardController = require('../../controllers/CardController');

router.put('/:id', CardController.update);
router.delete('/:id', CardController.drop);

module.exports = router;
