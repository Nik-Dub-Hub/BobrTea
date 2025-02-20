import React, { useState } from 'react'
import UserValidator from '../../../../entities/user/User.validator';
import UserApi from '../../../../entities/user/UserApi';
import { setAccessToken } from '../../../../shared/lib/axiosInstance';
import { useNavigate } from 'react-router';


const INITIAL_INPUTS_DATA = {
  username: "",
  email: "",
  password: ""
};

export default function SignUpForm({setUser}) {

    const [inputs,setInputs] = useState(INITIAL_INPUTS_DATA)
    const [error,setError] = useState('')
    const navigate = useNavigate()

    const onChangeHandler = (event)=> {
        setInputs((prev)=> ({...prev,[event.target.name] : event.target.value}))
    }

    const onSubmitHandler = async(event) => {
      event.preventDefault()
      const {isValid,error:errorValidate} = UserValidator.validateSignUp(inputs)

      if(!isValid){
        setError(errorValidate)
        return
      }

      try {
        const {statusCode,error:responseError,data,message:responseMessage} = await UserApi.signUp(inputs)

        if(responseError){
          setError(responseError)
          return
        }

        if(statusCode === 201){
          setUser(data.user)
          setAccessToken(data.accessToken)
          setInputs(INITIAL_INPUTS_DATA)
          navigate('/')
        }
      } catch ({message}) {
        setError(message)
      }
    }
    const {username,email,password} = inputs
  return (
    <form onSubmit={onSubmitHandler}>
      <h1>Регистрация чайного любителя</h1>
      {error && <div>Something wrong... <br />{error}</div>}
      <label htmlFor="username">Имя пользователя:</label>
      <input type="text" name="username" onChange={onChangeHandler} value={username}/>
      <label htmlFor="email">Электронная почта:</label>
      <input type="email" name="email" onChange={onChangeHandler} value={email}/>
      <label htmlFor="password">Пароль пользователя:</label>
      <input type="password" name="password" onChange={onChangeHandler} value={password}/>
      <button type='submit'>Зарегистрироваться</button>
    </form>
  );
}
