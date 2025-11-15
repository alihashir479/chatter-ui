import { Search } from "@mui/icons-material"
import { Box, Button, FormControlLabel, FormGroup, IconButton, InputBase, Modal, Paper, Stack, Switch, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useCreateChat } from "../../../hooks/useCreateChat"
import { useNavigate } from "react-router-dom"

interface ChatListAddProps {
  open: boolean,
  handleClose: () => void
}

const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
  const navigate = useNavigate()
  const [isPrivate, setIsPrivate] = useState(false)
  const [name, setName] = useState('')
  const [createChat] = useCreateChat()
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if(!isPrivate && !name.length) {
      setError('Chat name is required')
      return
    }
    try {
      const response = await createChat({
        variables: {
          createChatInput: {
            name,
            isPrivate
          }
        }
      })
      if(response.data) {
        navigate(`/chats/${response?.data?.createChat.id}`)
      }
      onClose()
    } catch(err) {
      console.log(err)
    }
  }

  const onClose = () => {
    setIsPrivate(false)
    setName('')
    setError('')
    handleClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: 'background.paper',
          border: "2px solid #000",
          boxShadow: 24,
          p: 4
        }}
      >
        <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          Add Chat
        </Typography>
        <FormGroup>
          <FormControlLabel
            style={{ width: 0 }}
            control={
              <Switch
                defaultChecked={isPrivate}
                value={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
            }
            label="Private"
          />
        </FormGroup>
        {
          isPrivate ? (
            <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
              <InputBase sx={{ m: 1, flex: 1 }} placeholder="Search Users" />
              <IconButton sx={{ p: '10px'}}>
                <Search />
              </IconButton>
            </Paper>
          ) : (
            <TextField 
              label="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!error}
              helperText="Chat name is required"
            />
          )
        }
        <Button variant="outlined" onClick={handleSubmit}>Save</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ChatListAdd