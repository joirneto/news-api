const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin123',
  database : 'sistema_noticias'
});

connection.connect();

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.get('/categorias', (req, res) => {
  connection.query('SELECT id, nome FROM sistema_noticias.categoria', function(err, rows, fields) {
    if (err) throw err; 
    res.send(rows);
  });
});

app.get('/categorias/:categoriaId/noticias', (req, res) => {
  connection.query(`SELECT id, titulo FROM sistema_noticias.noticias WHERE id_categoria = ${req.params.categoriaId}`, function(err, rows, fields) {
    if (err) throw err; 
    res.send(rows);
  });
});

app.get('/categorias/:categoriaId/noticias/:noticiaId', (req, res) => {
  connection.query(`SELECT titulo, conteudo FROM sistema_noticias.noticias WHERE id_categoria = ${req.params.categoriaId} and id = ${req.params.noticiaId}`, function(err, rows, fields) {
    if (err) throw err; 
    res.send(rows);
  });
});

//connection.end();

app.listen(PORT, ()=> {
  console.log(`Server listenig at http://localhost:${PORT}`);
});