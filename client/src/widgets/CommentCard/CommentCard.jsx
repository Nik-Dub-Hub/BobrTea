import React from "react";
import { CommentApi } from "../../entities/CommentApi/CommentApi";
import { Link } from "react-router";
import styles from './CommentCard.module.css'

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
    <div className={styles.commentCard}>
      <h3 className={styles.commentContent}>{comment.content}</h3>
      {user?.id === comment.user_id && (
        <button className={styles.deleteButton} type='button' onClick={deleteButtonHandler}>
          Удалить
        </button>
      )}
    </div>
  );
}

