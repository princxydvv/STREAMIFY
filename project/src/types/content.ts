export enum ContentType {
  MOVIE = 'movie',
  TV_SHOW = 'tv_show'
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  type: ContentType.MOVIE;
}

export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  type: ContentType.TV_SHOW;
}

export type Content = Movie | TvShow;

export interface ContentDetails extends Content {
  genres: Genre[];
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  tagline?: string;
}