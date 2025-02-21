import { useState } from "react";
import { TeaApi } from "../../entities/tea/TeaApi";
import Swal from "sweetalert2";
import styles from "./EditingFormTea.module.css";

export default function EditingFormTea({ setTeas, setCreate }) {
  const [inputs, setInputs] = useState({
    title: "",
    place: "",
    img: "",
    description: "",
    longitude: "",
    width: "",
  });
  const [error, setError] = useState("");

  const onChangeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleCancelClick = () => {
    setCreate(false);
  };

  const isValidCoordinate = (value, min, max) => {
    const num = parseFloat(value);
    console.log(num);
    
    return !isNaN(num) && num >= min && num <= max;
  };

  async function onSubmitHandler(event) {
    event.preventDefault();
    if (!inputs.title || inputs.title.length === 0) {
      Swal.fire(
        "Поле Название не должно быть пустым  ",
        "Заполните поле",
        "error"
      );
      return;
    }
    if (!inputs.place || inputs.place.length === 0) {
      Swal.fire(
        "Поле Место не должно быть пустым  ",
        "Заполните поле",
        "error"
      );
      return;
    }
    if (!inputs.img || inputs.img.length === 0) {
      Swal.fire(
        "Поле Картинка не должно быть пустым  ",
        "Заполните поле",
        "error"
      );
      return;
    }
    if (!inputs.description || inputs.description.length === 0) {
      Swal.fire(
        "Поле Описание не должно быть пустым ",
        "Заполните поле",
        "error"
      );
      return;
    }
    if (
      !inputs.longitude ||
      inputs.longitude.trim().length === 0 ||
      !isValidCoordinate(inputs.longitude, -100, 100)
    ) {
      Swal.fire(
        "Некорректная долгота",
        "Долгота должна быть числом от -180 до 180",
        "error"
      );
      return;
    }
    if (
      !inputs.width ||
      inputs.width.trim().length === 0 ||
      !isValidCoordinate(inputs.width, -90, 90)
    ) {
       Swal.fire(
         "Некорректная широта",
         "Широта должна быть числом от -90 до 90",
         "error"
       );
      return;
    }
    try {
      const { statusCode, error, data, message } = await TeaApi.create(inputs);
      if (error) {
        Swal.fire("Ошибка!", message, "error");
        return;
      }
      if (statusCode === 201) {
        setTeas((prev) => [...prev, data]);
      }
      setInputs({
        title: "",
        place: "",
        img: "",
        description: "",
        longitude: "",
        width: "",
      });
      Swal.fire("Создано!", message, "success");
      setError("");
    } catch (error) {
      Swal.fire("Ошибка!", error.message, "error");
    }
  }
 return (
   <div className={styles.container}>
     <form onSubmit={onSubmitHandler}>
       <input
         className={styles.input}
         name="title"
         placeholder="Название чая"
         value={inputs.title}
         onChange={onChangeHandler}
       />
       <input
         className={styles.input}
         name="place"
         placeholder="Место происхождения"
         value={inputs.place}
         onChange={onChangeHandler}
       />
       <input
         className={styles.input}
         name="img"
         placeholder="URL изображения"
         value={inputs.img}
         onChange={onChangeHandler}
       />
       <input
         className={styles.input}
         name="description"
         placeholder="Описание"
         value={inputs.description}
         onChange={onChangeHandler}
       />
       <input
         className={styles.input}
         name="longitude"
         placeholder="Долгота на карте"
         value={inputs.longitude}
         onChange={onChangeHandler}
       />
       <input
         className={styles.input}
         name="width"
         placeholder="Широта на карте"
         value={inputs.width}
         onChange={onChangeHandler}
       />
       <div className={styles.buttonsContainer}>
         <button className={styles.button} type="submit">
           Создать
         </button>
         <button
           className={`${styles.button} ${styles.cancelButton}`}
           type="button"
           onClick={handleCancelClick}
         >
           Отменить
         </button>
       </div>
       {error && <span className={styles.errorMessage}>{error}</span>}
     </form>
   </div>
 );
}
