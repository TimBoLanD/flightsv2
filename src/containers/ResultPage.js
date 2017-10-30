import React, { Component } from 'react'
import { connect } from 'react-redux'

class ResultPage extends Component {
	render() {
		const { flights } = this.props

		console.log(flights)
		if (flights) {

		}

		return (
			<div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { flights } = state

	return {
		flights
	}	
}

export default connect(mapStateToProps)(ResultPage)
