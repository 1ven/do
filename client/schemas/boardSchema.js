import { Schema, arrayOf } from 'normalizr';
import listSchema from './listSchema';

const boardSchema = new Schema('boards', {
  defaults: {
    lists: [],
    starred: false,
    cardsLength: 0,
    listsLength: 0,
  },
});

boardSchema.define({
  lists: arrayOf(listSchema),
});

export default boardSchema;
