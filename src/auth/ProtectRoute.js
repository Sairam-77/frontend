import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const ProtectRoute = () => {
  const {value} = useSelector((e) => e.user);
  console.log(value);
  return value.value!==false?<Outlet/>:<Navigate to='/'/>
}

export default ProtectRoute