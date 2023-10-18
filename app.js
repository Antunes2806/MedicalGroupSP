const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000; // Porta em que o servidor será executado
const bodyParser = require('body-parser');
const path = require('path');
const consultasRouter = require('./consultas'); // Importe as rotas das consultas


app.use(bodyParser.urlencoded({ extended: true }));



// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'aluno',
    database: 'consultas',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida.');
});

// Configurar EJS como o motor de visualização
app.set('view engine', 'ejs');


// Use o roteamento para consultas
app.use('/', consultasRouter);


// Rota para exibir a página de agendamento de consultas
app.get('/agendamento', (req, res) => {
    res.render('pages/agendamento'); // Renderize a página de agendamento
});

// Rota para processar o agendamento de consultas
app.post('/agendamento', (req, res) => {
    const { paciente, especialidade, dor, dia } = req.body;

    const query = 'INSERT INTO consultas (paciente, especialidade, dor, dia) VALUES (?, ?, ?, ?)';

    db.query(query, [paciente, especialidade, dor, dia], (err, results) => {
        console.log('${paciente}, ${especialidade} ${dor} ${dia}');
        if (err) {
            console.error('Erro na inserção de dados: ' + err.message);
            return res.status(500).send('Erro na inserção de dados');
        }

        res.redirect('/consultas'); // Redirecione de volta para a página de consultas após a inserção
    });
});
app.get('/consultas' ,(req, res) => {
    res.sendFile(__dirname + '/consultas.html');
})
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
app.set('views', path.join(__dirname, 'views'));




