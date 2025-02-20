import React from "react";
import { NavLink, useNavigate } from "react-router";
import styles from "./Nav.module.css";
import Swal from "sweetalert2";
import UserApi from "../../entities/user/UserApi";

export default function Nav({ user, setUser }) {
  const navigate = useNavigate();
  async function signOutHandler() {
    try {
      const result = await Swal.fire({
        title: "Вы уверены?",
        text: "Это действие нельзя отменить!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Да, выйти",
        cancelButtonText: "Отмена",
      });

      if (result.isConfirmed) {
        const { statusCode, message, error } = await UserApi.signOut();

        if (error) {
          return Swal.fire("Ошибка!", error, "error");
        }

        if (statusCode === 200) {
          Swal.fire("Готово!", message, "success");
          setUser(null);
          navigate("/");
        }
      }
    } catch ({ message }) {
      console.error("Ошибка выхода:", message);
      Swal.fire("Ошибка!", "Не удалось выйти. Попробуйте снова.", "error");
    }
  }
  return (
    <nav className={styles.container}>
      <img src="../../../public/free-icon-coffee-cup-993687.png" alt="cup tea" className={styles.logo}/>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Home
      </NavLink>
      {user && (
        <>
          {user.isAdmin && (
            <>
              <NavLink to="/adminOffice">{user.username}</NavLink>
            </>
          )}
          {!user.isAdmin && 
          <>
          <NavLink to='/userOffice'> </NavLink>
          </>}
          <NavLink to="/" onClick={signOutHandler}>
            Выйти
          </NavLink>
        </>
      )}
      {!user && (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Login
          </NavLink>
          <NavLink
            to="/reg"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Registration
          </NavLink>
        </>
      )}
    </nav>
  );
}
