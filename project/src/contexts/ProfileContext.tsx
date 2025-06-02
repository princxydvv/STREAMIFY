import React, { createContext, useContext, useState } from 'react';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isKids: boolean;
}

interface ProfileContextType {
  profiles: Profile[];
  currentProfile: Profile | null;
  selectProfile: (profileId: string) => void;
}

const defaultProfiles: Profile[] = [
  {
    id: '1',
    name: 'User 1',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    color: 'border-primary',
    isKids: false,
  },
  {
    id: '2',
    name: 'User 2',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    color: 'border-blue-500',
    isKids: false,
  },
  {
    id: '3',
    name: 'Kids',
    avatar: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    color: 'border-accent',
    isKids: true,
  },
  {
    id: '4',
    name: 'Add Profile',
    avatar: 'https://images.pexels.com/photos/1069084/pexels-photo-1069084.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    color: 'border-gray-500',
    isKids: false,
  },
];

const ProfileContext = createContext<ProfileContextType>({
  profiles: defaultProfiles,
  currentProfile: null,
  selectProfile: () => {},
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles] = useState<Profile[]>(defaultProfiles);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  const selectProfile = (profileId: string) => {
    const profile = profiles.find((p) => p.id === profileId) || null;
    setCurrentProfile(profile);
    
    // If it's a kids profile, enable kids mode
    if (profile?.isKids) {
      document.documentElement.classList.add('kids');
    } else {
      document.documentElement.classList.remove('kids');
    }
  };

  return (
    <ProfileContext.Provider value={{ profiles, currentProfile, selectProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};