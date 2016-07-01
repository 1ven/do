import { Schema, arrayOf } from 'normalizr';
import listSchema from './listSchema';

const boardSchema = new Schema('boards', {
  defaults: {
    lists: [],
    starred: false,
  },
});

boardSchema.define({
  lists: arrayOf(listSchema),
});

export default boardSchema;
