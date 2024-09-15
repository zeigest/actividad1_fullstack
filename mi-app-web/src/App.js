import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import NotFound from './NotFound';
import Blog from './Blog'

function Home() {
  return (
    <section className="entries">
      <h1>Bienvenido a nuestro blog</h1>
      <p>Este es un blog para compartir información sobre tecnología, salud y medio ambiente.</p>
      <Blog />
    </section>
  );
}

function About() {
  return (
    <section className="entries">
      <h1>Acerca del sitio</h1>
      <p>Este es un sitio de práctica para la Actividad 1 para la materia Desarrollo Full Stack. <br />
         Alumno: Roberto Ismael Luna Ventura.
      </p>
    </section>
  );
}

function Contact() {
  return (
    <section className="entries">
      <h1>Contacto</h1>
      <p>Mi correo de contacto: roberto.ismael.luna@gmail.com</p>
    </section>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul className="nav-container">
              <li className="nav-button"><Link to="/">Inicio</Link></li>
              <li className="nav-button"><Link to="/conocenos">Conócenos</Link></li>
              <li className="nav-button"><Link to="/contacto">Contacto</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conocenos" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 Roberto Luna. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
