import { useState } from "react";
import { CommentApi } from '../../entities/CommentApi'


export default function EditingFormTea({setTea}){
    const [inputs, setInputs] = useState({ title: '', place: '', img: '', description: '', longitude: '', width: '' });
    const [error, setError] = useState('');

    const onChangeHandler = (event) => {
        setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
      };

    async function onSubmitHandler(event) {
        event.preventDefault();
        if (!inputs.title || inputs.title.length === 0) {
          setError('Поле Название не должно быть пустым ');
          return;
        }
        if (!inputs.place || inputs.place.length === 0) {
            setError('Поле Место не должно быть пустым ');
            return;
          }
        if (!inputs.img || inputs.img.length === 0) {
          setError('Поле Картинка не должно быть пустым ');
          return;
        }
        if (!inputs.description || inputs.description.length === 0) {
            setError('Поле Описание не должно быть пустым ');
            return;
          }
        if (!inputs.longitude || inputs.longitude
            .length === 0 || isNaN(longitude)) {
          setError('Название не должно быть пустым ');
          return;
        }
        if (!inputs.width || inputs.width
            .length === 0 || isNaN(width)) {
          setError('Название не должно быть пустым ');
          return;
        }
        try {
            const {statusCode, error, data, message } = await CommentApi.create(inputs)
            if(error){
                setError(message);
            }
            if(statusCode === 201){
                setTea((prev) => [...prev, data]);
            }   setInputs({ title: '', place: '', img: '', description: '', longitude: '', width: '' });
                setError('');
        } catch (error) {
            console.log(error);
        }
    }
return(
    <form onSubmit={onSubmitHandler}>
      <input
        name='title'
        placeholder='title'
        value={inputs.title}
        onChange={onChangeHandler}
      />
      <input
        name='place'
        placeholder='place'
        value={inputs.place}
        onChange={onChangeHandler}
      />
      <input
        name='img'
        placeholder='img'
        value={inputs.img}
        onChange={onChangeHandler}
      />
      <input
        name='description'
        placeholder='description'
        value={inputs.description}
        onChange={onChangeHandler}
      />
      <input
        name='longitude'
        placeholder='longitude'
        value={inputs.longitude}
        onChange={onChangeHandler}
      />
      <input
        name='width'
        placeholder='width'
        value={inputs.width}
        onChange={onChangeHandler}
      />
      <button type='submit'>Создать</button>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </form>
)
}
