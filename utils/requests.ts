import { ListOfMedia } from '../types/list-of-media.dto';

export const getPopularMovies = (): Promise<ListOfMedia> =>
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

export const getTredingMoviesThisWeek = (): Promise<ListOfMedia> =>
  fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

export const getTrendingTVThisWeek = (): Promise<ListOfMedia> =>
  fetch(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());
