import React, { useEffect, useState } from "react";
import { TeaApi } from "../../../../entities/tea/TeaApi";
import Swal from "sweetalert2";
import styles from "./ChangedFormTea.module.css";

export default function ChangedFormTea({ setEditing, tea, setTeas }) {
  const { id } = tea;
  const [inputs, setInputs] = useState({
    title: "",
    place: "",
    img: "",
    description: "",
    longitude: "",
    width: "",
  });

  useEffect(() => {
    if (tea) {
      setInputs({
        title: tea.title,
        place: tea.place,
        img: tea.img,
        description: tea.description,
        longitude: tea.longitude,
        width: tea.width,
      });
    }
  }, [tea]);

  const handleCancelClick = () => {
    setEditing(false);
  };

  const onChangeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandle = async (event) => {
    event.preventDefault();

    const result = await Swal.fire({
      title: "Вы уверены?",
      text: "Это действие нельзя отменить!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Да, изменить",
      cancelButtonText: "Отмена",
    });
    if (result.isConfirmed) {
      try {
        const { statusCode, data, error, message } = await TeaApi.update(
          id,
          inputs
        );
        if (error) {
          Swal.fire("Ошибка!", message, "error");
          return;
        }

        if (statusCode === 200) {
          Swal.fire("Изменено", message, "success");
          setEditing(false);
          setTeas((prevTeas) =>
            prevTeas.map((t) => (t.id === id ? { ...t, ...inputs } : t))
          );
        }
      } catch ({ message }) {
        Swal.fire("Ошибка!", message, "error");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmitHandle}>
        <label htmlFor="title">Название чая</label>
        <input
          className={styles.input}
          type="text"
          name="title"
          id="title"
          placeholder="Введите название чая"
          value={inputs.title}
          onChange={onChangeHandler}
        />

        <label htmlFor="place">Место происхождения</label>
        <input
          className={styles.input}
          type="text"
          name="place"
          id="place"
          placeholder="Введите место происхождения"
          value={inputs.place}
          onChange={onChangeHandler}
        />

        <label htmlFor="img">URL изображения</label>
        <input
          className={styles.input}
          type="text"
          name="img"
          id="img"
          placeholder="Введите URL изображения"
          value={inputs.img}
          onChange={onChangeHandler}
        />

        <label htmlFor="description">Описание</label>
        <input
          className={styles.input}
          type="text"
          name="description"
          id="description"
          placeholder="Введите описание"
          value={inputs.description}
          onChange={onChangeHandler}
        />

        <label htmlFor="longitude">Долгота на карте</label>
        <input
          className={styles.input}
          type="text"
          name="longitude"
          id="longitude"
          placeholder="Введите долготу"
          value={inputs.longitude}
          onChange={onChangeHandler}
        />

        <label htmlFor="width">Широта на карте</label>
        <input
          className={styles.input}
          type="text"
          name="width"
          id="width"
          placeholder="Введите широту"
          value={inputs.width}
          onChange={onChangeHandler}
        />

        <div className={styles.buttonsContainer}>
          <button className={styles.button} type="submit">
            Сохранить
          </button>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            type="button"
            onClick={handleCancelClick}
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
}
