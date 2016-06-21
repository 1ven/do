import camelcaseKeysDeep from 'camelcase-keys-deep';
import qs from 'qs';
import { normalize } from 'normalizr';
import { headers } from '../constants/config';
import 'isomorphic-fetch';
import * as schemas from '../schemas';

const API_ROOT = process.env.NODE_ENV === 'test' ? 'http://localhost' : '';

function callApi(endpoint, schema, request) {
  if (request && request.body) {
    request.body = JSON.stringify(request.body);
  }

  const requestWithHeaders = {
    ...{ headers },
    ...request,
    credentials: 'same-origin',
  };

  return fetch(API_ROOT + endpoint, requestWithHeaders)
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        return Promise.reject(body);
      }

      const camelized = camelcaseKeysDeep(body.result || {});
      const receivedAt = Date.now();
      const { notification } = body;

      if (schema) {
        return {
          ...normalize(camelized, schema),
          notification,
          receivedAt,
        };
      }

      return {
        result: camelized,
        notification,
        receivedAt,
      };
    });
}

export default {
  fetchBoards() {
    return callApi('/api/boards', schemas.BOARD_ARRAY, {
      method: 'GET',
    });
  },
  fetchBoard(id) {
    return callApi(`/api/boards/${id}`, schemas.BOARD, {
      method: 'GET',
    });
  },
  createBoard(title) {
    return callApi('/api/boards', {
      board: schemas.BOARD,
      activity: schemas.ACTIVITY,
    }, {
      method: 'POST',
      body: {
        title,
      },
    });
  },
  removeBoard(id) {
    return callApi(`/api/boards/${id}`, {
      board: schemas.BOARD,
      trashItem: schemas.TRASH_ITEM,
      activity: schemas.ACTIVITY,
    }, {
      method: 'DELETE',
    });
  },
  updateBoard(id, props, params) {
    const queryString = params ? qs.stringify(params) : '';
    return callApi(`/api/boards/${id}?${queryString}`, {
      board: schemas.BOARD,
      activity: schemas.ACTIVITY,
    }, {
      method: 'PUT',
      body: props,
    });
  },
  createList(boardId, title) {
    return callApi(`/api/boards/${boardId}/lists`, {
      list: schemas.LIST,
      activity: schemas.ACTIVITY,
    }, {
      method: 'POST',
      body: {
        title,
      },
    });
  },
  removeList(id) {
    return callApi(`/api/lists/${id}`, {
        list: schemas.LIST,
        activity: schemas.ACTIVITY,
        trashItem: schemas.TRASH_ITEM,
    }, {
      method: 'DELETE',
    })
  },
  fetchActivity() {
    return callApi('/api/activity', schemas.ACTIVITY_ARRAY, {
      method: 'GET',
    });
  },
  fetchUser() {
    return callApi('/api/user', schemas.USER, {
      method: 'GET',
    });
  },
  fetchTrash(pageIndex) {
    return callApi(`/api/trash/${pageIndex}`, {
      trash: schemas.TRASH_ITEM_ARRAY,
    }, {
      method: 'GET',
    });
  },
  restoreEntry(entryId, table) {
    return callApi(`/api/trash/restore/${entryId}`, {
      board: schemas.BOARD,
      list: schemas.LIST,
      card: schemas.CARD,
    }, {
      method: 'POST',
      body: {
        table,
      },
    });
  },
  search(query) {
    return callApi('/api/search', null, {
      method: 'POST',
      body: {
        query,
      },
    });
  },
};
