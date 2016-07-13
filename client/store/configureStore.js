import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootSaga from '../sagas';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const test = store => next => action => {
  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();

  console.log('ent', prevState.entities.boards === nextState.entities.boards);
  console.log('ids', prevState.pages.main.all.ids === nextState.pages.main.all.ids);
  return result;
}

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        logger
      ),
      DevTools.instrument()
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
