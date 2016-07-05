const router = require('express').Router();
const CommentController = require('../../controllers/CommentController');

router.delete('/:id', CommentController.drop);

module.exports = router;
