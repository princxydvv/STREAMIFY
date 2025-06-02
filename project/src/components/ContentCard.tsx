import React, { useState } from 'react';
import { Download, Play, Plus, Check, Info } from 'lucide-react';
import { Content } from '../types/content';
import { useContent } from '../contexts/ContentContext';

interface ContentCardProps {
  content: Content;
  onClick: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { offlineContent, addToOfflineContent, removeFromOfflineContent } = useContent();
  
  const isInOfflineList = offlineContent.some(item => item.id === content.id);
  
  const handleAddToOffline = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInOfflineList) {
      removeFromOfflineContent(content.id);
    } else {
      addToOfflineContent(content.id);
    }
  };
  
  return (
    <div 
      className="movie-card flex-shrink-0 w-[200px] h-[130px] md:w-[240px] md:h-[150px] cursor-pointer snap-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img 
        src={content.posterUrl} 
        alt={content.title} 
        className="w-full h-full object-cover rounded-md"
      />
      
      {isHovered && (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-t from-black/90 via-black/60 to-black/30 rounded-md">
          <div className="flex justify-between items-start">
            <div className="flex space-x-1">
              <button 
                className="bg-white rounded-full p-1 text-black hover:bg-white/90"
                onClick={(e) => {
                  e.stopPropagation();
                  // Play would be handled here
                }}
              >
                <Play size={18} fill="black" />
              </button>
            </div>
            
            <div className="flex space-x-1">
              <button 
                className="bg-gray-800/80 rounded-full p-1 text-white hover:bg-gray-700/80"
                onClick={handleAddToOffline}
                title={isInOfflineList ? "Remove from Downloads" : "Download"}
              >
                {isInOfflineList ? <Check size={18} /> : <Download size={18} />}
              </button>
              
              <button 
                className="bg-gray-800/80 rounded-full p-1 text-white hover:bg-gray-700/80"
                title="More Info"
              >
                <Info size={18} />
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold truncate">{content.title}</h3>
            <div className="flex items-center text-xs space-x-2">
              <span className="text-green-400">{Math.round(content.rating * 10)}%</span>
              <span>{content.year}</span>
            </div>
            <div className="text-xs text-gray-300 mt-1">
              {content.genres.slice(0, 2).join(' • ')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentCard;