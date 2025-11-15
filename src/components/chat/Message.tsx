import { Avatar, Grid, Paper, Stack, Typography } from "@mui/material"
import type { Message as MessageType } from "../../models/Message"

interface MessageProps {
  message: MessageType
}

const Message = ({ message }: MessageProps) => {
  return (
    <Grid container sx={{ marginBottom: '1rem', gap: '1rem' }}>
      <Grid columns={{ sm: 3, md: 1}}>
        <Stack alignItems='center' justifyContent='center'>
          <Avatar src={message.user.imageUrl} />
          <Typography variant="caption" textAlign='center'>
            {message.user.username}
          </Typography>
        </Stack>
      </Grid>
      <Grid columns={{ sm: 9, md: 11}}>
        <Stack>
          <Paper sx={{ 'width': 'max-content' }}>
            <Typography sx={{ padding: '1rem' }}>
              {message.content}
            </Typography>
          </Paper>
          <Typography variant="caption">
            { new Date(message.createdAt).toLocaleTimeString() }
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Message