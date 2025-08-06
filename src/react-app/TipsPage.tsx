// src/react-app/TipsPage.tsx
import { useState, useMemo } from 'react';
import { tipsData } from './tips/index';
import type { Tip, TipContent } from './tips/index';
import './App.css';
import { SocialLinks } from './SocialLinks';

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
            {/* Preview: ambil text pertama dari contents */}
            {tip.contents && tip.contents.find(c => c.type === 'text') && (
              <p>{(tip.contents.find(c => c.type === 'text') as any).value.slice(0, 100)}...</p>
            )}
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
      {tip.author && <p className="author-name">Penulis: {tip.author}</p>}
      {tip.contents && tip.contents.map((content: TipContent, idx: number) => {
        if (content.type === 'text') {
          return <p key={idx} className="full-content">{content.value}</p>;
        }
        if (content.type === 'image') {
          return (
            <div key={idx} className="image-block">
              <img src={content.url} alt={content.caption || tip.title} className="content-image" />
              {content.caption && <small>{content.caption}</small>}
            </div>
          );
        }
        if (content.type === 'video') {
          return (
            <div key={idx} className="video-container">
              <iframe
                src={content.url}
                title={content.caption || 'YouTube video player'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {content.caption && <small>{content.caption}</small>}
            </div>
          );
        }
        return null;
      })}
      {tip.socialLinks && <SocialLinks links={tip.socialLinks} />}
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
      (tip.contents && tip.contents.some(c => c.type === 'text' && c.value.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredTips.length / ITEMS_PER_PAGE);
  const paginatedTips = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTips.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTips, currentPage]);
  
  return (
    <div className="tips-container">
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

