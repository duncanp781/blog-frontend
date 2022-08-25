import React from 'react'

export interface User {
  username: string;
  _id: string;
  token: string;
}

export const defaultUser: User = {
  username: '',
  _id: '',
  token: ''
}

export const UserContext = React.createContext<
  {user: User, setUser: ((arg0: User) => void)}
>({user: defaultUser, setUser: () => {}});