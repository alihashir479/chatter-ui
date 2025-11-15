import { Avatar, Button, Stack, Typography } from "@mui/material"
import { useGetMe } from "../../hooks/useGetMe"
import { useRef } from "react"
import { useUploadProfile } from "../../hooks/useUploadProfile"

const Profile = () => {
  const { data, loading, error } = useGetMe()
  const fileUploadRef = useRef<HTMLInputElement | null>(null)
  if(loading) return <div>Fetching user details...</div>
  if(error) return <div>Unable to get user</div>

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if(!e.target.files || e.target.files.length === 0) return
      const file: File = e.target.files[0]
      const formdata = new FormData()
      formdata.append('file', file)
      await useUploadProfile(formdata)
      window.location.reload()
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Stack sx={{
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px'
    }}>
      <Typography variant="h1">{data?.getMe.username}</Typography>
      <Avatar src={data?.getMe.imageUrl} sx={{ width: 256, height: 256 }}></Avatar>
      <Button 
        variant="outlined"
        onClick={() => {fileUploadRef.current?.click() }}
      >
        Upload profile
    </Button>
      <input 
        type="file" 
        hidden 
        ref={fileUploadRef} 
        onChange={handleFileChange}
      />
    </Stack>
  )
}

export default Profile