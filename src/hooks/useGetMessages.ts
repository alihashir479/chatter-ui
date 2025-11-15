import { useQuery } from "@apollo/client/react"
import type { Message } from "../models/Message"
import { gql } from "@apollo/client"

interface messageArgs {
  chatId: number
  offset: number
  limit: number
}

export const GET_MESSAGES = gql`
  query GetMessages($chatId: Int!, $offset: Int!, $limit: Int!) {
    messages(chatId: $chatId, offset: $offset, limit: $limit) {
      id
      content
      createdAt
      user {
        username
        imageUrl
      }
    }
  }
`

const useGetMessages = (messageArgs: messageArgs) => {
  const { chatId, limit, offset } = messageArgs
  return useQuery<{ messages: Message[] }>(GET_MESSAGES, {
    variables: {
      chatId,
      limit,
      offset
    }
  })
}

export { useGetMessages }