import { arrayOf } from 'normalizr';
import boardSchema from './boardSchema';
import listSchema from './listSchema';
import cardSchema from './cardSchema';
import userSchema from './userSchema';
import commentSchema from './commentSchema';

export const BOARD = boardSchema;
export const BOARD_ARRAY = arrayOf(boardSchema);
export const LIST = listSchema;
export const LIST_ARRAY = arrayOf(listSchema);
export const CARD = cardSchema;
export const CARD_ARRAY = arrayOf(cardSchema);
export const USER = userSchema;
export const COMMENT = commentSchema;
