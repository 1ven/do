import { Schema, arrayOf } from 'normalizr';
import userSchema from './userSchema';

const commentSchema = new Schema('comments');

commentSchema.define({
    user: userSchema
});

export default commentSchema;
