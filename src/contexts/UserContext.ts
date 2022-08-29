import React from 'react'
import { User } from '../types/User';

export const defaultUser: User = {
  username: '',
  _id: '',
  token: ''
}

export const UserContext = React.createContext<
  {user: User, setUser: ((arg0: User) => void)}
>({user: defaultUser, setUser: () => {}});