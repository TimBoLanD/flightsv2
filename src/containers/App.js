import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/index'
import { Container } from 'semantic-ui-react'

import SearchPage from './SearchPage'
import ResultPage from './ResultPage'

const loggerMiddleware = createLogger()
const store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Container style={{ marginTop: '1em' }} text>
					<SearchPage />
					<ResultPage />
				</Container>
			</Provider>
		)
	}
}
