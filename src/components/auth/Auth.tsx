import { Alert, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface AuthProps {
  submitBtnLabel: string,
  onSubmit: ({ email, password }: { email: string, password: string}) => Promise<void>,
  children: React.ReactNode,
  extraFields: React.ReactNode[],
  errors: string
}

const Auth = ({ submitBtnLabel, onSubmit, children, errors, extraFields }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Stack spacing={3} sx={{
      maxWidth: {
        md: '30%',
        sm: '70%'
      },
      justifyContent: 'center',
      margin: '0 auto',
      height: '100vh'
    }}>
      <TextField
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       variant="outlined"
       placeholder="Email"
      />
      {extraFields}
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        placeholder="Password"
      />
      { errors && (
        <Alert severity="error" sx={{mb: 2}}>
          {errors}
        </Alert>
      )}
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>{submitBtnLabel}</Button>
      {children}
    </Stack>
  );
};

export default Auth;
