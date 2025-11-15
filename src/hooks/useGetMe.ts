import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { type User } from "../models/User"

const GET_ME = gql`
  query GetMe {
    getMe {
      id
      email
      username,
      imageUrl
    }
  }
`

const useGetMe = () => {
  return useQuery<{'getMe': User}>(GET_ME)
}

export { useGetMe }