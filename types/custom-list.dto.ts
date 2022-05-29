export interface CustomList {
  id: number;
  title: string;
  movies?: Movie[];
}

export interface Movie {
  id: number;
  title: string;
  tmdbId: number;
  posterPath: string;
}
