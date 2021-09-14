import './App.css';
import React, {Fragment, useState, useEffect} from 'react';
import Navbar from './components/Navbar.js';
import MoviesList from './components/MoviesList';
import Form from './components/MoviesForm';
import buscador from './search.png'; 


function App() {

  //paginacion
  const [pageNumber, setPageNumber] = useState(0);

  const [busqueda, setBusqueda] = useState("");
    
  const [movies, setMovies] = useState([]);

  const [listUpdated, setListUpdated] = useState(false);


  const handleSearch = e => {
    setBusqueda(e.target.value);
    filter(e.target.value)
  };

  
  const [movie, setMovie] = useState({
    name: '',
    description: '',
    year_creation: ''
  });

  const filter = (filtro) => {
    var resultado = movies.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(filtro.toLowerCase())){
        return elemento;
      }
    })
    setMovies(resultado);
  }

  useEffect (() => {
    const getMovies = () => {
      fetch('http://localhost:3050/movies')
      .then(res => res.json())
      .then(res => setMovies(res))
    }
    getMovies();
    setListUpdated(false);
  }, [listUpdated])

  return(
    <Fragment>
      <Navbar brand='Movies App'/>
      <div className="input-group rounded" style={{alignContent:"center", marginLeft:100, marginRight:1000, marginTop:50,marginBottom:50, width:500}} >
        <input  className="form-control" id="myInput" type="text" placeholder="Buscar por nombre.." value={busqueda} onChange={handleSearch}/>
        <button className="btn btn-success"><img src={buscador} width="20" /></button>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{textAlign: 'center'}}>Movies List</h2>
           
            <MoviesList movie={movie} setMovie={setMovie} movies={movies} setListUpdated={setListUpdated} pageNumber={pageNumber} setPageNumber={setPageNumber}/>

          </div>
          <div className="col-5">
            <h2 style={{textAlign: 'center'}}>Movies form</h2>
            <Form movie={movie} setMovie={setMovie}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
