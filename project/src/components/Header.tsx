import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, X, Sun, Moon, Film, Tv, Users, Home, List } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useContent } from '../contexts/ContentContext';
import { useProfile } from '../contexts/ProfileContext';
import { ContentType } from '../types/content';

interface HeaderProps {
  navigateTo: (page: 'home' | 'profile' | 'detail' | 'mylist') => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { theme, toggleTheme, kidsMode, toggleKidsMode } = useTheme();
  const { searchQuery, updateSearchQuery, contentFilter, setContentFilter, searchResults } = useContent();
  const { currentProfile } = useProfile();
  
  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearchOpen && !(event.target as Element).closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);
  
  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8 py-3 ${
        isScrolled || isSearchOpen ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side: Logo and navigation */}
        <div className="flex items-center">
          {/* Logo */}
          <h1 
            className="text-primary text-2xl font-bold mr-10 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigateTo('home')}
          >
            STREAMIFY
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button 
              className="text-sm font-medium hover:text-primary transition flex items-center gap-2"
              onClick={() => navigateTo('home')}
            >
              <Home size={16} />
              Home
            </button>
            <button 
              className={`text-sm font-medium hover:text-primary transition flex items-center gap-2 ${
                contentFilter === ContentType.TvShow ? 'text-primary' : ''
              }`}
              onClick={() => setContentFilter(ContentType.TvShow)}
            >
              <Tv size={16} />
              TV Shows
            </button>
            <button 
              className={`text-sm font-medium hover:text-primary transition flex items-center gap-2 ${
                contentFilter === ContentType.Movie ? 'text-primary' : ''
              }`}
              onClick={() => setContentFilter(ContentType.Movie)}
            >
              <Film size={16} />
              Movies
            </button>
            <button 
              className="text-sm font-medium hover:text-primary transition flex items-center gap-2"
              onClick={() => navigateTo('mylist')}
            >
              <List size={16} />
              My List
            </button>
          </nav>
        </div>
        
        {/* Right side: Search, notifications, profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className={`relative search-container ${isSearchOpen ? 'w-64' : 'w-auto'}`}>
            {isSearchOpen ? (
              <div className="relative">
                <div className="flex items-center bg-card/90 rounded-full pr-2 pl-4 border border-border backdrop-blur-sm">
                  <input
                    type="text"
                    placeholder="Search titles..."
                    value={searchQuery}
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    className="bg-transparent py-2 px-2 w-full focus:outline-none text-sm"
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      setIsSearchOpen(false);
                      updateSearchQuery('');
                    }}
                    className="hover:text-primary transition"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* Search Results Dropdown */}
                {searchQuery && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md rounded-lg border border-border shadow-xl max-h-64 overflow-y-auto">
                    {searchResults.slice(0, 5).map(result => (
                      <button
                        key={result.id}
                        onClick={() => {
                          navigateTo('detail', result.id);
                          setIsSearchOpen(false);
                          updateSearchQuery('');
                        }}
                        className="w-full flex items-center p-3 hover:bg-muted/50 transition text-left"
                      >
                        <img 
                          src={result.posterUrl} 
                          alt={result.title}
                          className="w-10 h-14 object-cover rounded mr-3"
                        />
                        <div>
                          <div className="font-medium text-sm">{result.title}</div>
                          <div className="text-xs text-muted-foreground">{result.year} • {result.genres[0]}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-primary transition hover:bg-muted/20 rounded-full"
              >
                <Search size={20} />
              </button>
            )}
          </div>
          
          {/* Notifications */}
          <button 
            className="p-2 hover:text-primary transition hover:bg-muted/20 rounded-full relative"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full text-xs"></span>
          </button>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 hover:text-primary transition hover:bg-muted/20 rounded-full"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Kids Mode Toggle */}
          <button 
            onClick={toggleKidsMode}
            className={`p-2 transition hover:bg-muted/20 rounded-full ${kidsMode ? 'text-primary bg-primary/10' : 'hover:text-primary'}`}
            title={kidsMode ? 'Exit Kids Mode' : 'Enter Kids Mode'}
          >
            <Users size={20} />
          </button>
          
          {/* Profile */}
          {currentProfile && (
            <button
              onClick={() => navigateTo('profile')}
              className="flex items-center hover:opacity-80 transition"
            >
              <img 
                src={currentProfile.avatar} 
                alt={currentProfile.name}
                className="w-8 h-8 rounded object-cover border-2 border-transparent hover:border-primary transition"
              />
            </button>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-muted/20 rounded-full transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border animate-fadeIn">
          <nav className="flex flex-col p-4 space-y-3">
            <button 
              className="text-left py-3 px-2 hover:text-primary hover:bg-muted/20 rounded transition flex items-center gap-3"
              onClick={() => {
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
            >
              <Home size={18} />
              Home
            </button>
            <button 
              className="text-left py-3 px-2 hover:text-primary hover:bg-muted/20 rounded transition flex items-center gap-3"
              onClick={() => {
                setContentFilter(ContentType.TvShow);
                setIsMobileMenuOpen(false);
              }}
            >
              <Tv size={18} />
              TV Shows
            </button>
            <button 
              className="text-left py-3 px-2 hover:text-primary hover:bg-muted/20 rounded transition flex items-center gap-3"
              onClick={() => {
                setContentFilter(ContentType.Movie);
                setIsMobileMenuOpen(false);
              }}
            >
              <Film size={18} />
              Movies
            </button>
            <button 
              className="text-left py-3 px-2 hover:text-primary hover:bg-muted/20 rounded transition flex items-center gap-3"
              onClick={() => {
                navigateTo('mylist');
                setIsMobileMenuOpen(false);
              }}
            >
              <List size={18} />
              My List
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
