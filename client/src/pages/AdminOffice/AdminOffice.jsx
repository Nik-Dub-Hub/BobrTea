import React, { useEffect, useState } from 'react'
import { TeaApi } from '../../entities/tea/TeaApi'
import TeaCard from '../../widgets/TeaCard/TeaCard'
import TeasList from '../../widgets/TeasList/TeasList'

export default function AdminOffice() {
    const[teas,setTeas] = useState([])
    const [error,setError] = useState('')
    useEffect(()=>{
        TeaApi.getAll().then(({statusCode,data,error:responseError,message})=>{
            setError(responseError)
            setTeas(data)
        })
    },[])
  return (
    <div>
      <TeasList teas={teas} setTeas={setTeas}/>
    </div>
  )
}
