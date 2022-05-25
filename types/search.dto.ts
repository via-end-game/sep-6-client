export interface SearchModel {
  page: number;
  results: SearchResultModel[];
  total_pages: number;
  total_results: number;
}

export interface SearchResultModel {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  gender?: number;
  known_for_department?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}
