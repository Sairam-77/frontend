import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { logins } from '../redux/features/userSlice';
import { setToken } from '../redux/features/tokenSlice';
import { useState } from 'react';

 function Login() {
  const nav = useNavigate();
  const [loading,setLoading]= useState(false);
  const dispatch = useDispatch();
  const handleSubmit =async(value)=>{
      setLoading(true)
      try {
        let data = {
            email:value.email,
            password:value.password,
          }

      let res = await AuthService.signIn(data);
      if(res.statusCode===201){
          notifications.show({
            title: `${res.message}`,
            message: 'success',
            color:"green"
          })
          // console.log();
          setLoading(false)
          dispatch(logins(res.details))
          dispatch(setToken(res.token))
          nav("/home");
      }
      
      } catch (error) 
      {
        notifications.show({
            title: `${error.response.data.message}`,
            message: 'Failed',
            color:"red"
          })
          setLoading(false)
      }
   }

    const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email:"",
      password: "",
    },
    initialErrors: {
      email:"",
      password: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value) ? null : "Please enter valid email"),
      password: (value) => (value.length < 8 ? "Password must have 8 characters" : null),
    },
  });
  return (
    <Container size={420} my={70}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 600 })}
      >
        Welcome back!
      </Title>
      

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
         <Title
        align="center"
        pb={20}
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
       <span style={{color:"#228be6"}}>CINE</span>MAX
      </Title>
      <form onSubmit={form.onSubmit((values) => {
                handleSubmit(values);
              })}>
        <TextInput label="Email" placeholder="you@mantine.dev" required  {...form.getInputProps("email")} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md"  {...form.getInputProps("password")} />
        <Button type='submit' fullWidth mt="xl" loading={loading}>
          Sign in
        </Button>
        </form>
        <Group position="apart" mt="lg">
          <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Link to="/register"> Create account</Link>
      </Text>
        </Group>
      </Paper>
    </Container>
  );
}

export default Login;
