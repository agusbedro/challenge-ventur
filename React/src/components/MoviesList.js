import React from "react";
import ReactPaginate from 'react-paginate';


const MoviesList = ({movie, setMovie, movies, setListUpdated, pageNumber, setPageNumber}) => {
    
    const moviesPerPage = 5;

    const pagesVisited = pageNumber * moviesPerPage;

    const pageCount = Math.ceil(movies.length / moviesPerPage);


    const handleUpdate = id => {
        const requestInit = {
            method : 'PUT',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify(movie)
        }
        fetch('http://localhost:3050/movies/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

      setMovie({
        name: '',
        description: '',
        year_creation: ''
    })
        setListUpdated(true);
    }


    const changePage = ({selected}) => {
        setPageNumber(selected);
    };
    
    
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Year of creation</th>
                </tr>
            </thead>
            <tbody>
                {movies.slice(pagesVisited, pagesVisited + moviesPerPage).map(movie => (
                    <tr key={movie.id}>
                        <td>{movie.name}</td>
                        <td>{movie.description}</td>
                        <td>{movie.year_creation}</td>
                        <td>
                            <div>
                                <button onClick={()=> handleUpdate(movie.id)} className="btn btn-dark">Update</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            <div className="pagination" style={{width:200}}>
            <ReactPaginate 
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationButton"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
            </div>
        </table>
    )
}

export default MoviesList;