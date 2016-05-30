const router = require('express').Router();
const ActivityController = require('../../controllers/ActivityController');

router.get('/', ActivityController.findLast);

module.exports = router;
