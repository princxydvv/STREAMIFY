import React from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { PlusCircle } from 'lucide-react';

const ProfileSelectionScreen: React.FC = () => {
  const { profiles, selectProfile } = useProfile();
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <h1 className="text-primary text-4xl font-bold mb-16">STREAMIFY</h1>
      
      <h2 className="text-2xl font-medium mb-8">Who's watching?</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <div 
            key={profile.id}
            className="flex flex-col items-center"
          >
            <button
              onClick={() => selectProfile(profile.id)}
              className="group transition-all duration-200"
            >
              <div 
                className={`profile-avatar ${profile.color} group-hover:border-white`}
              >
                {profile.id === '4' ? (
                  <div className="w-full h-full bg-muted/40 flex items-center justify-center">
                    <PlusCircle size={40} className="text-white/80" />
                  </div>
                ) : (
                  <img 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <p className="mt-2 text-center group-hover:text-white">{profile.name}</p>
            </button>
          </div>
        ))}
      </div>
      
      <button className="mt-16 px-5 py-2 border-2 border-gray-600 text-gray-400 hover:text-white hover:border-white transition">
        Manage Profiles
      </button>
    </div>
  );
};

export default ProfileSelectionScreen;