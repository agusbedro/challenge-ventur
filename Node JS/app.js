
const express = require('express');
const app = express();
const { response, request } = require('express');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_challenge_venturing'
});

const PORT = process.env.PORT || 3050;

app.get('/movies', (request, response) => {
    const sql = 'SELECT * FROM movies';
    connection.query(sql, (error, result)=>{
        if(error) throw error;
        if (result.length > 0)
            response.json(result);
        else
            response.send('No results');
    })
})

app.get('/movies/:id', (request, response)=>{
    const {id} = request.params;
    const sql = `SELECT * FROM movies WHERE id = ${id}`;

    connection.query(sql, (error, result)=>{
        if(error) throw error;
        if (result.length > 0)
            response.json(result);
        else
            response.send('No results');
    })
});

app.get('/movies/:name', (request, response)=>{
    const {name} = request.params;
    const sql = `SELECT * FROM movies WHERE name = '${name}'`;

    connection.query(sql, (error, result)=>{
        if(error) throw error;
        if (result.length > 0)
            response.json(result);
        else
            response.send('No results');
    })
});

app.post('/movies', (request, response)=>{
    const sql = 'INSERT INTO movies SET ?';
    const movieObj = {
        name: request.body.name,
        description:request.body.description,
        year_creation:request.body.year_creation
    };

    connection.query(sql, movieObj, error =>{
        if(error) throw error;
        response.send("La pelicula se ha insertado correctamente");
    });
});

app.put('/movies/:id', (request, response)=>{
    const {id} = request.params;
    const {name, description, year_creation} = request.body;
    const sql = `UPDATE movies SET name = '${name}', description = '${description}', year_creation= '${year_creation}' WHERE id = ${id}`;

    connection.query(sql, error=>{
        if(error)throw error;
        response.send("La pelicula se ha modificado correctamente");
    });

});

app.delete('/movies/:id', (request, response)=>{
    const {id} = request.params;
    const sql = `DELETE FROM movies WHERE id = ${id}`;

    connection.query(sql, error => {
        if(error) throw error;
        response.send(`La pelicula con el id ${id} ha sido eliminada`);
    })
});

connection.connect(error => {
    if(error)throw error;
    console.log('Database server running!');
});

app.listen(PORT, () =>console.log(`Server running on PORT ${PORT}`));
