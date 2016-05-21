const router = require('express').Router();

const cards = require('./cards');
const lists = require('./lists');
const boards = require('./boards');

router.use('/cards', cards);
router.use('/lists', lists);
router.use('/boards', boards);

module.exports = router;
