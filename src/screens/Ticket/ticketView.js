import React from "react";
import './style.css'
import caution from '../../assert/caution.gif'
import qr from '../../assert/qr.png'
import HeadersComponent from "../../components/header/header";
import { useEffect } from "react";
import MovieService from "../../services/movie.service";
import { useSelector } from "react-redux";
import { Box, Button, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TicketView = () => {
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(false)
    const nav = useNavigate();
    const user = useSelector((e) => e.user);
    useEffect(()=>{
        ticketList();
    },[])

    const ticketList=async()=>{
        setLoading(true)
        try {
            const res = await MovieService.ticketList(
            {
                where: { email:user.value.email }
            }
        )
        setList(res.data)
        setLoading(false)
        console.log(res);
        } catch (error) {
        setLoading(false)
        }
        
    }
  return <>
   <HeadersComponent/>
   <Box m={20} mx={40}>
    <Group position="apart">
        <Text fz={25} fw={500} >Your Tickets</Text>
        <Button onClick={()=>nav('/home')} >Back</Button>
    </Group>
    <div className='main-tickets'>
      {
        !loading&&list.length>0?list.map((e)=>{
          return <div className='ticket' key={e._id}>
              <div className='ticket-h'>
                <img src={e.type}  alt={e.name}/>
                <div className='t-detail'>
                  <h1>{e.name}</h1>
                  <p>Tamli, 2D</p>
                  <p>{e.showTime.split('&')[1]}</p>
                  <p>{e.date}</p>
                  <h1>CINEMAX : Chennai</h1>
                </div>
              </div>
              <div className='ticket-b'>
                <div className='b-1'>
                  <h1>{e.seats.length}</h1>
                  <p>Tickets</p>
                </div>
                <div className='b-2'>
                <p className='badge bg-primary mt-2'>Screen {e.screen}</p>
                <h1>FIRST CL - {e.seats.map(s=><>{s},</>)}</h1>
                </div>
              </div>
              <div className='qr-code'>
                <img src={qr} alt="qrcode"/>
                
                <p>Booking Id :<span>WRTNX3UD</span></p>
              </div>
              <div className='ticket-f'>
                <img src={caution} alt="caution"/>
                <p> This booking can be cancel and refund
                  75% cash as per cinema cancellation policy.
                </p>
              </div>
              
          </div>
          
        }):<div style={{height:"100vh",textAlign:"center",fontSize:"30px",paddingTop:"100px"}}>Tickects Not Available Book your Tickets Now!</div>
      }
      </div>
   </Box>
  </>
};

export default TicketView;
