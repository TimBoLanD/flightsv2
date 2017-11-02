import { requestAirports, receiveAirports } from '../actions/Airports'
import * as types from '../types/Airports'

describe('actions', () => {
	it('should create an action to request airports', () => {
		const expectedAction = {
			type: types.REQUEST_AIRPORTS,
		}

		expect(requestAirports()).toEqual(expectedAction)
	})

	it('should create an action to receive airports', () => {
		const json = [{
			  "id": "ACE",
			  "name": "Arrecife (Lanzarote)",
			  "city": "Arrecife (Lanzarote)",
		}, {
			  "id": "AGA",
			  "name": "Agadir",
			  "city": "Agadir",
		}]

		const expectedAction = {
			type: types.RECEIVE_AIRPORTS,
			airports: json,
			receivedAt: expect.any(Number)
		}

		expect(receiveAirports(json)).toEqual(expectedAction)
	})
})
