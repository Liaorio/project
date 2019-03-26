import { createStore } from 'redux'
import { rootReducer } from '../Root/rootReducer'

const configureStore = preloadedState => {
	const store = createStore(
		rootReducer,
		preloadedState,
	)
	return store
}

export default configureStore