import { requestFlights, receiveFlights, fetchFlights } from '../actions/Flights'
import * as types from '../types/Flights'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('flight actions', () => {
	it('should create an action to request flights', () => {
		const airport = 'AMS'
		const date = 20171231
		const daysAtDestination = 5

		const expectedAction = {
			type: types.REQUEST_FLIGHTS,
			airport,
			date,
			daysAtDestination
		}

		expect(requestFlights(airport, date, daysAtDestination)).toEqual(expectedAction)
	})

	it('should create an action to receive flights', () => {
		const airport = 'AMS'
		const date = 20171231
		const daysAtDestination = 5
		const adults = 1
		const children = 0
		const json = {
				"resultSet": {
					"count": 31
				},
				"flightOffer": [{
					"outboundFlight": {
						"id": "AMSLPA20171105HV5663"
					},
					"inboundFlight": {
						"id": "LPAAMS20171106HV5662"
					}
				}]
		}

		const expectedAction = {
			type: types.RECEIVE_FLIGHTS,
			airport,
			date,
			daysAtDestination,
			adults,
			children,
			flights: json.flightOffer,
			receivedAt: expect.any(Number)
		}

		expect(receiveFlights(airport, date, daysAtDestination, adults, children, json)).toEqual(expectedAction)
	})
})
