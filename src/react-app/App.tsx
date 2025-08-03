// src/react-app/App.tsx
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadedImageUrl(null);
      setError(null);
    }
  };

  const handleLabelClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Silakan pilih file untuk diunggah.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengunggah file.");
      }

      setUploadedImageUrl(data.url);
    } catch (err: any) {
      setError(err.message);
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
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