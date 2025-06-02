import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, X, Sun, Moon, Film, Tv, Users } from 'lucide-react';
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
  const { searchQuery, updateSearchQuery, contentFilter, setContentFilter } = useContent();
  const { currentProfile } = useProfile();
  
  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8 py-3 ${
        isScrolled || isSearchOpen ? 'bg-background shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side: Logo and navigation */}
        <div className="flex items-center">
          {/* Logo */}
          <h1 
            className="text-primary text-2xl font-bold mr-10 cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            STREAMIFY
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button 
              className="text-sm font-medium hover:text-primary transition"
              onClick={() => navigateTo('home')}
            >
              Home
            </button>
            <button 
              className="text-sm font-medium hover:text-primary transition"
              onClick={() => setContentFilter(ContentType.TvShow)}
            >
              TV Shows
            </button>
            <button 
              className="text-sm font-medium hover:text-primary transition"
              onClick={() => setContentFilter(ContentType.Movie)}
            >
              Movies
            </button>
            <button 
              className="text-sm font-medium hover:text-primary transition"
              onClick={() => navigateTo('mylist')}
            >
              My List
            </button>
          </nav>
        </div>
        
        {/* Right side: Search, notifications, profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className={`relative ${isSearchOpen ? 'w-64' : 'w-auto'}`}>
            {isSearchOpen ? (
              <div className="flex items-center bg-card/90 rounded-full pr-2 pl-4 border border-border">
                <input
                  type="text"
                  placeholder="Search titles..."
                  value={searchQuery}
                  onChange={(e) => updateSearchQuery(e.target.value)}
                  className="bg-transparent py-1 px-2 w-full focus:outline-none text-sm"
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-1 hover:text-primary transition"
              >
                <Search size={20} />
              </button>
            )}
          </div>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-1 hover:text-primary transition"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Kids Mode Toggle */}
          <button 
            onClick={toggleKidsMode}
            className={`p-1 transition ${kidsMode ? 'text-primary' : 'hover:text-primary'}`}
            title={kidsMode ? 'Exit Kids Mode' : 'Enter Kids Mode'}
          >
            <Users size={20} />
          </button>
          
          {/* Filter Buttons */}
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={() => setContentFilter(ContentType.Movie)}
              className={`p-1 transition ${contentFilter === ContentType.Movie ? 'text-primary' : 'hover:text-primary'}`}
              title="Show Movies"
            >
              <Film size={20} />
            </button>
            <button 
              onClick={() => setContentFilter(ContentType.TvShow)}
              className={`p-1 transition ${contentFilter === ContentType.TvShow ? 'text-primary' : 'hover:text-primary'}`}
              title="Show TV Shows"
            >
              <Tv size={20} />
            </button>
          </div>
          
          {/* Profile */}
          {currentProfile && (
            <button
              onClick={() => navigateTo('profile')}
              className="flex items-center"
            >
              <img 
                src={currentProfile.avatar} 
                alt={currentProfile.name}
                className="w-8 h-8 rounded object-cover"
              />
            </button>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border animate-fadeIn">
          <nav className="flex flex-col p-4 space-y-3">
            <button 
              className="text-left py-2 hover:text-primary transition"
              onClick={() => {
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
            >
              Home
            </button>
            <button 
              className="text-left py-2 hover:text-primary transition"
              onClick={() => {
                setContentFilter(ContentType.TvShow);
                setIsMobileMenuOpen(false);
              }}
            >
              TV Shows
            </button>
            <button 
              className="text-left py-2 hover:text-primary transition"
              onClick={() => {
                setContentFilter(ContentType.Movie);
                setIsMobileMenuOpen(false);
              }}
            >
              Movies
            </button>
            <button 
              className="text-left py-2 hover:text-primary transition"
              onClick={() => {
                navigateTo('mylist');
                setIsMobileMenuOpen(false);
              }}
            >
              My List
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;