import { arrayOf } from 'normalizr';
import boardSchema from './boardSchema';
import listSchema from './listSchema';
import cardSchema from './cardSchema';

export const BOARD = boardSchema;
export const BOARD_ARRAY = arrayOf(boardSchema);
export const LIST = listSchema;
export const LIST_ARRAY = arrayOf(listSchema);
export const CARD = cardSchema;
export const CARD_ARRAY = arrayOf(cardSchema);
