import { useState, useEffect } from "react";
import PictureDay from "./components/PictureDay";
import Header from "./components/Header";
import InputDates from "./components/InputDates"; 
import Calendar from "./components/Calendar";

function App() {
  const [nasaInfo, setNasaInfo] = useState({}); // useState para a foto do dia
  const [searchDate, setSearchDate] = useState(""); // Guarda a data de pesquisa que é inserida pelo utilizador 
  const [searchResult, setSearchResult] = useState(null); // Resultados da pesquisa por data
  const apiKey = "MkuXZxd1PmVf924aTmCRLCguL78DWubV1hPqWqUh";
  
  const clearSearch = () => {
    setSearchDate(""); // Limpa o valor do input
    setSearchResult(null); // Reseta o resultado da pesquisa
  };

  // fetch para a foto do dia - 1 foto
  useEffect(() => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let tempNasa = {
          title: data.title,
          img: data.url,
          date: data.date,
        };
        setNasaInfo(tempNasa); // fetch a api e armazena o pedido em tempNasa
      });
  }, []);

  
  const handleSearch = () => {  // handleSearch faz a pesquisa por data
    const searchUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${searchDate}`;
    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult({  
          title: data.title,
          img: data.url,
          date: data.date,
          description: data.explanation,
        });
      }); //guarda o resultado do pedido em searchResult
  };

  return (
    <div className="body">
      <header>
        <div className="container">
          <Header />
        </div>
      </header>
      <main>
        <div className="card mb-4">
          <div className="card-body text-center">
            <h2 className="card-title">NASA'S PICTURE OF THE DAY</h2>
            <PictureDay nasaInfo={nasaInfo} />
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-center mb-4 november-title ">NASA'S MONTH OF NOVEMBER</h2>
          <Calendar apiKey={apiKey} />
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">CHOOSE A DATE</h2>
            <InputDates
              searchDate={searchDate}
              setSearchDate={setSearchDate}
              handleSearch={handleSearch}
              clearSearch={clearSearch}
            />
          </div>
        </div>    

        {searchResult && (
          <div className="card mt-4">
            <div className="card-body text-center">
              <h3 className="card-title">Search Result</h3>
              <PictureDay nasaInfo={searchResult} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;


