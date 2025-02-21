import React, { useState } from "react";
import UserValidator from '../../../../entities/user/User.validator'
import UserApi from '../../../../entities/user/UserApi'
import { useNavigate } from "react-router";
import { setAccessToken } from "../../../../shared/lib/axiosInstance";
import styles from './SignInForm.module.css'

const INITIAL_INPUTS_DATA = {
  email: "",
  password: "",
};

export default function SignInForm({ setUser }) {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const [error,setError] = useState('')
  const navigate = useNavigate();
  const onChangeHandler = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { isValid, error:errorValidate } = UserValidator.validateSignIn(inputs)

    if (!isValid){
        setError(errorValidate)
        return
    }

    try {
      const {
        statusCode,
        data,
        error: responseError,
        message,
      } = await UserApi.signIn(inputs)

      if (responseError) {
        setError(responseError);
        return;
      }

      if (statusCode === 200) {
        setUser(data.user);
        setAccessToken(data.accessToken);
        setInputs(INITIAL_INPUTS_DATA);
        navigate("/");
    }
    } catch (error) {
      setError(error.message);
    }
  };
  const { email, password } = inputs;
return (
  <form className={styles.form} onSubmit={onSubmitHandler}>
    <h1 className={styles.heading}>Вход любителей бобрчая</h1>
    {error && (
      <div className={styles.error}>
        Something wrong... <br />
        {error}
      </div>
    )}
    <label className={styles.label} htmlFor="email">
      Ваша электронная почта:
    </label>
    <input
      className={styles.input}
      type="email"
      name="email"
      onChange={onChangeHandler}
      value={email}
    />
    <label className={styles.label} htmlFor="password">
      Ваш пароль:
    </label>
    <input
      className={styles.input}
      type="password"
      name="password"
      onChange={onChangeHandler}
      value={password}
    />
    <button className={styles.button} type="submit">
      Войти
    </button>
  </form>
);

}
