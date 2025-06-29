import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Plus, Check, Download, Users, Share2, Heart, Star, Clock } from 'lucide-react';
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
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };
  
  return (
    <div className="animate-fadeIn pt-16">
      {/* Hero Section */}
      <div 
        className="relative w-full min-h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${content.backdropUrl})` }}
      >
        <div className="gradient-overlay"></div>
        
        <div className="absolute top-4 left-4 z-20">
          <button 
            onClick={onBack}
            className="p-3 bg-background/40 rounded-full backdrop-blur-sm hover:bg-background/60 transition hover:scale-110"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        
        {/* Content Info */}
        <div className="relative z-10 h-full flex flex-col justify-end px-8 pb-12">
          <div className="max-w-4xl">
            {/* Content Type Badge */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-3 py-1 bg-primary/90 text-white text-sm font-bold rounded">
                {content.type === 'movie' ? 'MOVIE' : 'SERIES'}
              </span>
              <div className="flex items-center space-x-1">
                <Star size={16} className="text-yellow-400 fill-current" />
                <span className="text-yellow-400 font-semibold">{content.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{content.title}</h1>
            
            <div className="flex items-center space-x-4 text-sm mb-4 flex-wrap">
              <span className="text-green-400 font-semibold bg-black/40 px-3 py-1 rounded">
                {Math.round(content.rating * 10)}% Match
              </span>
              <span className="bg-black/40 px-3 py-1 rounded">{content.year}</span>
              <span className="px-3 py-1 border border-gray-500 text-xs bg-black/40 rounded">
                {content.maturityRating}
              </span>
              {'duration' in content ? (
                <div className="flex items-center space-x-1 bg-black/40 px-3 py-1 rounded">
                  <Clock size={14} />
                  <span>{content.duration}</span>
                </div>
              ) : (
                <span className="bg-black/40 px-3 py-1 rounded">{(content as any).seasons} Seasons</span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {content.genres.map(genre => (
                <span key={genre} className="text-xs px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full border border-white/20">
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="mb-6">
              <p className="text-lg leading-relaxed max-w-3xl">
                {showFullDescription ? content.description : 
                  content.description.length > 300 ? 
                    `${content.description.substring(0, 300)}...` : 
                    content.description
                }
              </p>
              {content.description.length > 300 && (
                <button 
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-primary hover:underline mt-2 text-sm"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowTrailer(true)} 
                className="netflix-button flex items-center gap-2 bg-white text-black hover:bg-gray-200 shadow-lg"
              >
                <Play size={18} />
                <span>Play</span>
              </button>
              
              <button 
                onClick={handleAddToOffline} 
                className={`netflix-button-secondary flex items-center gap-2 shadow-lg ${
                  isInOfflineList ? 'bg-green-500/20 border-green-500/50' : ''
                }`}
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
                onClick={() => setIsLiked(!isLiked)}
                className={`netflix-button-secondary flex items-center gap-2 shadow-lg ${
                  isLiked ? 'bg-red-500/20 border-red-500/50 text-red-400' : ''
                }`}
              >
                <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
              
              <button 
                onClick={() => setShowWatchPartyModal(true)} 
                className="netflix-button-secondary flex items-center gap-2 shadow-lg"
              >
                <Users size={18} />
                <span>Watch Together</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="netflix-button-secondary flex items-center gap-2 shadow-lg"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Details & Recommendations */}
      <div className="px-8 py-8 space-y-8">
        {/* Similar content */}
        <ContentRow 
          title="More Like This" 
          contents={movieService.getContentByGenre(content.genres[0]).filter(c => c.id !== content.id).slice(0, 10)}
          onSelectContent={(id) => {
            setContent(movieService.getContentById(id) || null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        
        {/* Same genre content */}
        {content.genres.length > 1 && (
          <ContentRow 
            title={`More ${content.genres[1]} ${content.type === 'movie' ? 'Movies' : 'Shows'}`}
            contents={movieService.getContentByGenre(content.genres[1]).filter(c => c.id !== content.id).slice(0, 10)}
            onSelectContent={(id) => {
              setContent(movieService.getContentById(id) || null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </div>
      
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src={`${content.trailerUrl}?autoplay=1&mute=0`} 
                title={`${content.title} Trailer`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg"
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
