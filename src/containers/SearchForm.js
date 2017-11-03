import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Grid, Icon, Input, Message } from 'semantic-ui-react'
import { fetchAirports } from '../actions/Airports'

const DropdownField = props => (
	<Form.Dropdown
		selection {...props.input}
		value={props.input.value}
		placeholder={props.placeholder}
		label={props.label}
		options={props.options}
		onChange={(param, data) => props.input.onChange(data.value)}
		search selection
	/>
)

const InputField = (props) => {
/*		console.log(props)*/
		return (
			<Form.Input
				value={props.input.value}
				type={props.type}
				placeholder={props.placeholder}
				label={props.label}
				icon={props.icon}
				onChange={(param, data) => props.input.onChange(data.value)}
			/>
		)
}

const required = value => value ? undefined : 'Required'

class SearchForm extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchAirports())
	}

	render() {
		const { airports, handleSubmit } = this.props

		let airportsOptions = airports.locations.map(airport => {
			return {
				key: airport.id,
				value: airport.id,
				text: `${airport.name}, ${airport.country.name}`
			}
		})

		return (
			<Form onSubmit={handleSubmit}>
				<Grid stackable>
					<Grid.Row>
						<Grid.Column>
							<Field name='airportField' component={DropdownField} label='Departure airport' placeholder='Choose your departure airport' options={airportsOptions} validate={[ required ]} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row columns={2}>
						<Grid.Column>
							<Field name='periodStartDate' component={InputField} type='date' label='Leave from' icon='calendar' validate={[ required ]} />
						</Grid.Column>
						<Grid.Column>
							<Field name='periodEndDate' component={InputField} type='date' label='Back on' icon='calendar' validate={[ required ]} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row columns={2}>
						<Grid.Column>
							<Field name='flightDuration' component={InputField} type='number' label='Flightduration (hours)' validate={[ required ]} />
						</Grid.Column>
						<Grid.Column>
							<Field name='daysAtDestination' component={InputField} type='number' label='Days at destination' validate={[ required ]} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row columns={3}>
						<Grid.Column>
							<Field name='adults' component={InputField} type='number' label='Adults (>11 year)' validate={[ required ]} />
						</Grid.Column>
						<Grid.Column>
							<Field name='children' component={InputField} type='number' label='Children (2 - 11 year)' validate={[ required ]} />
						</Grid.Column>
						<Grid.Column>
							<Field name='babies' component={InputField} type='number' label='Babies (<2 year)' validate={[ required ]} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column textAlign='center'>
							<Button positive type="submit"><Icon name='search'/> Search</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Form>
		)
	}
}

SearchForm = reduxForm({
	form: 'search'
})(SearchForm)

function mapStateToProps(state) {
	const { airports } = state

	return {
		airports
	}
}

export default connect(mapStateToProps)(SearchForm)
