import React, { useEffect, useRef, useState } from "react";
import { Carousel } from '@mantine/carousel';
import HeadersComponent from "../../components/header/header";
import { Box, Button, Card, Flex, Grid, Image, Text, Title } from "@mantine/core";
import MovieService from "../../services/movie.service";
import "./home.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../../redux/features/selectedSlice";
import ChatBot from 'react-simple-chatbot';
import botImage from "../../assert/chartBot.svg"
import { ThemeProvider } from 'styled-components';


const theme = {
  background: '#f5f8fb',
  // fontFamily: 'Helvetica Neue',
  headerBgColor: '#228be6',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#228be6',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


const Home = () => {
//   const steps = [
//   {
//     id: 'welcome',
//     message: 'Welcome! Do you want to go to our website?',
//     trigger: 'website'
//   },
//   {
//     id: 'website',
//     options: [
//       { value: 'yes', label: 'Yes', trigger: () => <Redirect to="/website" /> },
//       { value: 'no', label: 'No', end: true }
//     ]
//   }
// ];

   

  const [data,setData] = useState();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // track whether chatbot is open
  const {value} = useSelector((e) => e.user);


  useEffect(()=>{
    getMovieList();
  },[])


  const getListBot = (val) => {
    return val?.map((e, index) => {
      return {
        id: `list-${index}`,
        // message: e.name,
        component:(
          <Box>
          <Image radius={"sm"} src={e.poster} width={100} />
           <Button fullWidth onClick={()=>{
                              dispatch(addMovie(e))
                              nav('/details')
                            }}>Book</Button>
          </Box>
        ),
        trigger:index!==3? `list-${index + 1}`:`3`,
       
      }
    })
  }

  // console.log(data.length);

   const steps = data&&[
              {
                id: '1',
                message: `Hi ${value.userName} , How can I help you ?`,
                trigger: '2',
              },
              {
                id: '2',
                options: [
                  { value: 1, label: 'List of Movies', trigger: 'list-0' },
                  { value: 2, label: 'Recommanded Movie', trigger: 'recommend' },
                ],
              },
              {
                id: '3',
                message:'This was helpful?',
                trigger: '3.5',
              },
              {
                id: '3.5',
                options: [
                  { value: 1, label: 'Yes', trigger: '4' },
                  { value: 2, label: 'No', trigger: '3.6' },
                ],
              },
              {
                id: '3.6',
                message:'Ok, will try Again! ',
                trigger: '2',
              },
              {
                id:'4',
                component:(
                  <Title order={4}>Thank you! Enjoy the Movie.</Title>
                ),
                end:true
              },
              ...getListBot(data),
              {
                id:'recommend',
                component:(
                  <Flex justify={"center"} align={"center"} direction={"column"}>
                  <Text fz={"lg"} >Recommended Movie</Text>
                  <Image radius={"sm"} src={data[0].poster} width={100} />
                  <Button mt={5} fullWidth onClick={()=>{
                                      dispatch(addMovie(data[0]))
                                      setIsOpen(false)
                                      nav('/details')
                                    }}>Book</Button>
                  </Flex>
                ),
                trigger:'3'
              },
  ]


   const toggleChatbot = () => {
      setIsOpen(!isOpen); // toggle isOpen state
   };



  const getMovieList = async()=>{
    const res = await MovieService.getMovies();
    console.log(res);
    setData(res)
  }

  //chatbot functions
  
  return <>
 
  <div>
     
       <div>
      {/* <button onClick={toggleChatbot}>Toggle Chatbot</button> */}

      {/* {isOpen && (
        // <div className="chatbot-container"  >
        //    <ThemeProvider theme={theme}>
        //    <ChatBot
        //     floating={true}
        //     steps={steps}

        //    />
        //    </ThemeProvider>
        // </div>
         
      )} */}
      {data&&<ThemeProvider theme={theme}>
      <ChatBot
            floating={true}
            steps={steps}
            opened={isOpen}
            onToggleFloating={() => setIsOpen(!isOpen)}
           />
      </ThemeProvider>}
      
    </div>
    </div>
  <HeadersComponent/>
     <Carousel
      // maw={1400}
      sx={{
        maxWidth:"100%"
      }}
      withIndicators
      height={300} 
    >
       <Carousel.Slide><Image src="https://assets-in.bmscdn.com/promotions/cms/creatives/1645432040233_web.jpg" /></Carousel.Slide>
      <Carousel.Slide><Image src="https://assets-in.bmscdn.com/promotions/cms/creatives/1648060359095_iplweebb.jpg" /></Carousel.Slide>
      <Carousel.Slide><Image src="https://assets-in.bmscdn.com/promotions/cms/creatives/1645432040233_web.jpg"/></Carousel.Slide>
    </Carousel>

    <h2 style={{paddingTop:"20px",paddingLeft:"20px"}}>Now Showing</h2>
    <div className="card-group">
      {data?data.map((e)=>{
        return <div key={e._id} className="main-cards" >
                  
                       <div className="card mb-3">
                        <img src={e.poster} className="card-img-top" alt="...poster"/>
                        <div className="card-body">
                            <h5 className="card-title">{e.name}</h5>
                            <p className="card-text">"{e.type}" Rated<span className='heart'><i className="fa-solid fa-heart"></i>&nbsp;{e.like}</span></p>
                            <div className="card-foot">
                            <p className=" text-muted">{e.language[0]}
                            </p>
                            <Button px={60} onClick={()=>{
                              dispatch(addMovie(e))
                              nav('/details')
                            }}>Book</Button>
                            </div>
                        </div>
                        </div> 
                      
                       
            </div>
      }):"Loading"}
   </div>
  </>;
};

export default Home;
