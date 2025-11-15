import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import type { User } from "../models/User"

interface CreateUserInput {
  createUserInput: {
    email: string
    username: string
    password: string
  }
}

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!){
    createUser(createUserInput: $createUserInput) {
      id
      username
      email
    }
  }
`

const useCreateUser = () => {
  return useMutation<User, CreateUserInput>(CREATE_USER)
}

export { useCreateUser }