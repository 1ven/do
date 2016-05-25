const router = require('express').Router();
const CardController = require('../../controllers/CardController');

router.put('/:id', CardController.update);
router.delete('/:id', CardController.drop);
router.get('/:id/comments', CardController.findComments);
router.post('/:id/comments', CardController.createComment);

module.exports = router;
