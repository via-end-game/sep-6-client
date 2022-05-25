import { Cast } from '../types/movie-credits-based-on-actor';
import { SearchResultModel } from '../types/search.dto';

export const getSortMediaByRating = (mediaContents: Cast[]) =>
  [...mediaContents].sort(
    (a, b) => b.vote_count - a.vote_count || b.vote_average - a.vote_average
  );

export const getSortMediaByYear = (mediaContents: Cast[]) =>
  [...mediaContents].sort(
    (a, b) =>
      new Date(b.release_date).valueOf() - new Date(a.release_date).valueOf()
  );

export interface SortedSearchResults {
  movie: SearchResultModel[];
  tv: SearchResultModel[];
  person: SearchResultModel[];
}

export const getSortedSearchResults = (
  searchResults: SearchResultModel[]
): SortedSearchResults => {
  const sortedResults: SortedSearchResults = {
    movie: [],
    tv: [],
    person: [],
  };

  searchResults.map((result) => sortedResults[result.media_type].push(result));

  return sortedResults;
};
