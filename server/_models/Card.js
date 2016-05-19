const Card = {
    update(data) {
        const _data = _.pick(data, ['text']);

        const props = _.keys(_data).map(k => pgp.as.name(k)).join();
        const values = _.values(_data);

        return db.one(` UPDATE cards SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, text
        `, [id, props, values]);
    },

    drop(id) {
        return db.one(` DELETE FROM cards WHERE id = $1 RETURNING id
        `, [id]);
    }
};

const List = {
    createCard(listId, cardData) {
        return db.one(` INSERT INTO cards (text) VALUES $1 RETURNING id
        `, [cardData.text])
            .then(card => {
                return db.none(` INSERT INTO lists_cards VALUES ($1, $2) `, [listId, card.id])
                    .then(() => card.id);
            });
    }
};

const Board = {
    findById(id) {
        // include relations
        return db.one(`SELECT id, title FROM boards WHERE id = $1`);
    },

    findAll() {
        // include relations
        return db.any(`SELECT id, title FROM boards`);
    }

    create(data) {
        return db.one(`INSERT INTO boards (title) VALUES $1 RETURNING id, title`);
    }
};

module.exports = Card;
