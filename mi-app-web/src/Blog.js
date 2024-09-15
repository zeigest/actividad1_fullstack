import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Blog() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/api/entries')
      .then((response) => setEntries(response.data))
      .catch((error) => console.error('Error al obtener las entradas:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/entries', newEntry)
      .then((response) => setEntries([response.data, ...entries]))
      .catch((error) => console.error('Error al añadir la entrada:', error));

    setNewEntry({ title: '', content: '' });
  };

  return (
    <div>
      <ul class ="survey-container">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <li class = "survey-entries" key={entry._id}>
              <h2>{entry.title}</h2>
              <p>{entry.content}</p>
              <p><strong>Fecha de publicación:</strong> {new Date(entry.date).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>No hay entradas disponibles.</p>
        )}
      </ul>
      

    <div class="nueva-entrada">
        Agrega una nueva entrada:
    </div>

      <form onSubmit={handleSubmit} className="entry-form">
        <input
          type="text"
          placeholder="Título"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
          className="input-title"
        />
        <textarea
          placeholder="Contenido"
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
          className="input-content"
        />
        <button type="submit" className="submit-button">Añadir entrada</button>
      </form>
    </div>
  );
}

export default Blog;
