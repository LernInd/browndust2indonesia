// src/react-app/App.tsx
import { useState, MouseEvent } from "react";
import "./App.css";
import HomePage from "./Home.tsx";
import AboutPage from "./About.tsx";
import TipsPage from "./TipsPage.tsx";
import SpoilerPage from "./SpoilerPage.tsx"; // Impor komponen Spoiler
import KarakterPage from "./KarakterPage.tsx"; // Impor komponen Karakter

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('beranda');

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    setCurrentPage(page);
    setIsMenuOpen(false);
  };
  
  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-title">Komunitas Brown Dust II Indonesia</div>
        <nav>
          <div
            className={`menu-icon ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* ... bar divs ... */}
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'beranda')}>Beranda</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'tips')}>Tips</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'karakter')}>Karakter</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'spoiler')}>Spoiler</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'tentang')}>Tentang Kami</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        {currentPage === 'beranda' && <HomePage />}
        {currentPage === 'tips' && <TipsPage />}
        {currentPage === 'karakter' && <KarakterPage />}
        {currentPage === 'spoiler' && <SpoilerPage />}
        {currentPage === 'tentang' && <AboutPage />}
      </main>
    </div>
  );
}

export default App;