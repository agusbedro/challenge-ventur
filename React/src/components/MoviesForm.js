import React from "react";

const Form = ({movie, setMovie}) => {
    
    const handleChange = e => {
        setMovie({
            ...movie, 
            [e.target.name]: e.target.value
        })
    }
    
    let {name, description, year_creation} = movie;

    const handleSubmit = () => {
      const requestInit ={
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(movie)
      }
       fetch('http://localhost:3050/movies', requestInit)
      .then(res => res.json())

      setMovie({
          name: '',
          description: '',
          year_creation: ''
      })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input value={name} name="name" onChange={handleChange} type="text" id="name" className="form-control" required placeholder="Name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input value={description} name="description" onChange={handleChange} type="text" id="description" className="form-control" required placeholder="Description"/>
            </div>
            <div className="mb-3">
                <label htmlFor="year" className="form-label">Year of creation</label>
                <input value={year_creation} name="year_creation" onChange={handleChange} type="text" id="year" className="form-control" required placeholder="Year of creation"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Form;