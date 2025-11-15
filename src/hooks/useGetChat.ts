import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { type Chat } from "../models/Chat"

const GET_CHAT = gql`
  query getChat($id: String!) {
    chat(id: $id) {
      id,
      name
    }
  }
`
const useGetChat = (id: string) => {
  return useQuery<{chat: Chat}>(GET_CHAT, {
    variables: { id }
  }) 
}

export { useGetChat }