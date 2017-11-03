import React from 'react'
import { Grid, Header, Icon, Label, Message, Segment } from 'semantic-ui-react'

const Flight = ({data, type}) => (
	<div>
		<Header as='h5' attached='top'>
			FlightNumber: {data.flightNumber}
		</Header>
		<Segment attached>
			<Grid columns={2}>
				<Grid.Column>
					<p>{data.departureAirport.locationCode}</p>
					<p>{new Date(data.departureDateTime).toDateString()}</p>
					<p>{new Date(data.departureDateTime).toTimeString()}</p>
				</Grid.Column>
				<Grid.Column>
					<p>{data.arrivalAirport.locationCode}</p>
					<p>{new Date(data.arrivalDateTime).toDateString()}</p>
					<p>{new Date(data.arrivalDateTime).toTimeString()}</p>
				</Grid.Column>
			</Grid>
		</Segment>
		<Segment attached='bottom' textAlign='right' size='large'>
			<Icon name='euro' /> {data.pricingInfo.totalPriceOnePassenger} / {data.pricingInfo.totalPriceAllPassengers}
		</Segment>
	</div>
)

export default Flight
