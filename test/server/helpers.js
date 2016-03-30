import db from 'server/db';
import { sql } from 'server/helpers';

export const recreateTables = () => {
    return db.query('DROP TABLE IF EXISTS boards, lists, cards')
        .then(() => db.tx(function() {
            return this.batch(
                [
                    db.query(sql('cards.sql')),
                    db.query(sql('lists.sql')),
                    db.query(sql('boards.sql'))
                ]
            );
        }));
};
