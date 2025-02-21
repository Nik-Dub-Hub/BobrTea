import React from 'react'
import { Outlet } from 'react-router'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

export default function Layout({user,setUser}) {
  return (
    <>
        <Nav user={user} setUser={setUser}/>
        <Outlet/>
        <Footer/>
    </>
  )
}
