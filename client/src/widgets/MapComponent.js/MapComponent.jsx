import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-defaulticon-compatibility"; // Fix для отображения маркеров
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const MapComponent = () => {
  // Массив с маркерами: координаты и информация для перехода
  const markers = [
    { id: 1, position: [51.505, -0.09], title: "Лондон", link: "/london" },
    { id: 2, position: [48.8566, 2.3522], title: "Париж", link: "/paris" },
    { id: 3, position: [40.7128, -74.006], title: "Нью-Йорк", link: "/new-york" },
  ];

  // Функция для перехода при клике
  const handleRedirect = (link) => {
    window.location.href = link; // перенаправление (или используйте роутинг, если используете react-router)
  };

  return (
    <MapContainer
      center={[51.505, -0.09]} // Начальные координаты центра карты
      zoom={3}                // Уровень масштаба
      style={{ height: "80vh", width: "100%" }} // Размеры карты
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Источник тайлов
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker) => (
        <Marker 
          key={marker.id} 
          position={marker.position} 
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
                handleRedirect(marker.link);
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