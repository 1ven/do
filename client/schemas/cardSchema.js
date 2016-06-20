import { Schema, arrayOf } from 'normalizr';
import commentSchema from './commentSchema';

const cardSchema = new Schema('cards', {
  defaults: {
    comments: [],
  },
});

cardSchema.define({
  comments: arrayOf(commentSchema),
});

export default cardSchema;
