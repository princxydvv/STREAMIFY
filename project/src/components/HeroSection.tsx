import React, { useState, useEffect } from 'react';
import { Play, Info, Users, Volume2, VolumeX } from 'lucide-react';
import { Content } from '../types/content';
import WatchPartyModal from './WatchPartyModal';

interface HeroSectionProps {
  content: Content;
  onPlay: () => void;
  onMoreInfo: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content, onPlay, onMoreInfo }) => {
  const [showWatchPartyModal, setShowWatchPartyModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    // Auto-show trailer preview after 3 seconds
    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [content.id]);

  if (!content) return null;

  const { title, description, backdropUrl, year, maturityRating } = content;
  
  // Truncate description if too long
  const truncatedDescription = description.length > 200 
    ? `${description.substring(0, 200)}...` 
    : description;

  return (
    <div 
      className="hero-section relative w-full bg-center bg-cover" 
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      {/* Gradient Overlay */}
      <div className="gradient-overlay"></div>
      
      {/* Trailer Background Video (Simulated) */}
      {showTrailer && (
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-blue-900/20 to-purple-900/20 animate-pulse"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-8 pb-24">
        <div className="max-w-2xl animate-slideUp">
          {/* Content Type Badge */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-1 bg-primary/80 text-white text-xs font-bold rounded">
              {content.type === 'movie' ? 'MOVIE' : 'SERIES'}
            </span>
            {showTrailer && (
              <span className="px-2 py-1 bg-green-500/80 text-white text-xs font-bold rounded animate-pulse">
                PREVIEW
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg">{title}</h1>
          
          <div className="flex items-center space-x-4 text-sm mb-4">
            <span className="text-green-400 font-semibold bg-black/30 px-2 py-1 rounded">
              {Math.round(content.rating * 10)}% Match
            </span>
            <span className="bg-black/30 px-2 py-1 rounded">{year}</span>
            <span className="px-2 py-1 border border-gray-500 text-xs bg-black/30 rounded">
              {maturityRating}
            </span>
            {'duration' in content && (
              <span className="bg-black/30 px-2 py-1 rounded">{content.duration}</span>
            )}
          </div>
          
          <p className="text-lg mb-6 text-gray-200 drop-shadow-md max-w-xl leading-relaxed">
            {truncatedDescription}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onPlay} 
              className="netflix-button flex items-center gap-2 bg-white text-black hover:bg-gray-200 shadow-lg"
            >
              <Play size={18} />
              <span>Play</span>
            </button>
            
            <button 
              onClick={onMoreInfo} 
              className="netflix-button-secondary flex items-center gap-2 shadow-lg"
            >
              <Info size={18} />
              <span>More Info</span>
            </button>
            
            <button 
              onClick={() => setShowWatchPartyModal(true)} 
              className="netflix-button-secondary flex items-center gap-2 shadow-lg"
            >
              <Users size={18} />
              <span>Watch Together</span>
            </button>
            
            {/* Audio Control */}
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="netflix-button-secondary flex items-center gap-2 shadow-lg ml-auto"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
          
          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {content.genres.slice(0, 3).map(genre => (
              <span 
                key={genre} 
                className="text-xs px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition cursor-pointer"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      
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

export default HeroSection;
