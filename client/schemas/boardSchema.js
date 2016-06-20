import { Schema, arrayOf } from 'normalizr';
import listSchema from './listSchema';

const boardSchema = new Schema('boards', {
  defaults: {
    lists: [],
    listsLength: 0,
    cardsLength: 0,
    starred: false,
  },
});

boardSchema.define({
  lists: arrayOf(listSchema),
});

export default boardSchema;
