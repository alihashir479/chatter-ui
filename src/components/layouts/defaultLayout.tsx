import { Container, Grid } from "@mui/material"
import { Navigate, Outlet } from "react-router-dom"
import { useGetMe } from "../../hooks/useGetMe"
import Header from "../header/Header"
import ChatList from "../chat-list/ChatList"

const DefaultLayout = () => {
  const { loading, error } = useGetMe()

  if(loading) return <div>Loading...</div>
  if(error) return (
    <Navigate to="/auth/login" replace />
  )

  return (
    <>
    <Header />
    <Grid container spacing={2}>
      <Grid size={3}>
        <ChatList />
      </Grid>
      <Grid size={9}>
        <Container maxWidth="lg" style={{ marginTop: '10px', height: '100%' }}>
          <Outlet />
        </Container>
      </Grid>
    </Grid>
    </>
  )
}

export default DefaultLayout