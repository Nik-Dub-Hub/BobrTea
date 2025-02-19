import React from 'react'
import { NavLink } from 'react-router'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.container}>
        <NavLink to='/reg' className={({ isActive }) => (isActive ? styles.active : '')}>Registration</NavLink>
        <NavLink to='/login'className={({ isActive }) => (isActive ? styles.active : '')}>Login</NavLink>
        <NavLink to='/'className={({ isActive }) => (isActive ? styles.active : '')}>Home</NavLink>
    </nav>
  )
}
