import React from 'react'

export interface User {
  username: string;
  _id: string;
  token: string;
}

export const UserContext = React.createContext<
  {user: User | null, setUser: ((arg0: User | null) => void)}
>({user: null, setUser: () => {}});