const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/barbers — lista di tutti i barbieri con id, name, photo
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, photo FROM users WHERE role = "barber"');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recuperare i barbieri' });
  }
});

// GET /api/barbers/:id — dettagli di un singolo barbiere (senza slot)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [barberRows] = await db.query(
      'SELECT id, name, email, photo FROM users WHERE role = "barber" AND id = ?', [id]
    );

    if (barberRows.length === 0) {
      return res.status(404).json({ error: 'Barbiere non trovato' });
    }

    res.json({ barber: barberRows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel recuperare il barbiere' });
  }
});

module.exports = router;