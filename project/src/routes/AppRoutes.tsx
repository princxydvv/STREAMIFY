import React, { useState, useEffect } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import ProfileSelectionScreen from '../pages/ProfileSelectionScreen';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import MyListPage from '../pages/MyListPage';
import Header from '../components/Header';

type AppPage = 'home' | 'profile' | 'detail' | 'mylist';

const AppRoutes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>('profile');
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const { currentProfile } = useProfile();

  // Reset to profile selection if no profile is selected
  useEffect(() => {
    if (!currentProfile && currentPage !== 'profile') {
      setCurrentPage('profile');
    }
  }, [currentProfile, currentPage]);

  // If profile is selected, go to home page
  useEffect(() => {
    if (currentProfile && currentPage === 'profile') {
      setCurrentPage('home');
    }
  }, [currentProfile, currentPage]);

  const navigateTo = (page: AppPage, contentId?: string) => {
    setCurrentPage(page);
    if (contentId) {
      setSelectedContentId(contentId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentProfile && currentPage !== 'profile' && (
        <Header navigateTo={navigateTo} />
      )}
      
      <main>
        {currentPage === 'profile' && (
          <ProfileSelectionScreen />
        )}
        
        {currentPage === 'home' && currentProfile && (
          <HomePage onSelectContent={(id) => navigateTo('detail', id)} />
        )}
        
        {currentPage === 'detail' && selectedContentId && (
          <DetailPage 
            contentId={selectedContentId} 
            onBack={() => navigateTo('home')} 
          />
        )}
        
        {currentPage === 'mylist' && (
          <MyListPage onSelectContent={(id) => navigateTo('detail', id)} />
        )}
      </main>
    </div>
  );
};

export default AppRoutes;