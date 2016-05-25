const router = require('express').Router();

const cards = require('./cards');
const lists = require('./lists');
const boards = require('./boards');
const users = require('./users');

router.use('/cards', cards);
router.use('/lists', lists);
router.use('/boards', boards);
router.use(users);

module.exports = router;
