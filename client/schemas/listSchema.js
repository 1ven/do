import { Schema, arrayOf } from 'normalizr';
import cardSchema from './cardSchema';
import activitySchema from './activitySchema';

const listSchema = new Schema('lists');

listSchema.define({
  cards: arrayOf(cardSchema),
  activity: activitySchema,
});

export default listSchema;
