import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { ContentProvider } from './contexts/ContentContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <ContentProvider>
          <AppRoutes />
        </ContentProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;