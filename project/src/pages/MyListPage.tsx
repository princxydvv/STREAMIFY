import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import ContentCard from '../components/ContentCard';

interface MyListPageProps {
  onSelectContent: (id: string) => void;
}

const MyListPage: React.FC<MyListPageProps> = ({ onSelectContent }) => {
  const { offlineContent } = useContent();
  
  return (
    <div className="pt-24 pb-16 px-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8">My Downloads</h1>
      
      {offlineContent.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {offlineContent.map(content => (
            <ContentCard
              key={content.id}
              content={content}
              onClick={() => onSelectContent(content.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-block p-6 rounded-full bg-muted/30 mb-4">
            <Download size={40} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your download list is empty</h2>
          <p className="text-muted-foreground">
            Click the download button on any movie or TV show to watch offline.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyListPage;