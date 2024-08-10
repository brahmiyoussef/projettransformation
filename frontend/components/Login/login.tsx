import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import classes from './AuthenticationImage.module.css';
import logo from '../../Logo_AWB.svg';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append('client_id', 'asi');
      params.append('username', username);
      params.append('password', password);
      params.append('grant_type', 'password');

      const response = await axios.post('http://localhost:8080/realms/ASI/protocol/openid-connect/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const accessToken = response.data.access_token;
      Cookies.set('authToken', accessToken, { secure: true });
      // Redirect to home page
      router.push('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          
        </div>

        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Attijariwafa Bank!
        </Title>

        <form onSubmit={handleLogin}>
          <TextInput
            label="Username"
            placeholder="Your username"
            size="md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            classNames={{ input: classes['custom-input'] }} // Apply custom class here
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            classNames={{ input: classes['custom-input'] }} // Apply custom class here
          />
          <Checkbox
            label="Keep me logged in"
            mt="xl"
            size="md"
            classNames={{ input: classes['mantine-Checkbox-input'] }} // Apply custom class here
          />
          <Button fullWidth mt="xl" size="md" type="submit" style={{ backgroundColor: '#f8e8c6', color: '#ed5f49' }}>
            Login
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()} className={classes.link}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default Login;
