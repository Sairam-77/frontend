import axios from 'axios';
import React, { useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './auth/Login';
import ProtectRoute from './auth/ProtectRoute';
import Register from './auth/Register';
import Home from './screens/home/home';
import MovieDetails from './screens/movieDetails/movieDetails';
import HeadersComponent from './components/header/header';
import Booking from './screens/bookingArea/Booking';
import TicketView from './screens/Ticket/ticketView';





function App() {
  useEffect(()=>{
    
  },[])

  return <>
   {/* <HeadersComponent/> */}
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route element={<ProtectRoute/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/details' element={<MovieDetails/>}/>
          <Route path='/booking' element={<Booking/>}/>
          <Route path='/ticket' element={<TicketView/>}/>
      </Route>
    </Routes>
  </Router>
  </>
}

export default App;
