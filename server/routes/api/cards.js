const router = require('express').Router();
const CardController = require('../../controllers/CardController');

router.get('/:id', CardController.findById);
router.put('/:id', CardController.update);
router.delete('/:id', CardController.drop);
router.post('/:id/comments', CardController.createComment);

module.exports = router;
