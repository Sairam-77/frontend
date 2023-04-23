import { Button, Group, Text, Title } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./Booking.css"
import MovieService from "../../services/movie.service";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";

const Booking = () => {
    const nav = useNavigate();
    const {value} = useSelector((e) => e.seleted);
    const [seatData,setSeatData] = useState(value);
    const [seats,setSeats] = useState(seatData.seats);
    const [indexData,setIndexData] = useState([]);
    const [confirm,setConfirm] = useState(false);
    const [open,setOpen] = useState(false);
    let [buget,setBuget] = useState(0);
    let [prime,setPrime]= useState(0);

    const data = Date().split(" ");
    const time =()=>{
        if(value.showTime[0]=="Morning"){
            return "9:10 AM"
        }else if(value.showTime[0]=="Noon"){
            return "12:45 PM"
        }else if(value.showTime[0]=="Evening"){
            return "4:50 PM"
        }else if(value.showTime[0]=="Night"){
            return "8:45 PM"
        }
    } 
    
    const confirmBooking = async(x)=>{
        let data = await MovieService.updateSeats(seatData.id,indexData,x);
        console.log(data);
    }
    const handleBooking=()=>{
        let x = [...seatData.seats]
        indexData.map((e)=>{
            let colCopy = x[e.rowId].s.map((c)=>({
                       ...c,cos:c.b===seats[e.rowId].s[e.colId].b?true:c.cos
                        }))
            let  seatsCopy = x.map((se,ind)=>({
                        ...se,s:se.n===seats[e.rowId].n?colCopy:se.s
                        }))

                        x = seatsCopy;
        })
        setSeatData({...seatData,seats:[...x]})   
        confirmBooking(x)
        
    }

    const billGenerate =()=>{
        console.log("hello");
        indexData.map((e)=>{
            if(e.row==="A"){
                // setBuget(buget++);
                console.log("a");
            }else{
                // setPrime(prime++);
                  console.log("b");
            }
        })
       
    }
    console.log("prime",prime,"low",buget);
  return <>
  {open&&<Alert setOpen={setOpen} open={open} setConfirm={setConfirm} title={"Confirm Seats to Move Payment Page ?"} type="seats" message={indexData} />}
  {seatData?<div className="booking-main">
    <header className="booking-head">
        <div className="c1">
            <i class="fa-solid fa-chevron-left fa-2xl"  onClick={()=>nav('/details')}></i>
            <Title
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
            <span style={{color:"#228be6"}}>CINE</span>MAX
            </Title>
        </div>
        <div className="c2">
            <Title order={2}>{seatData.name} . {seatData.language[0]}</Title> 
            <Text c={"gray.6"}>{`Today, ${+data[2]}, ${data[1]}, ${time()} at CINEMAX, Chennai`}</Text>
        </div>
       
    </header> 
    <div className="title-d">
        <div className="c1">
            <div>
                <Text fw={"500"} c={"gray"} fz="22px">{data[0]}</Text>
                <Text fw={"500"} fz={"24px"}>{`${data[2]} ${data[1]}`}</Text>
            </div>
            <div className="lab">
                <Title order={5}>{time()}</Title>
                <Text>2D</Text>
            </div>

        </div>
        <div className="c2">
            <Text sx={{display:"flex",alignItems:"center",gap:"5px"}}><div style={{
                height:"20px",
                width:"20px",
                border:"1px solid #00b8f5",
                borderRadius:"5px"
            }}></div> AVAILABLE</Text>
            <Text  sx={{display:"flex",alignItems:"center",gap:"5px"}}><div style={{
                height:"20px",
                width:"20px",
                background:"gray",
                borderRadius:"5px"
            }}></div> BOOKED</Text>
            <Text  sx={{display:"flex",alignItems:"center",gap:"5px"}}><div style={{
                height:"20px",
                width:"20px",
                border:"1px solid #00b8f5",
                background:"#00b8f5",
                borderRadius:"5px"
            }}></div> Selected</Text>
        </div>
    </div>
    <div className="seats-container">
        <div className="screen"></div>
            {
                seatData.seats.map((e,i)=>{
                    return<div key={i} className="row">
                        <Title order={4}>{e.n}</Title>
                        {e.s.map((se,si)=>{
                            if(se.b==null){
                                return <div  key={si} style={{
                                height:"20px",
                                width:"20px",
                                
                            }}></div>
                            }else{
                                return <div className={(seatData.seats[i].s[si].cos===true&&seatData.seats[i].s[si].bu===true)?"column blocked"
                                :seatData.seats[i].s[si].bu===true?"column active":"column available"} 
                                 key={si}
                                 onClick={()=>{
                                    // billGenerate();
                                    if(seatData.seats[i].s[si].bu!==true&&seatData.seats[i].s[si].cos!==true){
                                            if(seatData.seats[i].s[si].bu==false){
                                            let colCopy = seats[i].s.map((c,ci)=>({
                                            ...c,bu:c.b===se.b?true:c.bu
                                            }))
                                            let seatsCopy = seats.map((se,ind)=>({
                                                ...se,s:se.n===e.n?colCopy:se.s
                                            }))
                                            setSeats(seatsCopy);
                                            setSeatData({...seatData,seats:[...seatsCopy]})
                                            console.log(value);

                                            let index = {rowId:i,colId:si,row:e.n,seatNo:se.sn}
                                           
                                            setIndexData([...indexData,index]);
                                             if(e.n==="A"){
                                                    setBuget(buget+1);
                                                    
                                                }else{
                                                    setPrime(prime+1);
                                                   
                                                }
                                        }

                                        
                                           
                                    }
                                    
                                    if(seatData.seats[i].s[si].bu===true && seatData.seats[i].s[si].cos==false){
                                            let colCopy = seats[i].s.map((c,ci)=>({
                                            ...c,bu:c.b===se.b?false:c.bu
                                            }))
                                            let seatsCopy = seats.map((se,ind)=>({
                                                ...se,s:se.n===e.n?colCopy:se.s
                                            }))
                                            setSeats(seatsCopy);
                                            setSeatData({...seatData,seats:[...seatsCopy]})
                                            let indexDataCopy = [...indexData];
                                            let preInx;
                                            indexDataCopy.map((ri,ir)=>{
                                                if(ri.rowId==i&&ri.colId==si){
                                                    preInx=ir;
                                                  
                                                }
                                            })
                                            indexDataCopy.splice(preInx, 1);
                                            setIndexData([...indexDataCopy])

                                            if(e.n==="A"){
                                                    setBuget(buget-1);
                                                    
                                                }else{
                                                    setPrime(prime-1);
                                                   
                                                }


                                        }
                                    
                                 }}
                                 >
                                    
                                </div>
                            }
                            
                        })}
                    </div>
                })
            }
    </div>
    {
        buget!==0||prime!==0? <div className="seats-details">
        <div>
            <Title order={3}>₹{(buget*60)+(prime*190)}</Title>
            <Group>
            {buget>0&&<Text color="dimmed">Classic {buget} X ₹60.12</Text>}
            {prime>0&&<Text color="dimmed">Prime {prime} X ₹190.12</Text>}
            </Group>
        </div>
        <Button size="md" onClick={()=>setOpen(true)}>Book Tickets</Button>
    </div>:""
    }
   
  </div>:""}
  
  </>
};

export default Booking;
