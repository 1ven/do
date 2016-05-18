const router = require('express').Router();
const CardController = require('../../controllers/CardController');

router.put('/:id', CardController.update);
router.delete('/:id', CardController.delete);

module.exports = router;
