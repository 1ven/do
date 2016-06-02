const router = require('express').Router();
const ListController = require('../../controllers/ListController');
const CardController = require('../../controllers/CardController');

router.put('/:id', ListController.update);
router.delete('/:id', ListController.drop);
router.post('/:id/cards', CardController.create);

module.exports = router;
