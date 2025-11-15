import { Container } from "@mui/material"
import { Navigate, Outlet } from "react-router-dom"
import { useGetMe } from "../../hooks/useGetMe"

const UnAuthLayout = () => {
  const { loading, data } = useGetMe()

  if(loading) return <div>Loading...</div>
  if(data) return (
    <Navigate to="/" replace />
  )
  return (
    <Container maxWidth="lg">
      <Outlet />
    </Container>
  )
}

export default UnAuthLayout