import React from 'react'
import TeaCard from '../TeaCard/TeaCard'
import styles from './TeasList.module.css'

export default function TeasList({teas,setTeas}) {
  return (
    <div className={styles.container}>
      {teas && (teas.map((tea)=> <TeaCard key={tea.id} tea={tea} setTeas={setTeas}/>))}
    </div>
  )
}
