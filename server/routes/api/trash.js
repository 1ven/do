const router = require('express').Router();
const TrashController = require('../../controllers/TrashController');

router.get('/:pageIndex', TrashController.find);
router.post('/restore/:entryId', TrashController.restore);

module.exports = router;
