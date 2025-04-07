import React, { useState } from 'react';

import { Box, } from '@mui/material';

import { Button,} from '@mui/material'
import { Container,} from '@mui/material'
import { Paper,} from '@mui/material'
import { Tab,
  Tabs,
} from '@mui/material'
import { TextField, } from '@mui/material'
import { Typography, } from '@mui/material'


import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object(
  {
  name: z.string().min(1, "Write name"),
  email: z.string().email("Write corrett email"),
  password: z.string().min(6, "write longer password"),
}
);

const loginSchema = z.object(
  {
  email: z.string().email("write corrcet email"),
  password: z.string().min(1, "must include password"),
}
)
;

type RegisterFormData = z.infer<typeof registerSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

const AuthForm: React.FC = () => {
  const [tab, setTab] = useState(0);
  const loginForm = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const handleLoginSubmit = (data: LoginFormData) => {
    console.log("Logging in:", data);
  };

  const handleRegisterSubmit = (data: RegisterFormData) => {
    console.log("Registering:", data);
  }
  ;

  return (
    <Box

      sx={{
        minHeight: '100vh',
        backgroundColor: tab === 0 ? '#e0f7fa' : '#fce4ec',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    }


    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4 }}>
          <Tabs value={tab} onChange={(e, val) => setTab(val)} centered>
            <Tab label="Login" />
            <Tab label="Create Account" />
          </Tabs>

          {tab === 0 ? (
            <>
              <Typography variant="h5" mt={2} align="center">Login</Typography>
              <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} noValidate>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  type="email"
                  {...loginForm.register('email')}
                  error={!!loginForm.formState.errors.email}
                  helperText={loginForm.formState.errors.email?.message}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  {...loginForm.register('password')}
                  error={!!loginForm.formState.errors.password}
                  helperText={loginForm.formState.errors.password?.message}
                />
                <Box textAlign="center" mt={3}>
                  <Button type="submit" variant="contained" color="primary">Login</Button>
                </Box>
              </form>
            </>


          ) : (
            <>
              <Typography variant="h5" mt={2} align="center">Create Account</Typography>
              <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} noValidate>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  {...registerForm.register('name')}
                  error={!!registerForm.formState.errors.name}
                  helperText={registerForm.formState.errors.name?.message}
                />


                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  type="email"
                  {...registerForm.register('email')}
                  error={!!registerForm.formState.errors.email}
                  helperText={registerForm.formState.errors.email?.message}
                />


                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  {...registerForm.register('password')}
                  error={!!registerForm.formState.errors.password}
                  helperText={registerForm.formState.errors.password?.message}
                />


                <Box textAlign="center" mt={3}>
                  <Button type="submit" variant="contained" color="secondary">Register</Button>
                </Box>
              </form>
            </>
          )
          }

        </Paper>
      </Container>
    </Box>

  );
};




export default AuthForm;
