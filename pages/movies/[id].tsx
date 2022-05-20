import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CrewProfilePreview from '../../components/CrewProfilePreview';
import styles from '../../styles/Movie.module.css';
import { Crew, MovieCredits } from '../../types/movie-credits.dto';
import { MovieReleaseDates } from '../../types/movie-release-dates.dto';
import { MovieReviews } from '../../types/movie-reviews.dto';
import { Movie } from '../../types/movie.dto';
import { getMinutesToHoursAndMinutes } from '../../utils/time';
import { getResourcePath } from '../../utils/tmdbResources';

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const responses = await Promise.all([
    getMovieFetch(id),
    getMovieCreditsFetch(id),
    getMovieReleaseDatesFetch(id),
    getMovieReviewsFetch(id),
  ]);

  return {
    props: {
      movie: responses[0] as Movie,
      movieCredits: responses[1] as MovieCredits,
      movieReleaseDates: responses[2] as MovieReleaseDates,
      movieReviews: responses[3] as MovieReviews,
    },
  };
};

interface Props {
  movie: Movie;
  movieCredits: MovieCredits;
  movieReleaseDates: MovieReleaseDates;
  movieReviews: MovieReviews;
}

const MoviePage: NextPage<Props> = ({
  movie,
  movieCredits,
  movieReleaseDates,
  movieReviews,
}) => {
  const [movieExecutors, setMovieExecutors] = useState<{
    directors: Crew[];
    writers: Crew[];
  }>({ directors: [], writers: [] });

  useEffect(() => {
    console.log('Movie useEffect :: directors and writers trigger');

    const executors: {
      directors: Crew[];
      writers: Crew[];
    } = {
      directors: [],
      writers: [],
    };

    movieCredits.crew.map((c) => {
      if (c.job === 'Director') executors.directors.push(c);
      else if (c.job === 'Writer' || c.job === 'Novel')
        executors.writers.push(c);
    });

    setMovieExecutors(executors);
  }, [movieCredits.crew]);

  return (
    <main>
      <div className={styles.cover}>
        <Image
          alt={`${movie.title} cover`}
          height={469}
          src={getResourcePath(movie.backdrop_path)}
          width={1300}
        />
      </div>
      <div className={styles.movie}>
        <div className={styles.moviePreview}>
          <div className={styles.moviePoster}>
            <Image
              alt={movie.title}
              height={390}
              src={getResourcePath(movie.poster_path)}
              width={260}
            />
          </div>
          <div className="movie-rating">
            <div className={styles.movieVote}>
              <p className={styles.movieVoteScale}>
                <span className={styles.movieVoteAverage}>
                  {movie.vote_average}
                </span>
                /10
              </p>
              <p className={styles.movieShare}>Share</p>
            </div>
            <p className={styles.movieVoteCount}>{movie.vote_count}</p>
          </div>
          <div className="movie-rate">
            <p className="movie-rate__text">Rate this</p>
          </div>
        </div>
        <div className={styles.movieDetails}>
          <div className={styles.movieStats}>
            <div className={styles.movieInfo}>
              {
                movieReleaseDates.results.find((e) => e.iso_3166_1 === 'DK')
                  ?.release_dates[0].certification
              }
            </div>
            <div className={styles.movieInfo}>
              {getMinutesToHoursAndMinutes(movie.runtime)}
            </div>
            <div className={styles.movieInfo}>{movie.genres[0].name}</div>
            <div className={styles.movieInfo}>{movie.release_date}</div>
          </div>
          <h2 className={styles.movieTitle}>{movie.title}</h2>
          <div className={styles.movieDescription}>
            <p className={styles.movieOverview}>{movie.overview}</p>
            <div className={styles.postOverview}>
              <div>
                <div className={styles.movieRank}>
                  <Image
                    alt=""
                    height={40}
                    src="/assets/icons/rank-up.svg"
                    width={40}
                  />
                  <div>
                    <p className={styles.movieFactTitle}>Rank</p>
                    <p className={styles.movieFactInfo}>59</p>
                  </div>
                </div>
                <div className="movie-fact">
                  <p className={styles.movieFactTitle}>Reviews</p>
                  <p className={styles.movieFactInfo}>
                    {movieReviews.total_results}
                  </p>
                </div>
              </div>
              <button className={styles.uppercaseButton}>
                ADD TO WATCHLIST +
              </button>
            </div>
          </div>
          <div className="movie-credits">
            <h2 className={styles.movieCreditsHeader}>
              Director{movieExecutors.directors.length > 1 && 's'}
            </h2>
            {movieExecutors.directors.map(({ id, name, profile_path }) => (
              <CrewProfilePreview
                key={id}
                name={name}
                picturePath={getResourcePath(profile_path || '')}
              />
            ))}
          </div>
          <div className="movie-credits">
            <h2 className={styles.movieCreditsHeader}>
              Writer{movieExecutors.writers.length > 1 && 's'}
            </h2>
            {movieExecutors.writers.map(({ id, name, profile_path }) => (
              <CrewProfilePreview
                key={id}
                name={name}
                picturePath={getResourcePath(profile_path || '')}
              />
            ))}
          </div>
          <div className="movie-credits">
            <h2 className={styles.movieCreditsHeader}>Cast</h2>
            {movieCredits.cast
              .slice(0, 20)
              .map(({ character, id, name, profile_path }) => (
                <CrewProfilePreview
                  character={character}
                  key={id}
                  name={name}
                  picturePath={getResourcePath(profile_path || '')}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

const getMovieFetch = (id: string): Promise<Movie> =>
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

const getMovieReleaseDatesFetch = (id: string): Promise<MovieReleaseDates> =>
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

const getMovieCreditsFetch = (id: string): Promise<MovieCredits> =>
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

const getMovieReviewsFetch = (id: string): Promise<MovieReviews> =>
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

export default MoviePage;
