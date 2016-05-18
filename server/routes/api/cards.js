const router = require('express').Router();
const CardsController = require('../../controllers/CardsController');

router.put('/:id', CardsController.update);
router.delete('/:id', CardsController.delete);

module.exports = router;
