import { gql } from "@apollo/client"
import { useSubscription } from "@apollo/client/react"
import type { Message } from "../models/Message"
import { updateChatsQuery } from "./useGetChats"
import { client } from "../constants/apollo-clients"
import { GET_MESSAGES } from "./useGetMessages"
import { PAGE_SIZE } from "../constants/page-size"

const MESSAGE_CREATED = gql`
  subscription MessageCreated($chatIds: [Int!]!) {
    messageCreated(chatIds: $chatIds) {
      id,
      chatId,
      content,
      createdAt,
      user {
        email
        username
        imageUrl
      },
    }
  }
`
const useMessageCreated = (chatIds: number[]) => {
  return useSubscription<{'messageCreated': Message}>(MESSAGE_CREATED, {
    variables: { chatIds },
    onData: ({ data }) => {
      const newMessage = data.data?.messageCreated
      if(!newMessage) return

      updateChatsQuery(client, newMessage)

      client.cache.updateQuery(
        { query: GET_MESSAGES, variables: { chatId: newMessage.chatId, offset: 0, limit: PAGE_SIZE } },
        (cachedData: any) => {
          if (!cachedData?.messages) return cachedData
          return { messages: [ newMessage, ...cachedData.messages ] }
        })
    }
  })
}


export { 
  useMessageCreated
}