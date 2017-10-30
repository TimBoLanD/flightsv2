import * as types from '../types/Flights'

function flightsByDate(
	state = {
		isFetching: false,
		didInvalidate: false,
		flightOffers: []
	},
	action
) {
	switch(action.type) {
		case types.REQUEST_FLIGHTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			})
		case types.RECEIVE_FLIGHTS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				flightOffers: action.flights,
				lastUpdated: action.receivedAt
			})
		default:
			return state
	}
}

const flights = (state = [], action) => {
	switch(action.type) {
		case types.RECEIVE_FLIGHTS:
		case types.REQUEST_FLIGHTS:
			return Object.assign({}, state, {
				[action.date]: flightsByDate(state[action.date], action)
			})
		default:
			return state
	}
}

export default flights
