import { Movie, TvShow, ContentType, Genre } from '../types/content';

// Mock data for movies
const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 2010,
    rating: 8.8,
    duration: '2h 28m',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    type: ContentType.Movie,
    maturityRating: 'PG-13'
  },
  {
    id: '2',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    posterUrl: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 1994,
    rating: 9.3,
    duration: '2h 22m',
    genres: ['Drama'],
    trailerUrl: 'https://www.youtube.com/embed/NmzuHjWmXOc',
    type: ContentType.Movie,
    maturityRating: 'R'
  },
  {
    id: '3',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    posterUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 2008,
    rating: 9.0,
    duration: '2h 32m',
    genres: ['Action', 'Crime', 'Drama', 'Thriller'],
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    type: ContentType.Movie,
    maturityRating: 'PG-13'
  },
  {
    id: '4',
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    posterUrl: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 1994,
    rating: 8.9,
    duration: '2h 34m',
    genres: ['Crime', 'Drama'],
    trailerUrl: 'https://www.youtube.com/embed/s7EdQ4FqbhY',
    type: ContentType.Movie,
    maturityRating: 'R'
  },
  {
    id: '5',
    title: 'Forrest Gump',
    description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    posterUrl: 'https://images.pexels.com/photos/1590549/pexels-photo-1590549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/1590549/pexels-photo-1590549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 1994,
    rating: 8.8,
    duration: '2h 22m',
    genres: ['Drama', 'Romance'],
    trailerUrl: 'https://www.youtube.com/embed/uPIEn0M8su0',
    type: ContentType.Movie,
    maturityRating: 'PG-13'
  },
  {
    id: '6',
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterUrl: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 1999,
    rating: 8.7,
    duration: '2h 16m',
    genres: ['Action', 'Sci-Fi'],
    trailerUrl: 'https://www.youtube.com/embed/vKQi3bBA1y8',
    type: ContentType.Movie,
    maturityRating: 'R'
  },
  {
    id: '7',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    posterUrl: 'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 2014,
    rating: 8.6,
    duration: '2h 49m',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    trailerUrl: 'https://www.youtube.com/embed/2LqzF5WauAw',
    type: ContentType.Movie,
    maturityRating: 'PG-13'
  },
  {
    id: '8',
    title: 'The Lion King',
    description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    posterUrl: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 1994,
    rating: 8.5,
    duration: '1h 28m',
    genres: ['Animation', 'Adventure', 'Drama'],
    trailerUrl: 'https://www.youtube.com/embed/7TavVZMewpY',
    type: ContentType.Movie,
    maturityRating: 'G'
  }
];

// Mock data for TV shows
const mockTvShows: TvShow[] = [
  {
    id: '101',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    posterUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 2016,
    rating: 8.7,
    seasons: 4,
    genres: ['Drama', 'Fantasy', 'Horror'],
    trailerUrl: 'https://www.youtube.com/embed/mnd7sFt5c3A',
    type: ContentType.TvShow,
    maturityRating: 'TV-14'
  },
  {
    id: '102',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    posterUrl: 'https://images.pexels.com/photos/2146515/pexels-photo-2146515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/2146515/pexels-photo-2146515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 2008,
    rating: 9.5,
    seasons: 5,
    genres: ['Crime', 'Drama', 'Thriller'],
    trailerUrl: 'https://www.youtube.com/embed/HhesaQXLuRY',
    type: ContentType.TvShow,
    maturityRating: 'TV-MA'
  },
  {
    id: '103',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    posterUrl: 'https://images.pexels.com/photos/1682699/pexels-photo-1682699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/1682699/pexels-photo-1682699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 2016,
    rating: 8.7,
    seasons: 5,
    genres: ['Biography', 'Drama', 'History'],
    trailerUrl: 'https://www.youtube.com/embed/JWtnJjn6ng0',
    type: ContentType.TvShow,
    maturityRating: 'TV-MA'
  },
  {
    id: '104',
    title: 'Game of Thrones',
    description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    posterUrl: 'https://images.pexels.com/photos/673803/pexels-photo-673803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/673803/pexels-photo-673803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 2011,
    rating: 9.2,
    seasons: 8,
    genres: ['Action', 'Adventure', 'Drama'],
    trailerUrl: 'https://www.youtube.com/embed/KPLWWIOCOOQ',
    type: ContentType.TvShow,
    maturityRating: 'TV-MA'
  },
  {
    id: '105',
    title: 'The Mandalorian',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    posterUrl: 'https://images.pexels.com/photos/2085998/pexels-photo-2085998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/2085998/pexels-photo-2085998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 2019,
    rating: 8.8,
    seasons: 3,
    genres: ['Action', 'Adventure', 'Fantasy'],
    trailerUrl: 'https://www.youtube.com/embed/aOC8E8z_ifw',
    type: ContentType.TvShow,
    maturityRating: 'TV-14'
  },
  {
    id: '106',
    title: 'The Office',
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
    posterUrl: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 2005,
    rating: 8.9,
    seasons: 9,
    genres: ['Comedy'],
    trailerUrl: 'https://www.youtube.com/embed/LHOtME2DL4g',
    type: ContentType.TvShow,
    maturityRating: 'TV-14'
  },
  {
    id: '107',
    title: 'Friends',
    description: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
    posterUrl: 'https://images.pexels.com/photos/1782146/pexels-photo-1782146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdropUrl: 'https://images.pexels.com/photos/1782146/pexels-photo-1782146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    year: 1994,
    rating: 8.5,
    seasons: 10,
    genres: ['Comedy', 'Romance'],
    trailerUrl: 'https://www.youtube.com/embed/hDNNmeeJs1Q',
    type: ContentType.TvShow,
    maturityRating: 'TV-14'
  }
];

// Combine all content
const allContent = [...mockMovies, ...mockTvShows];

// Get all unique genres
export const getGenres = (): Genre[] => {
  const genreSet = new Set<string>();
  
  allContent.forEach(content => {
    content.genres.forEach(genre => {
      genreSet.add(genre);
    });
  });
  
  return Array.from(genreSet).map(genre => ({
    id: genre.toLowerCase().replace(/\s+/g, '-'),
    name: genre
  }));
};

// Get trending content (random selection for mock data)
export const getTrendingContent = () => {
  return shuffleArray([...allContent]).slice(0, 10);
};

// Get top rated content
export const getTopRatedContent = () => {
  return [...allContent].sort((a, b) => b.rating - a.rating).slice(0, 10);
};

// Get content by genre
export const getContentByGenre = (genreName: string) => {
  return allContent.filter(content => 
    content.genres.some(genre => genre.toLowerCase() === genreName.toLowerCase())
  );
};

// Get recommended content (random for this mock implementation)
export const getRecommendedContent = () => {
  return shuffleArray([...allContent]).slice(0, 8);
};

// Get content for kids (G, PG, and TV-Y/TV-G/TV-PG ratings)
export const getKidsContent = () => {
  return allContent.filter(content => 
    ['G', 'PG', 'TV-Y', 'TV-G', 'TV-PG'].includes(content.maturityRating)
  );
};

// Get content by type (movie or tv show)
export const getContentByType = (type: ContentType) => {
  return allContent.filter(content => content.type === type);
};

// Get content by ID
export const getContentById = (id: string) => {
  return allContent.find(content => content.id === id) || null;
};

// Search content by title
export const searchContent = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return allContent.filter(content => 
    content.title.toLowerCase().includes(lowercaseQuery) || 
    content.description.toLowerCase().includes(lowercaseQuery)
  );
};

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Save/get offline content from localStorage
export const saveOfflineContent = (contentId: string) => {
  const offlineContent = getOfflineContent();
  if (!offlineContent.includes(contentId)) {
    localStorage.setItem('streamify-offline-content', JSON.stringify([...offlineContent, contentId]));
    return true;
  }
  return false;
};

export const removeOfflineContent = (contentId: string) => {
  const offlineContent = getOfflineContent();
  const updatedContent = offlineContent.filter(id => id !== contentId);
  localStorage.setItem('streamify-offline-content', JSON.stringify(updatedContent));
};

export const getOfflineContent = (): string[] => {
  const savedContent = localStorage.getItem('streamify-offline-content');
  return savedContent ? JSON.parse(savedContent) : [];
};

export const getOfflineContentDetails = () => {
  const offlineIds = getOfflineContent();
  return allContent.filter(content => offlineIds.includes(content.id));
};

// Get featured content (random selection for hero section)
export const getFeaturedContent = () => {
  return shuffleArray([...allContent]).slice(0, 1)[0];
};

export default {
  getTrendingContent,
  getTopRatedContent,
  getContentByGenre,
  getRecommendedContent,
  getKidsContent,
  getContentByType,
  getContentById,
  searchContent,
  getGenres,
  saveOfflineContent,
  removeOfflineContent,
  getOfflineContent,
  getOfflineContentDetails,
  getFeaturedContent
};