import { Schema, arrayOf } from 'normalizr';
import commentSchema from './commentSchema';

const cardSchema = new Schema('cards');

cardSchema.define({
    comments: arrayOf(commentSchema)
});

export default cardSchema;
