import React, { useState } from 'react';
import { Play, Info, Users } from 'lucide-react';
import { Content } from '../types/content';
import WatchPartyModal from './WatchPartyModal';

interface HeroSectionProps {
  content: Content;
  onPlay: () => void;
  onMoreInfo: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content, onPlay, onMoreInfo }) => {
  const [showWatchPartyModal, setShowWatchPartyModal] = useState(false);

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
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-8 pb-24">
        <div className="max-w-2xl animate-slideUp">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">{title}</h1>
          
          <div className="flex items-center space-x-4 text-sm mb-4">
            <span className="text-green-400 font-semibold">{Math.round(content.rating * 10)}% Match</span>
            <span>{year}</span>
            <span className="px-1 border border-gray-500 text-xs">{maturityRating}</span>
          </div>
          
          <p className="text-lg mb-6 text-gray-200">{truncatedDescription}</p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onPlay} 
              className="netflix-button flex items-center gap-2 bg-white text-black"
            >
              <Play size={18} />
              <span>Play</span>
            </button>
            
            <button 
              onClick={onMoreInfo} 
              className="netflix-button-secondary flex items-center gap-2"
            >
              <Info size={18} />
              <span>More Info</span>
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