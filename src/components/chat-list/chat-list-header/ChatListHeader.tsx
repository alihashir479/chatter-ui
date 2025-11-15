import AddCircle from "@mui/icons-material/AddCircle"
import { AppBar, IconButton, Toolbar } from "@mui/material"

interface ChatListHeaderProps {
  handleAddClick: () => void
}

const ChatListHeader = ({ handleAddClick }: ChatListHeaderProps) => {
  return (
  <AppBar position="static" color="transparent">
    <Toolbar>
      <IconButton size="large" onClick={handleAddClick}>
        <AddCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
  )
}
export default ChatListHeader