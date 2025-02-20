import React from 'react'
import { Outlet } from 'react-router'
import Nav from '../Nav/Nav'

export default function Layout({user,setUser}) {
  return (
    <>
        <Nav user={user} setUser={setUser}/>
        <Outlet/>
    </>
  )
}
