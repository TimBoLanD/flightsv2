import * as types from '../types/Airports'

function airports(
	state = {
		isFetching: false,
		didInvalidate: false,
		locations: []
	},
	action
) {
	switch(action.type) {
		case types.REQUEST_AIRPORTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			})
		case types.RECEIVE_AIRPORTS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				locations: action.airports,
				lastUpdated: action.receivedAt
			})
		default:
			return state

	}
}

export default airports
