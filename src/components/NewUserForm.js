import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

export default class NewUserForm extends Component {
  state = {
    firstName: '',
    lastName: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    const { firstName, lastName } = this.state
    this.props.onSubmit({
      firstName,
      lastName
    })

    this.setState({
      firstName: '',
      lastName: ''
    })
  }

  handleInputChange = e => {
    const el = e.target
    this.setState({ [el.name]: el.value })
  }

  render() {
    const { firstName, lastName } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>First Name</Label>
          <Input
            placeholder='First Name'
            onChange={this.handleInputChange}
            name='firstName'
            value={firstName}
          />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input
            placeholder='Last Name'
            onChange={this.handleInputChange}
            name='lastName'
            value={lastName}
          />
        </FormGroup>
        <FormGroup>
          <Button block outline color='primary' type='submit'>
            Create
          </Button>
        </FormGroup>
      </Form>
    )
  }
}
