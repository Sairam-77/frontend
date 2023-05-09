import { Badge, Button, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./movieDetails.css"
import { useNavigate } from "react-router-dom";
import HeadersComponent from "../../components/header/header";

const MovieDetails = () => {
  const [data,setData] = useState();
  const [loading,setLoading] = useState(false);
  console.log(loading);
  const s = useSelector((e) => e.seleted);
  const nav = useNavigate();
  useEffect(()=>{

    getMovieList();
    // eslint-disable-next-line
  },[])

  const getMovieList = async()=>{
    setLoading(true)
    setData(s.value)
    setLoading(false)
  }
 
 
  return <>
  <HeadersComponent/>
  <div  className="d-back">
   <Link to="/home">
    <Button color="dark"
    >Back</Button>
  </Link>
 </div>
  {data!==undefined&&<div className="details-main">
    <div className="main-poster">
        <div className="card-group">
            <div key={data._id} className="main-cards" >
                  
                <div className="card mb-3">
                    <img src={data.poster} className="card-img-top" alt="...poster"/>
                    <Text c={"dark"} fw={"bold"} size={"lg"} ta={"center"} >In Cinemas</Text>
                 </div>   
            </div>
        </div>
        <div className="text-details">
            <Title order={2}>{data.name}</Title>
            <span className='heart'><i className="fa-solid fa-heart"></i>&nbsp;{data.like}</span>
            <div style={{display:"flex",gap:"30px"}}>
                <p style={{fontSize:"18px"}} ><span style={{fontWeight:"bold"}}>'{data.type}' </span>Rated</p> 
                 <Badge size="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>2D</Badge>  
            </div>
            <div style={{display:"flex",gap:"20px"}}>
                <p style={{fontSize:"18px", fontWeight:""}} >{data.duration}</p>
                 {data.categories.map((e)=>{
                    return <Badge size="lg" variant="dot">{e}</Badge>
                    })} 
                 
            </div>
            <div style={{display:"flex",gap:"10px"}}>
                 <p style={{fontSize:"18px", fontWeight:"bold"}} >24 Mar,2023</p>
                 <Badge size="lg" variant="outline">{data.language[0]}</Badge>  
            </div>
            <div style={{display:"flex",gap:"20px"}}>
                 <Button color="red.7">
                  <a href={data.trailer} target="_blank" rel="noreferrer" style={{textDecoration:"none",color:"#fff"}}>
                  <i className="fa-solid fa-circle-play"></i> &nbsp;&nbsp;Trailer
                  </a>
                  </Button>
                 <Button
                 onClick={()=>{
                  nav('/booking')
                 }}
                 ><i className="fa-solid fa-ticket"></i>&nbsp; &nbsp;Book Now</Button>
            </div>
        </div>
    </div>
    <div className="about">
        <Title order={3} pb={10} mt={10}>About Movie</Title>
        <Text c={"dark.3"}>{data.about}</Text>
    </div>
  </div>
  }
  
  </>
};

export default MovieDetails;
