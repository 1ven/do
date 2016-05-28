const router = require('express').Router();
const FinderController = require('../../controllers/FinderController');

router.post('/', FinderController.find);

module.exports = router;
