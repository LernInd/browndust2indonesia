// src/react-app/KarakterPage.tsx
import { useState, useMemo } from 'react';
import { karakterData, Karakter } from './karakter/index';
import './KarakterPage.css';

const ITEMS_PER_PAGE = 3;

// Komponen untuk menampilkan daftar karakter dan pagination
const KarakterList = ({ karakters, onKarakterSelect, currentPage, setCurrentPage, totalPages }: any) => {
  
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      {karakters.length > 0 ? (
        karakters.map((karakter: Karakter) => (
          <div key={karakter.id} className="karakter-card" onClick={() => onKarakterSelect(karakter)}>
            <h3>{karakter.title}</h3>
            <p>{karakter.shortDescription}</p>
          </div>
        ))
      ) : (
        <div className="content-card">
            <p>Karakter tidak ditemukan.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {renderPageNumbers()}
        </div>
      )}
    </>
  );
};

// Komponen untuk menampilkan detail sebuah karakter
const KarakterDetail = ({ karakter, onBack }: { karakter: Karakter; onBack: () => void; }) => {
  return (
    <div className="content-card">
      <h2>{karakter.title}</h2>
      <p className="full-content">{karakter.fullContent}</p>
        <button onClick={onBack} className="back-button">
        &larr; Kembali ke Daftar Karakter
      </button>
    </div>
  );
};


const KarakterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKarakter, setSelectedKarakter] = useState<Karakter | null>(null);

  const filteredKarakters = useMemo(() => {
    return karakterData.filter(karakter =>
      karakter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      karakter.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredKarakters.length / ITEMS_PER_PAGE);
  const paginatedKarakters = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredKarakters.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredKarakters, currentPage]);
  
  return (
    <div className="karakter-container">
      {!selectedKarakter && (
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Cari karakter..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>
      )}

      <div className="karakter-content">
        
        {selectedKarakter ? (
          <KarakterDetail karakter={selectedKarakter} onBack={() => setSelectedKarakter(null)} />
        ) : (
          <div className='sub-content'>
          <KarakterList 
            karakters={paginatedKarakters}
            onKarakterSelect={setSelectedKarakter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default KarakterPage;