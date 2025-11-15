
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import type { Chat } from '../../../models/Chat';
import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ChatListItemProps {
  chat: Chat,
  selected: boolean
}

const ChatListItem = ({ chat, selected }: ChatListItemProps) => {
  const navigate = useNavigate()
  const handleChatItemClick = () => {
    navigate(`/chats/${chat.id}`)
  }
  return (
  <>
    <ListItem alignItems="flex-start" disablePadding>
      <ListItemButton onClick={handleChatItemClick} selected={selected}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={chat.latestMessage?.user.imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={chat.name}
          secondary={
            chat.latestMessage && (<>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                { chat?.latestMessage?.user?.username}
              </Typography>
              { " " + chat?.latestMessage?.content}
            </>
        )}
        />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
  </>
  )
}

export default ChatListItem