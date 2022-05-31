export interface CustomListPage {
  id: number;
  title: string;
  avatarUrl: string;
  userID: number;
  username: string;
  movies: Movie[];
}

export interface Movie {
  id: number;
  title: string;
  tmdbId: number;
  posterPath: string;
}
