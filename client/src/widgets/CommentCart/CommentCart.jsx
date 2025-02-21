import React from "react";
import { CommentApi } from "../../entities/CommentApi/CommentApi";
import { Link } from "react-router";


export default function CommentCard({comment,user, setComments}) {

  const deleteButtonHandler = async () => {
    try {
      
      const {statusCode, error, message} = await CommentApi.delete(comment.id);
      if(error){
        alert(message)
      }
      if(statusCode === 200){
        setComments((prev)=> prev.filter((el)=> el.id !== comment.id))
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div>
    <h3>{comment.content}</h3>
    {user?.id === comment.user_id && <>
    <button type='button' onClick={deleteButtonHandler}>Удалить</button>
    </>}
  </div>
  )
}

