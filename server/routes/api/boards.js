const router = require('express').Router();
const BoardController = require('../../controllers/BoardController');
const ListController = require('../../controllers/ListController');

router.post('/', BoardController.create);
router.get('/:id', BoardController.findById);
router.get('/', BoardController.findAllByUser);
router.put('/:id', BoardController.update);
router.delete('/:id', BoardController.drop);
router.post('/:id/lists', ListController.create);

module.exports = router;
