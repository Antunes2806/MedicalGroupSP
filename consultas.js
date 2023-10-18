// consultas.js

const express = require('express');
const router = express.Router();
const db = require('./dbconfig');

// Rota para exibir a página de agendamento
router.get('/agendamento', (req, res) => {
  res.render('agendamento'); // Renderize a página de agendamento
});

// Rota para processar o agendamento
router.post('/agendamento', (req, res) => {
  const { paciente, especialidade, dor, dia } = req.body;
  console.log('Agendando consulta!');

  const sql = 'INSERT INTO consultas (paciente, especialidade, dor, dia) VALUES (?, ?, ?, ?)';

  db.query(sql, [paciente, especialidade, dor, dia], (err, result) => {
    console.log('Enviando ao BD :Agendando consulta!:');
    if (err) {
      console.error('Erro na inserção de dados: ' + err.message);
      return res.status(500).send('Erro na inserção de dados');
    }
  });
});
// Adicione uma rota para a submissão de dados do formulário
router.post('/consultas', (req, res) => {
  const { paciente, especialidade, dor, dia } = req.body;

  const sql = 'INSERT INTO consultas (paciente, especialidade, dor, dia) VALUES (?, ?, ?, ?)';

  db.query(sql, [paciente, especialidade, dor, dia], (err, result) => {
    if (err) {
      console.error('Erro na inserção de dados: ' + err.message);
      return res.status(500).send('Erro na inserção de dados');
    }

    res.redirect('/consultas'); // Redirecione de volta para a página de consultas após a inserção
  });
});

module.exports = router;