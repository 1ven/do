exports.ensureLoggedIn = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/sign-in');
    }
    next();
};

exports.ensureLoggedOut = function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
};
