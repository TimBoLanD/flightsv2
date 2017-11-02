import React, { Component } from 'react'
import { Segment, Label } from 'semantic-ui-react'
import SearchForm from './SearchForm'
import { fetchFlights } from '../actions/Flights'

class SearchPage extends Component {
	submit = (values, dispatch) => {
		dispatch(fetchFlights(values))
	}

	render() {
		return (
			<Segment padded>
				<Label attached='top' size='big' color='violet'>What does your trip look like?</Label>
				<SearchForm onSubmit={this.submit}/>
			</Segment>
		)
	}
}

export default SearchPage
