import { useState } from 'react'
import { CommentApi } from '../../entities/CommentApi/CommentApi'


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
    <form onSubmit={onSubmitHandler}>
      <textarea
        name='content'
        placeholder='content'
        value={inputs.content}
        onChange={onChangeHandler}
      />
       <button type='submit'>Нажать</button>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </form>
  );    
}