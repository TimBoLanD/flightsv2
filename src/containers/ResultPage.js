import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Label, Segment, Transition } from 'semantic-ui-react'
import FlightOffer from '../components/FlightOffer'

class ResultPage extends Component {

	getAirport(id) {
		const { airports } = this.props

		let result = airports.locations.filter((airport, index) => {
			return airport.id == id
		})

		return result[0]
	}

	render() {
		const { airports, flights } = this.props

		return (
			<div>
				<Transition.Group>
				{Object.keys(flights).map((item) => {
					let data = flights[item]

					if(data.lastUpdated && !data.isFetching) {
						return (
							data.flightOffers.map((offer, index) => {

								let from = this.getAirport(offer.outboundFlight.departureAirport.locationCode)
								let to = this.getAirport(offer.outboundFlight.arrivalAirport.locationCode)

								return (
									<Segment clearing padded>
										<Label attached='top' size='big' color='pink'>{from.name} ({from.country.name}) <Icon name='arrow right'/> {to.name} ({to.country.name})</Label>
										<FlightOffer flightOffer={offer}/>
										<Button as='a' href={offer.deeplink.href}  floated='right' positive>Book now!</Button>
									</Segment>
								)
							})
						)
					}
				})}
				</Transition.Group>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { airports, flights } = state

	return {
		airports,
		flights
	}	
}

export default connect(mapStateToProps)(ResultPage)
