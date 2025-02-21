import React, { useEffect, useState } from 'react'
import { CommentApi } from '../../entities/CommentApi/CommentApi'

export default function UserOffice() {

  const [comments,setComment] = useState([])

  useEffect(()=>{
    CommentApi
  })
  return (
    <div>
      <h1>Личный кабинет</h1>
      {/* <CommentList/> */}
    </div>
  )
}
