import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-defaulticon-compatibility"; // Fix для отображения маркеров
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { TeaApi } from "../../entities/tea/TeaApi";
import { useNavigate } from "react-router";

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate()
  const getMarkers = async () => {
    try {
      const { data } = await TeaApi.getAll();
      setMarkers(data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  useEffect(() => {
    getMarkers();
  }, []);
  console.log(markers.map((marker) => [+marker.longitude, +marker.width]));
  // eventHandlers={{));

  // const markers = [
  //   { id: 1, position: [51.505, -0.09], title: "Лондон", link: "/london" },
  //   { id: 2, position: [48.8566, 2.3522], title: "Париж", link: "/paris" },
  //   { id: 3, position: [40.7128, -74.006], title: "Нью-Йорк", link: "/new-york" },
  // ];

  // Функция для перехода при клике
  const handleRedirect = (link) => {
    navigate(link); // перенаправление (или используйте роутинг, если используете react-router)
  };

  return (
    <MapContainer
      center={[30.505, 100.09]} // Начальные координаты центра карты
      zoom={4} // Уровень масштаба
      style={{ height: "80vh", width: "75%",  marginLeft: "150px", marginBottom:"150px"}} // Размеры карты

    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Источник тайлов
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker) => (

        <Marker
          key={marker.id}
          position={[+marker.width, +marker.longitude]}

          eventHandlers={{
            click: () => handleRedirect(marker.link),
          }}
        >
          <Popup>
            <b>{marker.title}</b>
            <br />
            <button
              onClick={(e) => {
                e.stopPropagation(); // Чтобы не вызывалось событие маркера
                e.preventDefault();
                handleRedirect(`/tea/${marker.id}`);

              }}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Подробнее
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;

