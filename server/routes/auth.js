const router = require('express').Router();
const AuthController = require('../../controllers/AuthController');

router.post('/local', AuthController.signInLocal);

export.default = router;
