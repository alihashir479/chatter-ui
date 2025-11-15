import { Link } from "react-router-dom"
import Auth from "./Auth"
import { Link as MuiLink, TextField } from "@mui/material"
import { useCreateUser } from "../../hooks/useCreateUser"
import { useState } from "react"
import { handleError } from "../../utils/errors"

const SignUp = () => {
    const [errors, setErrors] = useState('')
    const [username, setUsername] = useState('')
    const [createUser] = useCreateUser()
    const submit = async ({ email, password }: {email: string, password: string }) => {
      try {
        await createUser({
          variables: {
            createUserInput: {
              email,
              username,
              password
            }
          }
        })
        setErrors("")
      } catch(err) {
        setErrors(handleError(err))
      }
    }
  return(
    <Auth 
      submitBtnLabel="Sign up" 
      onSubmit={submit}
      errors={errors}
      extraFields={[
        <TextField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          placeholder="Username"
        />
      ]}
    >
      <MuiLink component={Link} to="/auth/login" underline="hover">
        Login
      </MuiLink>
    </Auth>
  )
}
export default SignUp