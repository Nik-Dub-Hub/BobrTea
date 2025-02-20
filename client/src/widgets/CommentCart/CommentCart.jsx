import React from "react";
import { CommentApi } from "../../entities/CommentApi/CommentApi";
import { Link } from "react-router";

export default function CommentCard({comment,user}) {
  return (
  <div>
    <h3>{comment.content}</h3>
    {user?.id === comment.user_id && <>
    <button>Удалить</button>
    </>}
  </div>
  )
}

