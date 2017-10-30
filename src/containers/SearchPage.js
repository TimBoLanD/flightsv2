import React, { Component } from 'react'
import SearchForm from './SearchForm'
import { fetchFlights } from '../actions/Flights'

class SearchPage extends Component {
	submit = (values, dispatch) => {
		dispatch(fetchFlights(values))
	}

	render() {
		return (
			<SearchForm onSubmit={this.submit}/>
		)
	}
}

export default SearchPage
