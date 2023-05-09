import React, { useEffect, useRef, useState } from "react";
import { Carousel } from '@mantine/carousel';
import HeadersComponent from "../../components/header/header";
import { Box, Button,  Flex, Image, Text, Title } from "@mantine/core";
import MovieService from "../../services/movie.service";
import "./home.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../../redux/features/selectedSlice";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';


const theme = {
  background: '#f5f8fb',
  headerBgColor: '#228be6',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#228be6',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


const Home = () => {

  const [list,setList] = useState();
  const [loading,setLoading] = useState(false);
  console.log(loading);
  const [data,setData] = useState();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // track whether chatbot is open
  const {value} = useSelector((e) => e.user);
  console.log(value);




  useEffect(()=>{
    getMovieList();
    ticketLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

//api
  const ticketLists=async()=>{
        setLoading(true)
        console.log("working");
        try {
            const res = await MovieService.ticketList(
            {
                where: { email:value.email }
            }
        )
        setList(res.data)
        setLoading(false)
        console.log("dbd",res.data);
        } catch (error) {
        setLoading(false)
        alert(error)
        }
        
  }

  
  const getMovieList = async()=>{
    setLoading(true)
    try {
      const res = await MovieService.getMovies();
    console.log(res);
    setLoading(false)
    setData(res)
    } catch (error) {
      setLoading(false)
    }
    
  }


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
                              nav('/booking')
                            }}>Book</Button>
          </Box>
        ),
        trigger:index!==3? `list-${index + 1}`:`3`,
       
      }
    })
  }

  const getTicketBot = (val) => {
    return list?.map((e, index) => {
      // console.log(e);
      return {
        id: `ticket-${index}`,
        // message: e.name,
        component:(
          <Box>
          <Image radius={"sm"} src={e.type} width={100} />
           <Button fullWidth onClick={()=>{
                              // dispatch(addMovie(e))
                              nav('/ticket')
                            }}>View Ticket</Button>
          </Box>
        ),
        trigger:index!==list.length-1? `ticket-${index + 1}`:`3`,
       
      }
    })
  }
  // getTicketBot(list);
  // console.log(data.length);

  //  const steps = 


  //  const toggleChatbot = () => {
  //     setIsOpen(!isOpen); // toggle isOpen state
  //  };




  //chatbot functions
  
  return <>
 
  <div>
     
       <div>
    
      {data&&list&&<ThemeProvider theme={theme}>
        
      <ChatBot
            floating={true}
            steps={[
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
                  { value: 3, label: 'Your Ticket', trigger: 'ticket-0' },
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
              ...getTicketBot(list),
              
  ]}
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
