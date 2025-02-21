import React, { useEffect, useState } from 'react'
import { CommentApi } from '../../entities/CommentApi/CommentApi'
import CommentUserList from '../../widgets/CommentUserList/CommentUserList'

export default function UserOffice({user}) {

  const [commentsUser,setCommentUser] = useState([])

  useEffect(()=>{
    CommentApi.getAllByUserId().then(({statusCode, error, data, message})=>{
      console.log(data);
      if(error){
        alert(error)
      }
      setCommentUser(data)
    })
  },[])
  return (
    <div>
      <h1>Личный кабинет</h1>
      <CommentUserList user={user} commentsUser={commentsUser} setCommentUser={setCommentUser}/>
    </div>
  )
}
