import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'

import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest,
  usersError
} from '../store/modules/users/actions'
import UsersList from './UsersList'
import NewUserForm from './NewUserForm'

class App extends React.Component {
  componentDidMount() {
    this.props.getUsersRequest()
  }

  handleOnSubmit = ({ firstName, lastName }) => {
    this.props.createUserRequest({ firstName, lastName })
  }

  handleOnDeleteUser = userId => {
    this.props.deleteUserRequest(userId)
  }

  handleCloseAlert = () => {
    this.props.usersError({ error: '' })
  }

  render() {
    const users = this.props.users
    return (
      <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
        <Alert
          color='danger'
          isOpen={!!this.props.users.error}
          toggle={this.handleCloseAlert}>
          {this.props.users.error}
        </Alert>
        <NewUserForm onSubmit={this.handleOnSubmit} />
        <UsersList users={users.items} onDeleteUser={this.handleOnDeleteUser} />
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => ({
  users
})

export default connect(
  mapStateToProps,
  { createUserRequest, getUsersRequest, deleteUserRequest, usersError }
)(App)
