const router = require('express').Router();

const cards = require('./cards');
const lists = require('./lists');
const boards = require('./boards');
const users = require('./users');
const search = require('./search');
const activity = require('./activity');
const trash = require('./trash');

router.use('/search', search);
router.use('/cards', cards);
router.use('/lists', lists);
router.use('/boards', boards);
router.use('/activity', activity);
router.use('/trash', trash);
router.use(users);

module.exports = router;
