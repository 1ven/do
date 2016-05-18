const router = require('express').Router();
const BoardController = require('../../controllers/BoardController');

router.get('/:id', BoardController.findById);
router.put('/:id', BoardController.update);
router.delete('/:id', BoardController.delete);
router.post('/:id/lists', BoardController.createList);

module.exports = router;
