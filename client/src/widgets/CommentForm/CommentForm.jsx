import { useState } from 'react'
import { CommentApi } from '../../entities/CommentApi/CommentApi'
import styles from './CommentForm.module.css'


export default function CommentForm({ setComments, id}){
    const [inputs, setInputs] = useState({ content: '' })
    const [error, setError] = useState('')

    const onChangeHandler = (event) => {
        setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
      };

    async function onSubmitHandler(event) {
        event.preventDefault();
        if (!inputs.content || inputs.content === 'ass' || inputs.content.length === 0) {
            setError('Поле не должно быть пустым.');
            return;
        }
    
    
    try {
        const  { statusCode, error, data, message } = await CommentApi.create(inputs,id)
        console.log(data);
        
        if (error) {
            setError(message);
          }
          if (statusCode === 201) {
            setComments((prev) => [...prev, data]);
            setInputs({ content: '' });
            setError('');
          }  
         } catch (error) {
            console.log(error);
    }
}

 return (
   <form className={styles.commentForm} onSubmit={onSubmitHandler}>
     <textarea
       className={styles.textarea}
       name="content"
       placeholder="Напишите ваш комментарий..."
       value={inputs.content}
       onChange={onChangeHandler}
     />
     <button className={styles.submitButton} type="submit">
       Прокомментировать
     </button>
     {error && <span className={styles.error}>{error}</span>}
   </form>
 );
}