import { useState, useEffect } from "react";
import PictureDay from "./components/PictureDay";
import Header from "./components/Header";
import InputDates from "./components/InputDates";
import Calendar from "./components/Calendar"

function App() {
  const [nasaInfo, setNasaInfo] = useState({}); // Foto do dia
  const [customInfo, setCustomInfo] = useState(null); // Resultado de pesquisa por data
  const [selectedDate, setSelectedDate] = useState(""); // Data escolhida pelo utilizador
  const apiKey = "MkuXZxd1PmVf924aTmCRLCguL78DWubV1hPqWqUh";

  // Fetch da foto do dia (apenas uma vez, no carregamento inicial)
  useEffect(() => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNasaInfo({
          title: data.title,
          img: data.url,
          date: data.date,
          description: data.explanation,
        });
      });
  }, []);

  // Fetch para a data selecionada
  const handleDateChange = () => {
    if (!selectedDate) return; // Não faz nada se nenhuma data for selecionada
    const searchUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`;
    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        setCustomInfo({
          title: data.title,
          img: data.url,
          date: data.date,
          description: data.explanation,
        });
      });
  };

  // Função para limpar a pesquisa e voltar à foto do dia
  const resetToDefault = () => {
    setSelectedDate("");
    setCustomInfo(null);
  };

  return (
    <div className="body">
      <header>
        <div className="container">
          <Header />
        </div>
      </header>
      <main>
        {/* Seleção de data */}
        <section className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Select a Date</h3>
            <InputDates
              searchDate={selectedDate}
              setSearchDate={setSelectedDate}
              handleSearch={handleDateChange}
              clearSearch={resetToDefault}
            />
          </div>
        </section>

        {/* Exibição da imagem (dinâmica) */}
        <section className="card mb-4">
          <div className="card-body text-center">
            <h2 className="card-title">
              {customInfo
                ? `Picture from ${customInfo.date}`
                : "Today's Picture"}
            </h2>
            <PictureDay nasaInfo={customInfo || nasaInfo} />
          </div>
        </section>

        <div className="mt-5">
          <h2 className="text-center mb-4 november-title ">NASA'S MONTH OF NOVEMBER</h2>
          <Calendar apiKey={apiKey} />
        </div>

      </main>
    </div>
  );
}

export default App;





