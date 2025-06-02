import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Content } from '../types/content';
import ContentCard from './ContentCard';

interface ContentRowProps {
  title: string;
  contents: Content[];
  onSelectContent: (id: string) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, contents, onSelectContent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      const newScrollLeft = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (!contents || contents.length === 0) {
    return null;
  }

  return (
    <div 
      className="mb-8 relative" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="section-title">{title}</h2>
      
      {/* Navigation Arrows */}
      {isHovered && contents.length > 4 && (
        <>
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 p-2 rounded-full text-white opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 p-2 rounded-full text-white opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Content Row */}
      <div className="row-container" ref={rowRef}>
        {contents.map(content => (
          <ContentCard
            key={content.id}
            content={content}
            onClick={() => onSelectContent(content.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentRow;