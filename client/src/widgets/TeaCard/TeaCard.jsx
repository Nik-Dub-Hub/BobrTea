import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "../TeaCard/TeaCard.module.css";
import { TeaApi } from "../../entities/tea/TeaApi";
import Swal from "sweetalert2";
import ChangedFormTea from "../../features/chengeForm/ui/ChangedFormTea/ChangedFormTea";

export default function TeaCard({ tea, setTeas }) {
  const navigate = useNavigate();
  const [isEditing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };


  const onDeleteHandler = async () => {
    try {
      const result = await Swal.fire({
        title: "Вы уверены?",
        text: "Это действие нельзя отменить!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Да, удалить",
        cancelButtonText: "Отмена",
      });

      if (result.isConfirmed) {
        const { statusCode, error, message } = await TeaApi.delete(tea.id);
        if (error) {
          return Swal.fire("Ошибка!", error, "error");
        }

        if (statusCode === 200) {
          Swal.fire("Удалено", message, "success");
          setTeas((prev) => prev.filter((el) => el.id !== tea.id));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/tea/${tea.id}`}>
        <h3>{tea.title}</h3>
      </Link>
      <img className={styles.img} src={tea.img} alt="logo tea" />
      {isEditing &&  <ChangedFormTea setEditing={setEditing} tea={tea} setTeas={setTeas}/>}
      <button className={styles.btnChange} onClick={handleEditClick}>
        Изменить
      </button>
      <button className={styles.btnDelete} onClick={onDeleteHandler}>
        Удалить
      </button>
    </div>
  );
}
