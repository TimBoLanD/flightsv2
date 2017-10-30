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
			flights: json.flightOffer,
			receivedAt: Date.now()
		}

		expect(receiveFlights(airport, date, daysAtDestination, json)).toEqual(expectedAction)
	})
})

describe('flight async actions', () => {
	afterEach(() => {
		fetchMock.reset()
		fetchMock.restore()
	})

	it('creates RECEIVE_FLIGHTS when fetching flights has been done', () => {
		const requestData = {
			'airportField': 'AMS'
		}

		const expectedAction = [
			{ type: types.REQUEST_FLIGHTS },
			{ type: types.RECEIVE_FLIGHTS }
		]

		const store = mockStore()

		return store.dispatch(fetchFlights(requestData)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
