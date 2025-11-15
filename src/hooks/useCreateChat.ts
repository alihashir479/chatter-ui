import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { type Chat } from "../models/Chat"
import { GET_CHATS } from "./useGetChats"
import { PAGE_SIZE } from "../constants/page-size"

interface CreateChatInput {
  createChatInput: {
    name?: string
    isPrivate: boolean
    userIds?: number[]
  }
}

const CREATE_CHAT = gql`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      id,
      name,
      userId,
      userIds,
      isPrivate,
    }
  }
`
const useCreateChat = () => {
  return useMutation<{ createChat: Chat }, CreateChatInput>(CREATE_CHAT, {
    update: (cache, { data }) => {
      if (!data?.createChat) return

      // Read the existing chats from cache
      const existing = cache.readQuery<{ chats: Chat[] }>({
        query: GET_CHATS,
        variables: { offset: 0, limit: PAGE_SIZE }
      })

      if (!existing) return

      // Write the updated list back to the cache
      cache.writeQuery({
        query: GET_CHATS,
        variables: { offset: 0, limit: PAGE_SIZE },
        data: {
          chats: [{ ...data.createChat, latestMessage: null }, ...existing.chats]
        }
      })
    }
  })
}

export { useCreateChat }