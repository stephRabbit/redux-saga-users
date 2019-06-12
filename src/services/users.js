import api from './api'

export const getUsers = () =>
  api.get('/users', {
    params: { limit: 1000 }
  })

export const createUser = ({ firstName, lastName }) =>
  api.post('/users', {
    firstName,
    lastName
  })

export const deleteUser = userId => api.delete(`/users/${userId}`)
