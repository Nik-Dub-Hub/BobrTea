import React from 'react'
import styles from './NotFound.module.css'
import { useNavigate } from 'react-router';

export default function NotFound() {
    const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <img className={styles.img} src="../../../public/orig.webp" alt="404" />
      <button className={styles.btn} onClick={()=> navigate('/')} >На главную</button>
    </div>
  );
}
