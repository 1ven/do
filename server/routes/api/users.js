const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.get('/user', UserController.getData);

module.exports = router;
