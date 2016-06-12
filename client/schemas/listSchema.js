import { Schema, arrayOf } from 'normalizr';
import cardSchema from './cardSchema';

const listSchema = new Schema('lists');

listSchema.define({
  cards: arrayOf(cardSchema),
});

export default listSchema;
