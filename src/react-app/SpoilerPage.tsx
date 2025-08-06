// src/react-app/SpoilerPage.tsx
import { useState, useMemo } from 'react';
import { spoilerData } from './spoiler/index';
import type { Spoiler, SpoilerContent } from './spoiler/index';
import './SpoilerPage.css';
import { SocialLinks } from './SocialLinks'; // Komponen baru untuk social links

const ITEMS_PER_PAGE = 3;

// Komponen untuk menampilkan daftar spoiler dan pagination
const SpoilerList = ({ spoilers, onSpoilerSelect, currentPage, setCurrentPage, totalPages }: any) => {
  
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
      {spoilers.length > 0 ? (
        spoilers.map((spoiler: Spoiler) => (
          <div key={spoiler.id} className="spoiler-card" onClick={() => onSpoilerSelect(spoiler)}>
            <h3>{spoiler.title}</h3>
            {/* Jika ingin menampilkan preview, ambil dari contents tipe text */}
            {spoiler.contents && spoiler.contents.find(c => c.type === 'text') && (
              <p>{(spoiler.contents.find(c => c.type === 'text') as any).value.slice(0, 100)}...</p>
            )}
          </div>
        ))
      ) : (
        <div className="content-card">
            <p>Spoiler tidak ditemukan.</p>
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

// Komponen untuk menampilkan detail sebuah spoiler
const SpoilerDetail = ({ spoiler, onBack }: { spoiler: Spoiler; onBack: () => void; }) => {
  return (
    <div className="content-card">
      <h2>{spoiler.title}</h2>
      {spoiler.author && <p className="author-name">Penulis: {spoiler.author}</p>}
      {spoiler.contents && spoiler.contents.map((content: SpoilerContent, idx: number) => {
        if (content.type === 'text') {
          return <p key={idx} className="full-content">{content.value}</p>;
        }
        if (content.type === 'image') {
          return (
            <div key={idx} className="image-block">
              <img src={content.url} alt={content.caption || spoiler.title} className="content-image" />
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
      {spoiler.socialLinks && <SocialLinks links={spoiler.socialLinks} />}
      <button onClick={onBack} className="back-button">
        &larr; Kembali ke Daftar Spoiler
      </button>
    </div>
  );
};


const SpoilerPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpoiler, setSelectedSpoiler] = useState<Spoiler | null>(null);

  const filteredSpoilers = useMemo(() => {
    return spoilerData.filter(spoiler =>
      spoiler.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredSpoilers.length / ITEMS_PER_PAGE);
  const paginatedSpoilers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSpoilers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredSpoilers, currentPage]);
  
  return (
    <div className="spoiler-container">
      {!selectedSpoiler && (
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Cari spoiler..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>
      )}

      <div className="spoiler-content">
        
        {selectedSpoiler ? (
          <SpoilerDetail spoiler={selectedSpoiler} onBack={() => setSelectedSpoiler(null)} />
        ) : (
          <div className='sub-content'>
          <SpoilerList 
            spoilers={paginatedSpoilers}
            onSpoilerSelect={setSelectedSpoiler}
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

export default SpoilerPage;