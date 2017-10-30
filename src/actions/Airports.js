import fetch from 'isomorphic-fetch'
import * as types from '../types/Airports'
export const APIKEY = 'A0cvrUD3FvGNbSWJpxAdAkDPVsWBZm5w'

export function requestAirports() {
	return {
		type: types.REQUEST_AIRPORTS
	}
}

export function receiveAirports(json) {
	return {
		type: types.RECEIVE_AIRPORTS,
		airports: json,
		receivedAt: Date.now()
	}
}

export function fetchAirports() {
	return dispatch => {
		dispatch(requestAirports())

		const ENDPOINT = 'https://api.transavia.com/v2/airports/'

		let request = new Request(ENDPOINT, {
			headers: new Headers({
				'apikey': APIKEY
			})
		})

		return fetch(request)
			.then(res => res.json())
			.then(json => dispatch(receiveAirports(json)))
	}
}
