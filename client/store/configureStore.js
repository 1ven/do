import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootSaga from '../sagas';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

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
