import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Input, Message } from 'semantic-ui-react'
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

const InputField = props => (
	<Form.Input
		value={props.input.value}
		type={props.type}
		placeholder={props.placeholder}
		label={props.label}
		icon={props.icon}
		onChange={(param, data) => props.input.onChange(data.value)}
	/>
)

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
				<Field name='airportField' component={DropdownField} label='Departure airport' placeholder='Choose your departure airport' options={airportsOptions} validate={[ required ]} />
				<Field name='periodStartDate' component={InputField} type='date' label='Leave from' icon='calendar' validate={[ required ]} />
				<Field name='periodEndDate' component={InputField} type='date' label='Back on' icon='calendar' validate={[ required ]} />
				<Field name='daysAtDestination' component={InputField} type='number' label='Days at destination' validate={[ required ]} />
				<Button type="submit">Search</Button>
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
