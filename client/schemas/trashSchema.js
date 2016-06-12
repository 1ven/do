import { Schema, arrayOf } from 'normalizr';

const trashSchema = new Schema('trash', {
  idAttribute: 'entryId',
});

export default trashSchema;
