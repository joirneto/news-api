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

connection.end();

app.listen(PORT, ()=> {
  console.log(`Server listenig in PORT ${PORT}`);
});