const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000; // Porta em que o servidor será executado
const bodyParser = require('body-parser');
const path = require('path');
const consultasRouter = require('./consultas'); // Importe as rotas das consultas



// Use o roteamento para consultas
app.use('/', consultasRouter);



// Rota para exibir a página HTML
app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');

});
app.use(express.static(__dirname+'/'));
// Iniciar o servidor
app.listen(port, () => {
console.log(`Servidor Express está rodando na porta ${port}`);
});

// Configurar o Body Parser
app.use(bodyParser.urlencoded({ extended: false }));




// app.js


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




