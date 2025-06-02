import React, { createContext, useContext, useState } from 'react';
import * as movieService from '../services/movieService';
import { Content, ContentType } from '../types/content';

interface WatchParty {
  id: string;
  contentId: string;
  friends: string[];
  scheduledFor?: Date;
}

interface ContentContextType {
  searchQuery: string;
  searchResults: Content[];
  updateSearchQuery: (query: string) => void;
  offlineContent: Content[];
  addToOfflineContent: (contentId: string) => void;
  removeFromOfflineContent: (contentId: string) => void;
  watchParties: WatchParty[];
  createWatchParty: (contentId: string, friends: string[]) => void;
  contentFilter: ContentType | null;
  setContentFilter: (filter: ContentType | null) => void;
}

const ContentContext = createContext<ContentContextType>({
  searchQuery: '',
  searchResults: [],
  updateSearchQuery: () => {},
  offlineContent: [],
  addToOfflineContent: () => {},
  removeFromOfflineContent: () => {},
  watchParties: [],
  createWatchParty: () => {},
  contentFilter: null,
  setContentFilter: () => {},
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Content[]>([]);
  const [offlineContent, setOfflineContent] = useState<Content[]>(
    movieService.getOfflineContentDetails()
  );
  const [watchParties, setWatchParties] = useState<WatchParty[]>([]);
  const [contentFilter, setContentFilter] = useState<ContentType | null>(null);

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
    setSearchResults(query ? movieService.searchContent(query) : []);
  };

  const addToOfflineContent = (contentId: string) => {
    const added = movieService.saveOfflineContent(contentId);
    if (added) {
      setOfflineContent(movieService.getOfflineContentDetails());
    }
  };

  const removeFromOfflineContent = (contentId: string) => {
    movieService.removeOfflineContent(contentId);
    setOfflineContent(movieService.getOfflineContentDetails());
  };

  const createWatchParty = (contentId: string, friends: string[]) => {
    const newWatchParty = {
      id: `wp-${Date.now()}`,
      contentId,
      friends,
      scheduledFor: new Date(Date.now() + 86400000), // 24 hours from now
    };
    
    setWatchParties([...watchParties, newWatchParty]);
    return newWatchParty;
  };

  return (
    <ContentContext.Provider
      value={{
        searchQuery,
        searchResults,
        updateSearchQuery,
        offlineContent,
        addToOfflineContent,
        removeFromOfflineContent,
        watchParties,
        createWatchParty,
        contentFilter,
        setContentFilter,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};