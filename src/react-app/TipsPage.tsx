// src/react-app/TipsPage.tsx
import { useState, useMemo } from 'react';
import { tipsData, Tip } from './tips/index'; // Pastikan path ini benar
import './App.css';

const ITEMS_PER_PAGE = 3;

// Komponen untuk menampilkan daftar tips dan pagination
const TipsList = ({ tips, onTipSelect, currentPage, setCurrentPage, totalPages }: any) => {
  
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
      {tips.length > 0 ? (
        tips.map((tip: Tip) => (
          <div key={tip.id} className="tip-card" onClick={() => onTipSelect(tip)}>
            <h3>{tip.title}</h3>
            <p>{tip.shortDescription}</p>
          </div>
        ))
      ) : (
        <div className="content-card">
            <p>Tips tidak ditemukan.</p>
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

// Komponen untuk menampilkan detail sebuah tip
const TipDetail = ({ tip, onBack }: { tip: Tip; onBack: () => void; }) => {
  return (
    <div className="content-card">
      <h2>{tip.title}</h2>
      <p className="full-content">{tip.fullContent}</p>
        <button onClick={onBack} className="back-button">
        &larr; Kembali ke Daftar Tips
      </button>
    </div>
  );
};


const TipsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

  const filteredTips = useMemo(() => {
    return tipsData.filter(tip =>
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredTips.length / ITEMS_PER_PAGE);
  const paginatedTips = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTips.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTips, currentPage]);
  
  return (
    <div className="tips-container">
      {/* Search bar sekarang berada di luar logika kondisional */}
      {!selectedTip && (
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Cari tips..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>
      )}

      <div className="tips-content">
        
        {selectedTip ? (
          <TipDetail tip={selectedTip} onBack={() => setSelectedTip(null)} />
        ) : (
          <div className='sub-content'>
          <TipsList 
            tips={paginatedTips}
            onTipSelect={setSelectedTip}
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

export default TipsPage;