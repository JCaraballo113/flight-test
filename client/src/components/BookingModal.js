import React, { Component } from 'react';
import { Button, Label, Modal, Icon, Input, Dropdown, Loader, Segment, Dimmer } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import axios from 'axios'

const bagOpts  = [ { key: '1', value: 1, text: 'One' }, { key: '2', value: 2, text: 'Two' }, { key: '3', value: 3, text: 'Three' }, { key: '4', value: 4, text: 'Four' }, { key: '5', value: 5, text: 'Five' }  ]

class BookingModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      bags: null,
      missingFields: false,
      modalOpen: false,
      error: '',
      loading: false,
      booked: false,
      confirmation: ''
    }

    this.triggerButton = (
      <Button onClick={this.handleOpen} animated='vertical'>
        <Button.Content hidden>Book</Button.Content>
        <Button.Content visible>
          <Icon name='plane' />
        </Button.Content>
      </Button>
    )
  }

  handleOpen = () => {
    this.setState({
      ...this.state,
      modalOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      first_name: '',
      last_name: '',
      bags: null,
      error: '',
      loading: false,
      missingFields: false,
      booked: false,
      confirmation: '',
      modalOpen: false
    })
  }


  handleNameChange = (field) => (event) => {
    this.setState({
      ...this.state,
      [field]: event.target.value
    })
  }

  handleBagCount = (event, { value }) => {
    this.setState({
      ...this.state,
      bags: value
    })
  }

  onSubmit = async () => {
    this.setState({
      ...this.state,
      missingFields: false,
      error: '',
      loading: false,
      booked: false
    })

    if(this.state.first_name === '') {
      this.setState({
        ...this.state,
        missingFields: true
      })
    }

    if(this.state.last_name === '') {
      this.setState({
        ...this.state,
        missingFields: true
      })
    }

    if(this.state.first_name !== '' && this.state.last_name !== '') {
      this.setState({
        ...this.state,
        loading: true
      }, async () => {
        const { first_name, last_name } = this.state
        const { data } = await axios.post('http://localhost:3000/book', {first_name, last_name })
        if(data.success) {
          this.setState({
            ...this.state,
            loading: false,
            booked: true,
            confirmation: data.confirmation
          })
        }
        else if(!data.success) {
          this.setState({
            ...this.state,
            loading: false,
            first_name: '',
            last_name: '',
            bags: null,
            error: data.message
          })
        }
        })
    }
  }

  renderModalContent = () => {
    if(!this.state.loading && this.state.confirmation !== '') {
      return(
        <React.Fragment>
          <p>Your flight has been successfully booked!</p>
          <p>Your confirmation number is: {this.state.confirmation}</p>
          <Button positive onClick={this.handleClose}>
            <Icon name="check" />
          </Button>
        </React.Fragment>
      )
    }
    else if(!this.state.loading && this.state.confirmation === '') {
      return(
         <React.Fragment>
          <Input  style={{marginRight: '10px'}} labelPosition='left' type='text' placeholder='John' onChange={this.handleNameChange('first_name')}>
              <Label basic>First Name</Label>
              <input/>
            </Input>
            <Input  style={{marginRight: '10px'}} labelPosition='left' type='text' placeholder='Doe' onChange={this.handleNameChange('last_name')}>
              <Label basic>Last Name</Label>
              <input/>
            </Input>
            <Dropdown style={{marginRight: '10px'}}  placeholder='Bags' clearable  selection options={bagOpts} onChange={this.handleBagCount} />
            <Button onClick={this.onSubmit} positive animated='horizontal'>
              <Button.Content hidden>Book!</Button.Content>
              <Button.Content visible>
                <Icon name='check' />
              </Button.Content>
            </Button>
            {this.state.missingFields? <p style={{color: '#db2828'}}>Missing fields! Please verify</p> : null}
            {this.state.error !== '' ? <p style={{color: '#db2828'}}>{this.state.error}</p> : null }
         </React.Fragment>
      )
    }

    return(
       <Dimmer active>
       <Loader inverted  indeterminate size="large" content="Booking Flight"/>
       </Dimmer>
    )
  }

  render() {
    return(
      <Modal open={this.state.modalOpen} trigger={this.triggerButton}>
        <Modal.Header>
          Book your Flight!
          <Icon style={{ position: 'absolute', right: '10px', cursor: 'pointer'}} onClick={this.handleClose} name="window close"></Icon>
          </Modal.Header>
        <Modal.Content>
         {this.renderModalContent()}
        </Modal.Content>
      </Modal>
    )
  }
}

BookingModal.propTypes = {
  flightNumber: PropTypes.string.isRequired
}

export default BookingModal