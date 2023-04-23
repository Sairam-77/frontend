import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, rem, Title, Button, Avatar, Text, Menu, Image } from '@mantine/core';
import image from '../../assert/profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { logouts } from '../../redux/features/userSlice';
// import { IconChevronRight } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

 

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));


function HeadersComponent() {
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();
  const {value} = useSelector((e) => e.user);

  return (
    <Header height={60}>
      <Container className={classes.header}>
        <Title
        align="center"
        
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
       <span style={{color:"#228be6"}}>CINE</span>MAX
      </Title>
            {/* <Button variant="default">Log in</Button> */}
            <Menu width={200} shadow="md">
               <Menu.Target>
               <Button variant='default' size='md'>
                  <Group>
                <Avatar src={image} radius="xl" />
                {/* <Text>{value.userName}</Text> */}

                <div style={{ flex: 1 }}>
                  <Image src={"https://img.icons8.com/external-dreamstale-lineal-dreamstale/256/external-down-arrow-arrows-dreamstale-lineal-dreamstale-15.png"} width={12}/>
                </div>

                {/* {icon || <IconChevronRight size="1rem" />} */}
              </Group>
               </Button>
               </Menu.Target>

               <Menu.Dropdown>
                 <Menu.Label>Profile</Menu.Label>
                 <Menu.Item>{value.userName}</Menu.Item>
                 <Menu.Item>{value.email}</Menu.Item>
                 <Menu.Divider />
                <Menu.Item 
                 icon={<img src="https://img.icons8.com/color/35/null/ticket.png"/>}
                 >My Ticket</Menu.Item>
                 <Menu.Item 
                 onClick={()=>{
                  dispatch(logouts({value:false}))
                 }}
                 icon={<img src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/35/000000/external-logout-real-estate-kmg-design-detailed-outline-kmg-design.png"/>}
                 >Logout</Menu.Item>
               </Menu.Dropdown>
            </Menu>
      </Container>
    </Header>
  );
}

export default HeadersComponent;