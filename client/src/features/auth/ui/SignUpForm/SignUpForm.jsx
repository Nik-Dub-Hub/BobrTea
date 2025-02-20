import React, { useState } from 'react'



const INITIAL_INPUTS_DATA = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export default function SignUpForm({setUser}) {

    const [inputs,setInputs] = useState(INITIAL_INPUTS_DATA)

    const onChangeHandler = (event)=> {
        setInputs((prev)=> ({...prev,[event.target.name] : event.target.value}))
    }


  return (
    <form>
      <label htmlFor="username">Имя пользователя:</label>
      <input type="text" name="username" onChange={onChangeHandler} />
      <label htmlFor="email">Электронная почта:</label>
      <input type="email" name="email" onChange={onChangeHandler} />
      <label htmlFor="password">Пароль пользователя:</label>
      <input type="password" name="password" onChange={onChangeHandler} />
      <button type='button'>Зарегистрироваться</button>
    </form>
  );
}
