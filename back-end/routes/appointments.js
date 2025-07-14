const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/appointments?barber_id=1&date=2025-06-22
router.get('/', async (req, res) => {
  const { barber_id, date } = req.query;

  if (!barber_id || !date) {
    return res.status(400).json({ error: 'barber_id e date sono richiesti' });
  }

  try {
    const [rows] = await db.query(
      'SELECT time, client_name, client_phone FROM appointments WHERE barber_id = ? AND date = ?',
      [barber_id, date]
    );
    res.json({ appointments: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel recuperare gli appuntamenti' });
  }
});

// POST /api/appointments
router.post('/', async (req, res) => {
  const { barber_id, date, time, client_name, client_phone } = req.body;

  if (!barber_id || !date || !time || !client_name || !client_phone) {
    return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
  }

  try {
    // Controlla se la fascia oraria è già prenotata
    const [existing] = await db.query(
      'SELECT id FROM appointments WHERE barber_id = ? AND date = ? AND time = ?',
      [barber_id, date, time]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Fascia oraria già prenotata' });
    }

    // Inserisci la nuova prenotazione
    const [result] = await db.query(
      'INSERT INTO appointments (barber_id, date, time, client_name, client_phone) VALUES (?, ?, ?, ?, ?)',
      [barber_id, date, time, client_name, client_phone]
    );

    res.status(201).json({ message: 'Prenotazione confermata', appointmentId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel creare la prenotazione' });
  }
});

module.exports = router;