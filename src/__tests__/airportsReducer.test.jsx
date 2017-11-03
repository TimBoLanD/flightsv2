import airports from '../reducers/Airports'
import * as types from '../types/Airports'

describe('airports reducer', () => {
	it('should return the REQUEST_AIRPORT state', () => {
		expect(
			airports([], {
				type: types.REQUEST_AIRPORT
			})
		).toEqual([
			{
				isFetching: true,
				didInvalidate: false
			}
		])
	})
/*
	it('should return the RECEIVE_AIRPORT state', () => {
		const locations = [{
			  "id": "ACE",
			  "name": "Arrecife (Lanzarote)",
			  "city": "Arrecife (Lanzarote)",
		}, {
			  "id": "AGA",
			  "name": "Agadir",
			  "city": "Agadir",
		}]
		const lastUpdated = 20171231

		expect(
			airports([{
				locations: locations,
				lastUpdated: lastUpdated
			}], {
				type: types.RECEIVE_AIRPORT,
			})
		).toEqual([
			{
				isFetching: false,
				didInvalidate: false,
				locations: locations,
				lastUpdated: lastUpdated 
			}
		])
	})
	*/
})
