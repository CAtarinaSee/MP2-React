import React, { useState, useEffect } from "react";

function Calendar({ apiKey }) {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImageData = async (date, apiKey) => {
    try {
      const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error(`Erro ao buscar imagem de ${date}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchImagesForNovember = async () => {
      const imageData = {};
      const promises = [];
      for (let day = 1; day <= 30; day++) {
        const date = `2024-11-${day < 10 ? `0${day}` : day}`;
        promises.push(fetchImageData(date, apiKey).then((imageUrl) => {
          imageData[day] = imageUrl;
        }));
      }
      await Promise.all(promises);
      setImages(imageData);
      setLoading(false);
    };

    fetchImagesForNovember();
  }, [apiKey]);

  if (loading) return <div>Loading images...</div>;

  const renderCalendarDays = () => {
    const calendarDays = [];
    for (let day = 1; day <= 30; day++) {
      calendarDays.push(
        <div
          className="calendar-day"
          key={day}
          onClick={() => {
            console.log("Imagem clicada para abrir modal", images[day]); // Verificando se o clique funciona
            setSelectedImage(images[day]);
          }}
        >
          <div className="date">{day}</div>
          {images[day] ? (
            <img src={images[day]} alt={`NASA Image of the Day ${day}`} />
          ) : (
            <div className="no-image">No image available</div>
          )}
        </div>
      );
    }
    return calendarDays;
  };

  const handleCloseModal = () => {
    console.log("Modal fechado");
    setSelectedImage(null);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>

      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <img src={selectedImage} alt="Expanded NASA Image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
