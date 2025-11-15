import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { type Chat } from "../models/Chat"
import type { Message } from "../models/Message"
import { PAGE_SIZE } from "../constants/page-size"

export const GET_CHATS = gql`
  query Chats($offset: Int!, $limit: Int!) {
    chats(offset: $offset, limit: $limit) {
      id
      name
      latestMessage {
        content
        createdAt
        user {
          username
          imageUrl
        }
      }
    }
  }
`
const useGetChats = (offset: number = 0) => {
  return useQuery<{ chats: Chat[] }>(GET_CHATS, {
    variables: {
      offset,
      limit: PAGE_SIZE
    },
    notifyOnNetworkStatusChange: true
  })
}

export const updateChatsQuery = (
  client: any,
  newMessage: Message
) => {
  client.cache.updateQuery({ query: GET_CHATS }, (cachedData: any) => {
    if (!cachedData?.chats) return cachedData

    const updatedChats = cachedData.chats.map((chat: Chat) => {
      if (chat.id === newMessage.chatId) {
        return {
          ...chat,
          latestMessage: newMessage,
        }
      }
      return chat
    })

    return { chats: updatedChats }
  })
}

export { useGetChats }