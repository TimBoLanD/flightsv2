import React from 'react'
import Flight from './Flight'
import { Icon, Segment } from 'semantic-ui-react'

const FlightOffer = ({flightOffer}) => (
	<div>
		<Flight data={flightOffer.outboundFlight} type='outboundFlight' />
		<Flight data={flightOffer.inboundFlight} type='inboundFlight' />
		
		<Segment attached='bottom' size='massive' textAlign='right'>
			<Icon name='euro' />{flightOffer.pricingInfoSum.totalPriceOnePassenger} / {flightOffer.pricingInfoSum.totalPriceAllPassengers}
		</Segment>
	</div>
)

export default FlightOffer
