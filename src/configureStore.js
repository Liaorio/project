import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { rootReducer } from './Root/rootReducer'

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(createLogger()),
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./Root/rootReducer', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore
