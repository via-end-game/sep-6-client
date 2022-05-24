import { Cast } from '../types/movie-credits-based-on-actor';

export const getSortMediaByRating = (mediaContents: Cast[]) =>
  [...mediaContents].sort(
    (a, b) => b.vote_count - a.vote_count || b.vote_average - a.vote_average
  );

export const getSortMediaByYear = (mediaContents: Cast[]) =>
  [...mediaContents].sort(
    (a, b) =>
      new Date(b.release_date).valueOf() - new Date(a.release_date).valueOf()
  );
