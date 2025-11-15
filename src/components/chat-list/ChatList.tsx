import List from '@mui/material/List';
import ChatListItem from './chat-list-item/ChatListItem';
import { Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { useEffect, useState } from 'react';
import ChatListAdd from './chat-list-add/ChatListAdd';
import { useGetChats } from '../../hooks/useGetChats';
import type { Chat } from '../../models/Chat';
import { useLocation } from 'react-router-dom';
import { useMessageCreated } from '../../hooks/useMessageCreated';
import { useChatsCount } from '../../hooks/useChatCounts';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PAGE_SIZE } from '../../constants/page-size';

const ChatList = () => {
  const location = useLocation()
  const [chatAddModalVisible, setChatAddModalVisible] = useState(false)
  const { data, fetchMore } = useGetChats()
  useMessageCreated(data?.chats.map((chat) => chat.id) || [])

  const { totalChats, fetchTotalChats } = useChatsCount()

  useEffect(() => { 
    fetchTotalChats()
  }, [fetchTotalChats])

  const loadMore = async () => {
    await fetchMore({
      variables: {
        offset: data?.chats.length || 0,
        limit: PAGE_SIZE,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          chats: [...prev.chats, ...fetchMoreResult.chats],
        }
      },
    })
  }
  

  return (
    <>
    <ChatListAdd open={chatAddModalVisible} handleClose={() => setChatAddModalVisible(false)} />
    <Stack>
      <ChatListHeader handleAddClick={() => setChatAddModalVisible(true)} />
      <Divider />
      <InfiniteScroll
        dataLength={data?.chats?.length || 0}
        next={loadMore}
        hasMore={(data?.chats?.length || 0) < totalChats}
        loader={<p style={{ textAlign: 'center' }}>Loading more...</p>}
        scrollableTarget="scrollableChatList"
      >
        <List
          id="scrollableChatList"
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            height: '80vh',
            overflow: 'auto',
          }}
        >
          {data?.chats?.map((chat: Chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              selected={location.pathname === `/${chat.id}`}
            />
          ))}
        </List>
      </InfiniteScroll>

    </Stack>
    </>
  );
}

export default ChatList