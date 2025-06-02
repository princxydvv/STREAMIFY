import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import HeroSection from '../components/HeroSection';
import ContentRow from '../components/ContentRow';
import * as movieService from '../services/movieService';
import { ContentType } from '../types/content';

interface HomePageProps {
  onSelectContent: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectContent }) => {
  const { kidsMode } = useTheme();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const genres = movieService.getGenres();
  
  // Get content based on mode and filters
  const getFeatured = () => movieService.getFeaturedContent();
  const getTrending = () => kidsMode ? movieService.getKidsContent().slice(0, 10) : movieService.getTrendingContent();
  const getTopRated = () => movieService.getTopRatedContent().filter(content => !kidsMode || ['G', 'PG', 'TV-Y', 'TV-G', 'TV-PG'].includes(content.maturityRating));
  
  return (
    <div className="animate-fadeIn">
      {/* Hero Section with Featured Content */}
      <HeroSection 
        content={getFeatured()} 
        onPlay={() => onSelectContent(getFeatured().id)}
        onMoreInfo={() => onSelectContent(getFeatured().id)}
      />
      
      <div className="content-section pb-20">
        {/* Trending Now */}
        <ContentRow 
          title="Trending Now" 
          contents={getTrending()} 
          onSelectContent={onSelectContent}
        />
        
        {/* Top Rated */}
        <ContentRow 
          title="Top Rated" 
          contents={getTopRated()} 
          onSelectContent={onSelectContent}
        />
        
        {/* Recommended For You */}
        <ContentRow 
          title="Recommended For You" 
          contents={movieService.getRecommendedContent().filter(
            content => !kidsMode || ['G', 'PG', 'TV-Y', 'TV-G', 'TV-PG'].includes(content.maturityRating)
          )} 
          onSelectContent={onSelectContent}
        />
        
        {/* Movies */}
        <ContentRow 
          title="Movies" 
          contents={movieService.getContentByType(ContentType.Movie).filter(
            content => !kidsMode || ['G', 'PG'].includes(content.maturityRating)
          )} 
          onSelectContent={onSelectContent}
        />
        
        {/* TV Shows */}
        <ContentRow 
          title="TV Shows" 
          contents={movieService.getContentByType(ContentType.TvShow).filter(
            content => !kidsMode || ['TV-Y', 'TV-G', 'TV-PG'].includes(content.maturityRating)
          )} 
          onSelectContent={onSelectContent}
        />
        
        {/* Display content by selected genre */}
        {selectedGenre && (
          <ContentRow 
            title={genres.find(g => g.id === selectedGenre)?.name || selectedGenre}
            contents={movieService.getContentByGenre(selectedGenre).filter(
              content => !kidsMode || ['G', 'PG', 'TV-Y', 'TV-G', 'TV-PG'].includes(content.maturityRating)
            )}
            onSelectContent={onSelectContent}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;