// consultas.js

const express = require('express');
const router = express.Router();
const db = require('./dbconfig');

router.get('/consultas', (req, res) => {
  const sql = 'SELECT nome, medico, motivo, data FROM consultas';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados: ' + err.message);
      return res.status(500).send('Erro na consulta ao banco de dados');
    }

    res.render('consultas', { consultas: results });
  });
});

// Adicione uma rota para a submissão de dados do formulário
router.post('/consultas', (req, res) => {
  const { nome, medico, motivo, data } = req.body; 
console.log(req.body)
  const sql = 'INSERT INTO consultas (nome, medico, motivo, data) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [nome, medico, motivo, data], (err, result) => {
    if (err) {
      console.error('Erro na inserção de dados: ' + err.message);
      return res.status(500).send('Erro na inserção de dados');
    }
    
    res.redirect('/consultas'); // Redirecione de volta para a página de consultas após a inserção
  });
});

module.exports = router;




 
