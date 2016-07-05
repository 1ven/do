const router = require('express').Router();

const cards = require('./cards');
const lists = require('./lists');
const boards = require('./boards');
const users = require('./users');
const search = require('./search');
const activity = require('./activity');
const comments = require('./comments');

router.use('/search', search);
router.use('/cards', cards);
router.use('/lists', lists);
router.use('/boards', boards);
router.use('/activity', activity);
router.use('/comments', comments);
router.use(users);

module.exports = router;
