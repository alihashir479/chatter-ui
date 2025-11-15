import { Link } from "react-router-dom"
import Auth from "./Auth"
import { Link as MuiLink } from "@mui/material"
import { useLogin, type LoginRequest } from "../../hooks/useLogin"

const Login = () => {
  const { login, error } = useLogin()
  const submit = async (loginRequest: LoginRequest) => {
    await login(loginRequest)
  }
  return (
    <Auth submitBtnLabel="Login" onSubmit={submit} errors={error}>
      <MuiLink component={Link} to="/auth/signup" underline="hover">
        Sign up
      </MuiLink>
    </Auth>
  )
}
export default Login