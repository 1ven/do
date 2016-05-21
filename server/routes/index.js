const router = require('express').Router();
const api = require('./api');

router.use('/api', api);
router.use('/auth', auth);

module.exports = router;
