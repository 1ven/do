const sanitize = require('../utils/sanitize');
const Comment = require('../models/Comment');

exports.create = (req, res, next) => {
  const userId = req.user.id;
  const cardId = req.params.id;
  const commentData = sanitize(req.body);

  return Comment.create(userId, cardId, commentData)
    .then(comment => {
      res.status(201).json({ result: comment });
    }, next);
};
