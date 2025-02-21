import CommentCard from "../CommentCard/CommentCard"
import CommentForm from "../CommentForm/CommentForm";

export default function CommentList({ comments, id, user, setComments }) {
  return (
    <>
      <CommentForm id={id} setComments={setComments} />
      <div>
        {comments.map((comment) => (
          <CommentCard
            comment={comment}
            key={comment.id}
            user={user}
            setComments={setComments}
          />
        ))}
      </div>
    </>
  );
}
