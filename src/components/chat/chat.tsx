import { useParams } from "react-router-dom"
import { useGetChat } from "../../hooks/useGetChat"
import { Box, Divider, IconButton, InputBase, Paper, Stack } from "@mui/material"
import { useRef, useState, useEffect } from "react"
import { useCreateMessage } from "../../hooks/useCreateMessage"
import Send from "@mui/icons-material/Send"
import { useGetMessages } from "../../hooks/useGetMessages"
import MessageView from "./Message"
import type { Message as MessageType } from "../../models/Message"
import { PAGE_SIZE } from "../../constants/page-size"
import { useMessageCount } from "../../hooks/useMessageCount"
import InfiniteScroll from "react-infinite-scroll-component"

const Chat = () => {
  const params = useParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<MessageType[]>([])
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const chatId = params.id!
  const { data: chatData, error } = useGetChat(chatId)
  const [createMessage] = useCreateMessage(chatId)
  const { messagesCount, fetchMessagesCount } = useMessageCount(+chatId)
  const { data: messagesData, error: messagesError, fetchMore } = useGetMessages(
    { 
      chatId: Number(chatId),
      limit: PAGE_SIZE,
      offset: 0
    })

  useEffect(() => {
    fetchMessagesCount()
  }, [fetchMessagesCount])


  const handleSendMessage = async () => {
    try {
      await createMessage({
        variables: {
          createMessageInput: {
            content: message,
            chatId: parseInt(chatId)
          }
        }
      })
      clearMessageInput()
      scrollToBottom()
    } catch(err) {
      console.log(err)
    }
  }

  const clearMessageInput = () => {
    setMessage('')
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      if(chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }
    }, 50)
  }

  const loadMore = async () => {
    await fetchMore({
      variables: {
        offset: messages.length || 0,
        limit: PAGE_SIZE,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          messages: [...prev.messages, ...fetchMoreResult.messages],
        }
      },
    })
  }

  useEffect(() => {
    if(messagesData) {
      setMessages(messagesData.messages)
      if(messagesData.messages.length < PAGE_SIZE)
        scrollToBottom()
    }
  }, [messagesData, chatId])

  if(error || !chatData || messagesError) return <div>Error loading id</div>

  return (
    <Stack sx={{
      height: '100%',
      justifyContent: 'space-between'
    }}>
      <h1>{chatData.chat.name}</h1>
      <Box 
        id="scrollableMessageList"
        ref={chatContainerRef} 
        sx={{ maxHeight: '65vh', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse', }}
      >
        <InfiniteScroll
          dataLength={messages.length || 0}
          next={loadMore}
          hasMore={(messages.length || 0) < messagesCount}
          loader={<p style={{ textAlign: 'center' }}>Loading more...</p>}
          scrollableTarget="scrollableMessageList"
          inverse={true}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
        >
          {messages.map((message: MessageType) => (
            <MessageView message={message} key={message.id} />
          ))}
        </InfiniteScroll>
      </Box>
      <Paper sx={{
        p: '2px 4px',
        display: 'flex',
        justifySelf: 'flex-end',
        alignItems: 'center',
        width: '100%'
      }}>
        <InputBase 
          sx={{ ml: 1, flex: 1, width: '100%'}}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') handleSendMessage()
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical"/>
        <IconButton color="primary" sx={{ p: '10px' }} onClick={handleSendMessage}>
          <Send />
        </IconButton>
      </Paper>
    </Stack>
  )
}

export default Chat