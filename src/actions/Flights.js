import fetch from 'isomorphic-fetch'
import * as types from '../types/Flights'
export const APIKEY = 'A0cvrUD3FvGNbSWJpxAdAkDPVsWBZm5w'

export function requestFlights(airport, date, daysAtDestination, adults, children) {
	return {
		type: types.REQUEST_FLIGHTS,
		airport,
		date,
		daysAtDestination,
		adults,
		children
	}
}

export function receiveFlights(airport, date, daysAtDestination, adults, children, json) {
	return {
		type: types.RECEIVE_FLIGHTS,
		airport,
		date,
		daysAtDestination,
		adults,
		children,
		flights: json.flightOffer,
		receivedAt: Date.now()
	}
}

function noFlights(airport, date, daysAtDestination, adults, children) {
	return {
		type: types.NO_FLIGHTS,
		airport,
		date,
		daysAtDestination,
		adults,
		children,
		receivedAt: Date.now()
	}
}
		
export function fetchFlights(data) {
	return dispatch => {
		const ENDPOINT = 'https://api.transavia.com/v1/flightoffers/'

		let airport = data.airportField
		let periodStartDate = new Date(data.periodStartDate)
		let periodEndDate = new Date(data.periodEndDate)
		let flightDuration = data.flightDuration
		let daysAtDestination = data.daysAtDestination
                let lastPossibleDay = new Date(periodEndDate).setDate(periodEndDate.getDate() - daysAtDestination)
		let adults = data.adults
		let children = data.children


		for (var currentDay = periodStartDate; currentDay <= lastPossibleDay; currentDay.setDate(currentDay.getDate() + 1)) {
			let month = currentDay.getMonth() + 1
			month = (month < 10 ? '0' : '') + month
			let day = currentDay.getDate()
			day = (day < 10 ? '0' : '') + day 
			let date = "" + currentDay.getFullYear() + month + day;

			dispatch(requestFlights(airport, date, daysAtDestination, adults, children))

			let request = new Request(ENDPOINT + `?
				Origin=${airport}&
				OriginDepartureDate=${date}&
				DaysAtDestination=${daysAtDestination}&
				Adults=${adults}&
				Children=${children}`, {
				headers: new Headers({
					'apikey': APIKEY
					})
				})

			fetch(request)
			.then(res => res.json())
			.then(json => dispatch(receiveFlights(airport, date, daysAtDestination, adults, children, json)))
			.then(data => dispatch(rateFlights(data.flights, flightDuration)))
			.catch(error => {
			/*	console.log('Request failed', error)*/
				dispatch(noFlights(airport, date, daysAtDestination, adults, children))
			})
		}
	}
}

export function rateFlights(data, flightDuration) {
	data.map(offer => {

//		console.log(offer)

		let score = 0;
		score += getScoreForFlightDuration(offer, flightDuration)
//		console.log(score)

		score += getScoreForArrivalTime(offer) 
//		console.log(score)
		
		score += getScoreForDepartureTime(offer) 
//		console.log(score)

		offer.score = score
	})

//	console.log(data)
	return {
		type: types.RESULT_FLIGHTS,
		result: data
	}
}

function getScoreForFlightDuration(offer, flightDuration) {
	flightDuration = flightDuration * 3600 * 1000
	return Math.abs(flightDuration - maxFlightDuration(offer)) / 10000
}

function maxFlightDuration(offer) {
	let inboundFlightDuration = calculateFlightDuration(offer.inboundFlight.departureDateTime, offer.inboundFlight.arrivalDateTime)
	let outboundFlightDuration = calculateFlightDuration(offer.outboundFlight.departureDateTime, offer.outboundFlight.arrivalDateTime)

	return Math.max(inboundFlightDuration, outboundFlightDuration)
}

function calculateFlightDuration(departureTime, arrivalTime) {
	return new Date(arrivalTime) - new Date(departureTime)
}

function getScoreForArrivalTime(offer) {
	let arrivalTime = new Date(offer.outboundFlight.arrivalDateTime)
	let timestamp = (arrivalTime.getHours() * 60) + arrivalTime.getMinutes();
	// timestamp 600 = 10.00 s'ochtend
	return Math.abs(timestamp - 600);
}

function getScoreForDepartureTime(offer) {
	let departureTime = new Date(offer.inboundFlight.departureDateTime)
	let timestamp = (departureTime.getHours() * 60) + departureTime.getMinutes();
	// timestamp 1320 = 22.00 s'avonds
	return Math.abs(timestamp - 1320);
}
