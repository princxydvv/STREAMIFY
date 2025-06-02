import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Plus, Check, Download, Users } from 'lucide-react';
import * as movieService from '../services/movieService';
import { Content } from '../types/content';
import { useContent } from '../contexts/ContentContext';
import ContentRow from '../components/ContentRow';
import WatchPartyModal from '../components/WatchPartyModal';

interface DetailPageProps {
  contentId: string;
  onBack: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ contentId, onBack }) => {
  const [content, setContent] = useState<Content | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showWatchPartyModal, setShowWatchPartyModal] = useState(false);
  const { offlineContent, addToOfflineContent, removeFromOfflineContent } = useContent();
  
  const isInOfflineList = offlineContent.some(item => item.id === contentId);
  
  useEffect(() => {
    const fetchedContent = movieService.getContentById(contentId);
    if (fetchedContent) {
      setContent(fetchedContent);
    }
  }, [contentId]);
  
  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  const handleAddToOffline = () => {
    if (isInOfflineList) {
      removeFromOfflineContent(content.id);
    } else {
      addToOfflineContent(content.id);
    }
  };
  
  return (
    <div className="animate-fadeIn pt-16">
      {/* Hero Section */}
      <div 
        className="relative w-full min-h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${content.backdropUrl})` }}
      >
        <div className="gradient-overlay"></div>
        
        <div className="absolute top-4 left-4 z-20">
          <button 
            onClick={onBack}
            className="p-2 bg-background/40 rounded-full backdrop-blur-sm hover:bg-background/60 transition"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        
        {/* Content Info */}
        <div className="relative z-10 h-full flex flex-col justify-end px-8 pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{content.title}</h1>
            
            <div className="flex items-center space-x-4 text-sm mb-4">
              <span className="text-green-400 font-semibold">{Math.round(content.rating * 10)}% Match</span>
              <span>{content.year}</span>
              <span className="px-1 border border-gray-500 text-xs">{content.maturityRating}</span>
              {'duration' in content ? <span>{content.duration}</span> : <span>{(content as any).seasons} Seasons</span>}
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {content.genres.map(genre => (
                <span key={genre} className="text-xs px-2 py-1 bg-background/20 backdrop-blur-sm rounded-full">
                  {genre}
                </span>
              ))}
            </div>
            
            <p className="text-lg mb-6">{content.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowTrailer(true)} 
                className="netflix-button flex items-center gap-2 bg-white text-black"
              >
                <Play size={18} />
                <span>Play</span>
              </button>
              
              <button 
                onClick={handleAddToOffline} 
                className="netflix-button-secondary flex items-center gap-2"
              >
                {isInOfflineList ? (
                  <>
                    <Check size={18} />
                    <span>Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>Download</span>
                  </>
                )}
              </button>
              
              <button 
                onClick={() => setShowWatchPartyModal(true)} 
                className="netflix-button-secondary flex items-center gap-2"
              >
                <Users size={18} />
                <span>Watch Together</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Details & Recommendations */}
      <div className="px-8 py-8">
        {/* Similar content */}
        <ContentRow 
          title="More Like This" 
          contents={movieService.getContentByGenre(content.genres[0]).filter(c => c.id !== content.id)}
          onSelectContent={(id) => {
            setContent(movieService.getContentById(id) || null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
      
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white"
            >
              <X size={24} />
            </button>
            <div className="aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                src={`${content.trailerUrl}?autoplay=1&mute=0`} 
                title={`${content.title} Trailer`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      
      {/* Watch Party Modal */}
      {showWatchPartyModal && (
        <WatchPartyModal
          content={content}
          onClose={() => setShowWatchPartyModal(false)}
        />
      )}
    </div>
  );
};

export default DetailPage;