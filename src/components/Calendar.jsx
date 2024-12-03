import React, { useState, useEffect } from "react";


function Calendar({ apiKey }) {
  // state para armazenar as imagens do mês
  const [images, setImages] = useState({}); // Objeto onde cada dia será uma chave com a URL da imagem
  const [loading, setLoading] = useState(true); // state que controla o carregamento dos dados

  const fetchImageData = async (date, apiKey) => {
  try {
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
    const response = await fetch(url); // Faz a requisição à API
    const data = await response.json(); // Converte a resposta em JSON
    return data.url; // Retorna o URL da imagem
  } catch (error) {
    console.error(`Erro ao buscar imagem de ${date}:`, error);
    return null; // Em caso de erro, retorna null
  }
};

  // useEffect para procurar as imagens de todos os dias de novembro
  useEffect(() => {
    const fetchImagesForNovember = async () => {
      const imageData = {}; // Objeto temporário para armazenar as imagens
      for (let day = 1; day <= 30; day++) {
        // Formata a data no padrão YYYY-MM-DD
        const date = `2024-11-${day < 10 ? `0${day}` : day}`; 
        const imageUrl = await fetchImageData(date, apiKey); // Busca a imagem para a data específica
        imageData[day] = imageUrl; // Armazena a URL no objeto
      }
      setImages(imageData); // Atualiza o estado com as imagens obtidas
      setLoading(false); // Define loading como false após a conclusão da busca
    };

    fetchImagesForNovember(); // Chama a função de busca
  }, [apiKey]); // Executa a busca apenas quando o `apiKey` mudar

  // Exibe uma mensagem de carregamento enquanto os dados não são carregados
  if (loading) return <div>Loading images...</div>;

  // Função para renderizar os dias do calendário com as imagens
  const renderCalendarDays = () => {
    const daysInNovember = 30; // Total de dias no mês de novembro
    const calendarDays = []; // Array para armazenar os elementos JSX dos dias

    // Loop para criar o calendário com os 30 dias
    for (let day = 1; day <= daysInNovember; day++) { //loop que precorre os 30 dias
      calendarDays.push(
        <div className="calendar-day" key={day}>
          <div className="date">{day}</div> {/* Mostra o número do dia */}
          {images[day] ? (
            // Se a imagem estiver disponível, exibe-a
            <img src={images[day]} alt={`NASA Image of the Day ${day}`} />
          ) : (
            // Caso contrário, exibe uma mensagem alternativa
            <div className="no-image">No image available</div>
          )}
        </div>
      );
    }

    return calendarDays; // Retorna o array de elementos JSX
  };

  // Renderiza o componente de calendário completo
  return (
    <div className="calendar-container">
      <div className="calendar-grid">
        {renderCalendarDays()} {/* Chama a função para renderizar os dias */}
      </div>
    </div>
  );
}

export default Calendar;