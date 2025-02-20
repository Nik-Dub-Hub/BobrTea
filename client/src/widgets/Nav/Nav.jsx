import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import styles from './Nav.module.css'

export default function Nav({user,setUser}) {
  const navigate = useNavigate()
  return (
    <nav className={styles.container}>
        <NavLink to='/'className={({ isActive }) => (isActive ? styles.active : '')}>Home</NavLink>
        <NavLink to='/login'className={({ isActive }) => (isActive ? styles.active : '')}>Login</NavLink>
        <NavLink to='/reg' className={({ isActive }) => (isActive ? styles.active : '')}>Registration</NavLink>
    </nav>
  )
}
