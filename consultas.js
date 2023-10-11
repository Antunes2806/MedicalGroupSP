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

module.exports = router;
