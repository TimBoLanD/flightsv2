import React from 'react'
import { Grid, Header, Icon, Label, Message, Segment } from 'semantic-ui-react'

const Flight = ({data, type}) => (
	<div>
		<Header as='h5' attached='top'>
			<p>ID: {data.id}</p>
			<p>FlightNumber: {data.flightNumber}</p>
		</Header>
		<Segment attached>
			<Grid columns={2}>
				<Grid.Column>
					<p>{data.departureAirport.locationCode}</p>
					<p>{data.departureDateTime}</p>
				</Grid.Column>
				<Grid.Column>
					<p>{data.arrivalAirport.locationCode}</p>
					<p>{data.arrivalDateTime}</p>
				</Grid.Column>
			</Grid>
		</Segment>
		<Segment attached='bottom' textAlign='right' size='large'>
			<Icon name='euro' /> {data.pricingInfo.totalPriceOnePassenger}
		</Segment>
	</div>
)

export default Flight
