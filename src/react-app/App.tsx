// src/react-app/App.tsx
import { useState } from "react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-title">Komunitas Brown Dust II Indonesia</div>
        <nav>
          <div
            className={`menu-icon ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="/">Beranda</a></li>
            <li><a href="#">Tips</a></li>
            <li><a href="#">Karakter</a></li>
            <li><a href="#">Spoiler</a></li>
            <li><a href="#">Tentang Kami</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <div className="content-card">
          <h2>Komunitas Brown Dust II Indonesia</h2>
          <p>
            Tempat buat kalian paham seluk beluk permainan Brown Dust 2 menggunakan bahasa indonesia.
            Berisi kumpulan tips bermain, pengenalan karakter, dan alur cerita yang di translasikan ke bahasa indonesia.
            Mari bergabung dalam komunitas dan ikut berkontribusi untuk membangun komunitas game
            yang sehat, saling membantu, dan selalu menghormati.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;