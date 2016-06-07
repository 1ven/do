import { Schema, arrayOf } from 'normalizr';
import commentSchema from './commentSchema';
import activitySchema from './activitySchema';

const cardSchema = new Schema('cards');

cardSchema.define({
  comments: arrayOf(commentSchema),
  activity: activitySchema,
});

export default cardSchema;
