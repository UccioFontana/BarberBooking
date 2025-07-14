const express = require('express');
const cors = require('cors');

const app = express();

//cors mi serve perchè il frontend (e quindi tutte le sorgenti delle richieste) vengono da una porta diversa
app.use(cors());

app.use(express.json());

//Richiesta Root
app.get('/', (req, res) => {
  res.send('API is running');
});

//rimando ad altri file quando vengono chiamate le api
const barbersRoutes = require('./routes/allbarbers');
const appointmentsRoutes = require('./routes/appointments');

app.use('/api/barbers', barbersRoutes);
app.use('/api/appointments', appointmentsRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));