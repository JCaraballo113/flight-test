import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Segment, Button, Icon } from 'semantic-ui-react';
import { getFormattedTime } from '../utils/time';
import BookingModal from './BookingModal';

export default class Flight extends Component {

  getFormattedTime
  render() {
    const { flight } = this.props
    return(
      <Segment>
        <h3>{flight.airline}</h3>
        <p>
          <Icon name="dollar sign"></Icon>
          {flight.cost}
        </p>
        <p>Departing from : {flight.departs.airport} at {getFormattedTime(flight.departs.when)}</p>
        <p>Arriving at: {flight.arrives.airport} at {getFormattedTime(flight.arrives.when)}</p>
        <BookingModal flightNumber={flight.number}/>
      </Segment>
    )
  }
}

Flight.propTypes = {
  flight: PropTypes.object.isRequired
}