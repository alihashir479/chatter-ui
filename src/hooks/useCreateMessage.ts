import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { type Message } from "../models/Message"
import { GET_MESSAGES } from "./useGetMessages"
import { updateChatsQuery } from "./useGetChats"
import { client } from "../constants/apollo-clients"
import { PAGE_SIZE } from "../constants/page-size"

interface CreateMessageInput {
  createMessageInput: {
    content: string
    chatId: number
  }
}

const CREATE_MESSAGE = gql`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      id,
      content,
      createdAt,
      chatId
      user {
        username
        imageUrl
      }
    }
  }
`

const updateGetMessgagesQuery = (client: any, newMessage: Message) => {
  client.cache.updateQuery(
    { query: GET_MESSAGES, variables: { chatId: newMessage.chatId, offset: 0, limit: PAGE_SIZE } },
    (cachedData: any) => {
      if (!cachedData?.messages) return cachedData
      
      return { messages: [ newMessage, ...cachedData.messages ] }
    })
}

const useCreateMessage = (chatId: string) => {
  return useMutation<{ 'createMessage': Message }, CreateMessageInput>(CREATE_MESSAGE, {
    refetchQueries: [
      {
        query: GET_MESSAGES,
        variables: { chatId: parseInt(chatId), offset: 0, limit: 0 }
      }
    ],
    onCompleted: (message) => {
      if(message){
        updateGetMessgagesQuery(client, message.createMessage)
        updateChatsQuery(client, message.createMessage)
      }
    }
  })
}

export { useCreateMessage }