const router = require('express').Router();
const SignController = require('../controllers/SignController');

router.post('/sign-in/local', SignController.ensureSignedOut, SignController.signInLocal);
router.post('/sign-out', SignController.ensureSignedIn, SignController.signOut);

module.exports = router;
