const boardsRoutes = require('./routes/boards-routes');
const listsRoutes = require('./routes/lists-routes');

module.exports = function(app) {
    const post = function(url, handler, method) {
        app.post(url, (req, res) => {
            handler(req.body)
            .then(data => res.status(200).json({
                success: true,
                data: data
            }))
            .catch(err => res.json({
                success: false,
                error: err.message || err
            }));
        });
    };

    boardsRoutes(post);
    listsRoutes(post);
};
