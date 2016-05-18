const router = require('express').Router();
const BoardController = require('../../controllers/BoardController');

router.post('/', BoardController.create);
router.get('/:id', BoardController.findById);
router.get('/', BoardController.findAll);
router.put('/:id', BoardController.update);
router.delete('/:id', BoardController.delete);
router.post('/:id/lists', BoardController.createList);

module.exports = router;
