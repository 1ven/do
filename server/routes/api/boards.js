const router = require('express').Router();
const BoardController = require('../../controllers/BoardController');

router.post('/', BoardController.create);
router.get('/:id', BoardController.findById);
router.get('/', BoardController.findAllByUser);
router.put('/:id', BoardController.update);
router.delete('/:id', BoardController.drop);
router.post('/:id/lists', BoardController.createList);
router.post('/:id/star', BoardController.markAsStarred);
router.post('/:id/unstar', BoardController.markAsUnstarred);

module.exports = router;
