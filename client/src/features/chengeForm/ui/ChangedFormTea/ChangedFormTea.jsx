import React, { useEffect, useState } from "react";
import { TeaApi } from "../../../../entities/tea/TeaApi";
import Swal from "sweetalert2";

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
        if(error){
            Swal.fire("Ошибка!", message, "error");
            return
        }

        if (statusCode === 200) {
          Swal.fire("Изменено", message, "success");
          setEditing(false)
          setTeas((prevTeas)=> prevTeas.map((t) => t.id === id ? {...t,...inputs}:t))
        }
      } catch ({ message }) {
        Swal.fire("Ошибка!", message, "error");
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandle}>
        <input
          type="text"
          name="title"
          placeholder="Название чая"
          value={inputs.title}
          onChange={onChangeHandler}
        />
        <input
          type="text"
          name="place"
          placeholder="Место происхождения"
          value={inputs.place}
          onChange={onChangeHandler}
        />
        <input
          type="text"
          name="img"
          placeholder="URL изображения"
          value={inputs.img}
          onChange={onChangeHandler}
        />
        <input
          type="text"
          name="description"
          placeholder="Описание"
          value={inputs.description}
          onChange={onChangeHandler}
        />
        <input
          type="text"
          name="longitude"
          placeholder="Долгота на карте"
          value={inputs.longitude}
          onChange={onChangeHandler}
        />
        <input
          type="text"
          name="width"
          placeholder="Широта на карте"
          value={inputs.width}
          onChange={onChangeHandler}
        />
        <button type="submit">Сохранить</button>
        <button type="button" onClick={handleCancelClick}>
          Отменить
        </button>
      </form>
    </>
  );
}
