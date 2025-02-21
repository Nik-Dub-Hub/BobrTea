import React from 'react'
import CommentCardUser from '../CommentCardUser/CommentCardUser'

export default function CommentUserList({commentsUser,setCommentUser,user}) {
  return (
    <>{commentsUser.map((comment)=> <CommentCardUser user={user} key={comment.id} comment={comment} setCommentUser={setCommentUser} />)}</>
  )
}
