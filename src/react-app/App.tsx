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
        <div className="nav-title">Brown Dust II</div>
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
            <li><a href="#">About Game</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Media</a></li>
            <li><a href="#">Guide</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <div className="content-card">
          <h2>Galeri Komunitas</h2>
          <p>Bagikan momen petualangan terbaik Anda. Unggah screenshot atau fan art untuk dilihat oleh petualang lainnya.</p>
          
          <form onSubmit={handleSubmit} className="upload-form">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <div className="file-input" onClick={handleLabelClick}>
              {selectedFile ? selectedFile.name : "Klik untuk memilih gambar..."}
            </div>

            <button type="submit" className="submit-button" disabled={!selectedFile || uploading}>
              {uploading ? "Mengunggah..." : "Unggah"}
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}
          
          {uploadedImageUrl && (
            <div className="upload-result">
              <h3>Berhasil Diunggah!</h3>
              <img src={uploadedImageUrl} alt="Uploaded content" />
              <p>
                <a href={uploadedImageUrl} target="_blank" rel="noopener noreferrer">
                  Lihat gambar
                </a>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;