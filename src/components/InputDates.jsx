

function InputDates({ searchDate, setSearchDate, handleSearch, clearSearch }) { //recebe props da função app (funçao pai)
  // SearchDate - data atualmente selecionada 
  // setSearchDate atualiza a data na componente pai - app
  // handleSearch executa a pesquisa da imagem na api
  // clearSearch limpa a data selecionada e o resultado da pesquisa.
  return (
    <div className="d-flex justify-content-center mb-4">
      <input
        type="date" //campo de entrada especifico para datas
        className="form-control me-2 w-25" //estilo input bootstrap
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)} //Atualiza o estado searchDate com o valor selecionado pelo utilizador 
        // on change (event handler) evento que dispara sempre que o input é alterado, (e) é o evento (objeto syntheticEvent do react)
        //e.target referece ao elemento que fez disparar o evento - input 
        //.value - valor que recebe
      />
      <button className="btn btn-light" onClick={handleSearch}>
        Search
      </button>
      <button className="btn btn-danger" onClick={clearSearch}>
        Clear
      </button>
    </div>
  );
}

export default InputDates;


