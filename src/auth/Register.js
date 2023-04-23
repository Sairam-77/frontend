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
import { useForm } from "@mantine/form";
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';


 function Register() {
   const nav = useNavigate();
   const handleSubmit =async(value)=>{
      
      try {
        let data = {
            email:value.email,
            password:value.password,
            userName:value.userName
          }
          // console.log(data);
      let res = await AuthService.signUp(data);
      if(res.statusCode===201){
          notifications.show({
            title: `${res.message}`,
            message: '',
            color:"green"
          })
          nav("/");
      }
      
      } catch (error) {
        notifications.show({
            title: `${error.response.data.message}`,
            message: '',
            color:"red"
          })
      }
   }

   const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      userName: "",
      email:"",
      password: "",
      confirmPassword:""

    },
    initialErrors: {
      userName: "",
      email:"",
      password: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value) ? null : "Please enter valid email"),
      password: (value) => (value.length < 8 ? "Password must have 8 characters" : null),
      confirmPassword:(value,values) => (value!== values.password ? "Password not match" : null)
    },
  });

  return (
    <Container size={420} my={70}>
    
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
      <span style={{color:"#228be6"}}>CINE</span>MAX
      </Title>
      <form onSubmit={form.onSubmit((values) => {
                handleSubmit(values);
              })}>
        <TextInput label="Name" placeholder="Your Name" required mt="md" {...form.getInputProps("userName")} />
        <TextInput label="Email" placeholder="you@example.com" required mt="md" {...form.getInputProps("email")}/>
        <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps("password")} />
        <PasswordInput label="Confirm Password" placeholder="Re-enter Password" required mt="md" {...form.getInputProps("confirmPassword")} />
       
        <Button type='submit' fullWidth mt="xl" disabled={!form.isValid()}>
          Sign Up
        </Button>
      </form>
         <Group position="apart" mt="lg">
          <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account?{' '}
        <Link to="/">Sign In</Link>
      </Text>
        </Group>
      </Paper>
    </Container>
  );
}

export default Register;
