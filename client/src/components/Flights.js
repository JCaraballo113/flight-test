import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Loader, Dimmer , Container} from 'semantic-ui-react';
import { connect } from 'react-redux'
import {fetchFlights} from '../actions/flightsActions'
import Flight from './Flight';

class Flights extends Component {
  componentDidMount() {
    this.props.fetchFlights()
  }

  renderFlights() {
    return this.props.flights.map(flight => <Flight key={flight.number} flight={flight} />)
  }

  renderContent() {
    const { flights } = this.props
    if(flights.length > 0) {
      return(
        <div style={{padding: '0px 10px'}}>
          {this.renderFlights()}
        </div>
      )
    }

    return(
      <Dimmer active ={true}>
          <Loader inverted indeterminate size="large" content="Loading Flights"/>
      </Dimmer>
    )
  }

  render() {
    return(
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

Flights.propTypes = {
  flights: PropTypes.array.isRequired
}

const mapStateToProps = ({ flights }) => ({flights})
const mapDispatchToProps = (dispatch) => ({
  fetchFlights: () => dispatch(fetchFlights)
})

export default connect(mapStateToProps,mapDispatchToProps)(Flights)