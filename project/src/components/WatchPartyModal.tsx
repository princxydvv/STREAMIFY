import React, { useState } from 'react';
import { X, Check, Calendar, Clock, Send } from 'lucide-react';
import { Content } from '../types/content';
import { useContent } from '../contexts/ContentContext';

interface WatchPartyModalProps {
  content: Content;
  onClose: () => void;
}

const mockFriends = [
  { id: 'f1', name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'f2', name: 'Sam Taylor', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'f3', name: 'Jordan Smith', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'f4', name: 'Casey Morgan', avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];

const WatchPartyModal: React.FC<WatchPartyModalProps> = ({ content, onClose }) => {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [watchDate, setWatchDate] = useState(new Date().toISOString().split('T')[0]);
  const [watchTime, setWatchTime] = useState('19:00');
  const [isCreated, setIsCreated] = useState(false);
  
  const { createWatchParty } = useContent();
  
  const toggleFriendSelection = (friendId: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId) 
        : [...prev, friendId]
    );
  };
  
  const handleCreateWatchParty = () => {
    if (selectedFriends.length === 0) return;
    
    createWatchParty(content.id, selectedFriends);
    setIsCreated(true);
    
    // Simulate sending invitations
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  
  if (isCreated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
        <div className="bg-card rounded-xl p-6 shadow-xl max-w-md w-full animate-fadeIn">
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check size={32} className="text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Watch Party Created!</h3>
            <p className="text-muted-foreground">Invites have been sent to your friends.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-card rounded-xl overflow-hidden shadow-xl max-w-md w-full animate-fadeIn">
        {/* Header */}
        <div className="relative p-4 border-b border-border">
          <h3 className="text-xl font-semibold text-center">Create Watch Party</h3>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content Preview */}
        <div className="flex p-4 border-b border-border">
          <img 
            src={content.posterUrl} 
            alt={content.title} 
            className="w-20 h-28 object-cover rounded-md"
          />
          <div className="ml-3 flex-1">
            <h4 className="font-medium">{content.title}</h4>
            <div className="flex text-sm space-x-2 text-muted-foreground">
              <span>{content.year}</span>
              <span>{content.maturityRating}</span>
            </div>
            <p className="text-sm mt-2 line-clamp-2 text-muted-foreground">
              {content.description}
            </p>
          </div>
        </div>
        
        {/* Watch Party Settings */}
        <div className="p-4 space-y-4">
          {/* Date and Time */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">When to watch?</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={watchDate}
                  onChange={(e) => setWatchDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-muted text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="time"
                  value={watchTime}
                  onChange={(e) => setWatchTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-muted text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
          
          {/* Friend Selection */}
          <div>
            <h4 className="text-sm font-medium mb-2">Invite friends</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {mockFriends.map(friend => (
                <div 
                  key={friend.id}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    selectedFriends.includes(friend.id) 
                      ? 'bg-primary/10 border border-primary/30' 
                      : 'bg-muted hover:bg-muted-foreground/10'
                  }`}
                  onClick={() => toggleFriendSelection(friend.id)}
                >
                  <img 
                    src={friend.avatar} 
                    alt={friend.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="ml-3 flex-1">{friend.name}</span>
                  {selectedFriends.includes(friend.id) && (
                    <Check size={18} className="text-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleCreateWatchParty}
            disabled={selectedFriends.length === 0}
            className={`w-full py-3 rounded-md flex items-center justify-center gap-2 ${
              selectedFriends.length === 0
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            <Send size={18} />
            <span>Send Invitations</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchPartyModal;