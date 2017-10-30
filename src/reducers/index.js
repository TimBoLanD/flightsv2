import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import airports from './Airports'
import flights from './Flights'


const rootReducer = combineReducers({
	flights,
	airports,
	form: formReducer
})

export default rootReducer
