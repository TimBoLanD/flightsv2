import fetch from 'isomorphic-fetch'
import * as types from '../types/Flights'
export const APIKEY = 'A0cvrUD3FvGNbSWJpxAdAkDPVsWBZm5w'

export function requestFlights(airport, date, daysAtDestination) {
	return {
		type: types.REQUEST_FLIGHTS,
		airport,
		date,
		daysAtDestination
	}
}

export function receiveFlights(airport, date, daysAtDestination, json) {
	return {
		type: types.RECEIVE_FLIGHTS,
		airport,
		date,
		daysAtDestination,
		flights: json.flightOffer,
		receivedAt: Date.now()
	}
}

export function fetchFlights(data) {
	return dispatch => {
		const ENDPOINT = 'https://api.transavia.com/v1/flightoffers/'

		let airport = data.airportField
		let periodStartDate = new Date(data.periodStartDate)
		let periodEndDate = new Date(data.periodEndDate)
		let daysAtDestination = data.daysAtDestination
                let lastPossibleDay = new Date(periodEndDate).setDate(periodEndDate.getDate() - daysAtDestination);

		for (var currentDay = periodStartDate; currentDay <= lastPossibleDay; currentDay.setDate(currentDay.getDate() + 1)) {
			let month = currentDay.getMonth() + 1
			month = (month < 10 ? '0' : '') + month
			let day = currentDay.getDate()
			day = (day < 10 ? '0' : '') + day 
			let date = "" + currentDay.getFullYear() + month + day;

			dispatch(requestFlights(airport, date, daysAtDestination))

			let request = new Request(ENDPOINT + `?
				Origin=${airport}&
				OriginDepartureDate=${date}&
				DaysAtDestination=${daysAtDestination}`, {
				headers: new Headers({
					'apikey': APIKEY
					})
				})

			fetch(request)
			.then(res => res.json())
			.then(json => dispatch(receiveFlights(airport, date, daysAtDestination, json)))
		}
	}
}
