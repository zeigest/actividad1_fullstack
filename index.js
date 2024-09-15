const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));


const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const Entry = mongoose.model('Entry', entrySchema);


const options = {
  key: fs.readFileSync(path.resolve('C:/Users/rober/OneDrive/Escritorio/Profesional Asociado en Desarrollo de Software/4 SEM/Desarrollo FullStack/Actividad_1/server/certificado/key.pem')),
  cert: fs.readFileSync(path.resolve('C:/Users/rober/OneDrive/Escritorio/Profesional Asociado en Desarrollo de Software/4 SEM/Desarrollo FullStack/Actividad_1/server/certificado/cert.pem'))
};


app.get('/api/entries', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las entradas' });
  }
});

// Ruta para añadir una nueva entrada
app.post('/api/entries', async (req, res) => {
  try {
    const newEntry = new Entry({
      title: req.body.title,
      content: req.body.content
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la entrada' });
  }
});

app.use(express.static(path.join(__dirname, '../mi-app-web/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../mi-app-web/build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});