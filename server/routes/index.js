const router = require('express').Router();
const SignController = require('../controllers/SignController');
const api = require('./api');
const auth = require('./auth');

router.use('/api', SignController.ensureSignedIn, api);
router.use('/auth', auth);

router.post('/sign-up', SignController.ensureSignedOut, SignController.signUp);

router.get('*', (req, res) => {
    res.render('index', {
        bundle: '/static/js/bundle.js'
    });
});

module.exports = router;
