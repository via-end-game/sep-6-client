import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { getYear } from '../../utils/date';
import {
  getSortedSearchResults,
  SortedSearchResults,
} from '../../utils/mediaContent';
import styles from './Search.module.css';

interface Props {}

const Search: React.FC<Props> = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [results, setResults] = useState<SortedSearchResults>({
    movie: [],
    tv: [],
    person: [],
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearch = useDebounce(searchQuery);

  const handleSetSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setIsShowingResults(false);
  }, [router.asPath]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as HTMLElement))
        setIsShowingResults(false);
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  useEffect(() => {
    if (!debouncedSearch) {
      setIsShowingResults(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);

      const data = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${debouncedSearch}&api_key=29419379954cba9df0d48fa8ae0e4f89`
      ).then((response) => response.json());

      setResults(getSortedSearchResults(data.results));
      setIsShowingResults(true);
      setIsLoading(false);
    };

    fetchData();
  }, [debouncedSearch]);

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <div className={styles.searchInputContainer}>
        Search component:
        <input
          className={styles.searchInput}
          onFocus={() => setIsShowingResults(true)}
          onChange={handleSetSearchQuery}
          placeholder="search"
          type="search"
        />
        {isLoading && <p>Loading...</p>}
      </div>
      {isShowingResults && (
        <div className={styles.searchResults}>
          <div className={styles.searchResultsContainer}>
            {results.movie.length > 0 && (
              <div className={styles.resultType}>
                <p className={styles.resultTypeTitle}>Movies</p>
                <div className={styles.resultsList}>
                  {[...results.movie]
                    .splice(0, 5)
                    .map(
                      ({ id, overview, release_date, title, vote_average }) => (
                        <Link href={`/movies/${id}`} key={id}>
                          <a className={styles.result}>
                            <p className={styles.resultTitle}>{title}</p>
                            <div className={styles.resultAdditionalInfo}>
                              <p className={styles.resultInfo}>
                                {release_date
                                  ? getYear(release_date)
                                  : 'Unknown'}
                              </p>
                              <p className={styles.resultSeparator}>·</p>
                              <p className={styles.resultInfo}>
                                {vote_average || 'Unknown'}
                              </p>
                              <p className={styles.resultSeparator}>·</p>
                              <p className={styles.resultOverview}>
                                {overview}
                              </p>
                            </div>
                          </a>
                        </Link>
                      )
                    )}
                </div>
              </div>
            )}
            {results.tv.length > 0 && (
              <div className={styles.resultType}>
                <p className={styles.resultTypeTitle}>TV Shows</p>
                <div className={styles.resultsList}>
                  {[...results.tv]
                    .splice(0, 5)
                    .map(
                      ({
                        id,
                        overview,
                        first_air_date,
                        name,
                        vote_average,
                      }) => (
                        <Link href={`/movies/${id}`} key={id}>
                          <a className={styles.result}>
                            <p className={styles.resultTitle}>{name}</p>
                            <div className={styles.resultAdditionalInfo}>
                              <p className={styles.resultInfo}>
                                {first_air_date
                                  ? getYear(first_air_date)
                                  : 'Unknown'}
                              </p>
                              <p className={styles.resultSeparator}>·</p>
                              <p className={styles.resultInfo}>
                                {vote_average || 'Unknown'}
                              </p>
                              <p className={styles.resultSeparator}>·</p>
                              <p className={styles.resultOverview}>
                                {overview}
                              </p>
                            </div>
                          </a>
                        </Link>
                      )
                    )}
                </div>
              </div>
            )}
            {results.person.length > 0 && (
              <div className={styles.resultType}>
                <p className={styles.resultTypeTitle}>Persons</p>
                <div className={styles.resultsList}>
                  {[...results.person]
                    .splice(0, 5)
                    .map(({ id, gender, known_for_department, name }) => (
                      <Link href={`/persons/${id}`} key={id}>
                        <a className={styles.result}>
                          <p className={styles.resultTitle}>{name}</p>
                          <div className={styles.resultAdditionalInfo}>
                            <p className={styles.resultInfo}>
                              {gender
                                ? gender === 1
                                  ? 'Female'
                                  : 'Male'
                                : 'Unknown'}
                            </p>
                            <p className={styles.resultSeparator}>·</p>
                            <p className={styles.resultInfo}>
                              {known_for_department
                                ? known_for_department
                                : 'Unknown'}
                            </p>
                          </div>
                        </a>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
