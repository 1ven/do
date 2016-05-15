exports.isUnique = function (Model, prop) {
    console.log(Model);
    return function (value, next) {
        Model.count({ where: { [prop]: value } })
            .then(length => {
                const capitalized = prop[0].toLowerCase() + prop.substring(1);
                if (length) { return next(`${capitalized} is already in use`) }
                next();
            })
            .catch(next);
    };
};
