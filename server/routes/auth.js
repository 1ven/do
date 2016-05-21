const router = require('express').Router();
const SignController = require('../controllers/SignController');

router.post('/sign-in/local', SignController.signInLocal);
router.post('/sign-out', SignController.signOut);

module.exports = router;
