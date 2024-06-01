// src/components/LoginPage.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = ({ username, password }) => {
    login(username, password);
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" {...register('username')} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register('password')} />
        </FormControl>
        <Button mt={4} type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default LoginPage;
