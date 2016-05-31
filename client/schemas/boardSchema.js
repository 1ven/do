import { Schema, arrayOf } from 'normalizr';
import listSchema from './listSchema';
import activitySchema from './activitySchema';

const boardSchema = new Schema('boards');

boardSchema.define({
    lists: arrayOf(listSchema),
    activity: activitySchema
});

export default boardSchema;
