import { useState } from "react"
import { API_URL } from "../constants/urls"
import { client } from "../constants/apollo-clients"

export interface LoginRequest {
  email: string
  password: string
}

const useLogin = () => {
  const [error, setError] = useState('')

  const login = async (request: LoginRequest) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })

      if(!res.ok) {
        if(res.status === 401) {
          setError("Credentials are wrong")
          return
        }
        setError("Something gone wrong")
      }

      client.refetchQueries({ include: 'active' })
      setError("")
    } 
    catch(error) {
      setError('Unknown server error')
    }
  }

  return {
    error,
    login
  }
}

export {
  useLogin
}