import { useState, ChangeEvent, FormEvent } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
import honoLogo from "./assets/hono.svg";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setUploadedImageUrl(null);
      setError(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Silakan pilih file terlebih dahulu.");
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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://hono.dev/" target="_blank">
          <img src={honoLogo} className="logo" alt="Hono logo" />
        </a>
        <a href="https://workers.cloudflare.com/" target="_blank">
          <img
            src={cloudflareLogo}
            className="logo cloudflare"
            alt="Cloudflare logo"
          />
        </a>
      </div>
      <h1>Cloudflare Workers + Cloudinary</h1>
      <div className="card">
        <h2>Unggah Gambar ke Cloudinary</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button type="submit" disabled={!selectedFile || uploading}>
            {uploading ? "Mengunggah..." : "Unggah"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {uploadedImageUrl && (
          <div style={{ marginTop: "20px" }}>
            <h3>Gambar Berhasil Diunggah:</h3>
            <img
              src={uploadedImageUrl}
              alt="Uploaded content"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
            <p>
              <a href={uploadedImageUrl} target="_blank" rel="noopener noreferrer">
                Lihat gambar
              </a>
            </p>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Proyek ini sekarang terhubung dengan Cloudinary melalui Cloudflare Workers.
      </p>
    </>
  );
}

export default App;