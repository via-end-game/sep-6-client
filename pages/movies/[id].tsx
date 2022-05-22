import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import MediaContent from '../../components/MediaContent';
import { ListOfMedia } from '../../types/list-of-media.dto';
import { Crew, MovieCredits } from '../../types/movie-credits.dto';
import { MovieReleaseDates } from '../../types/movie-release-dates.dto';
import { MovieReviews } from '../../types/movie-reviews.dto';
import { Movie } from '../../types/movie.dto';

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
    getSimilarMovies(id),
  ]);

  return {
    props: {
      movie: responses[0] as Movie,
      movieCredits: responses[1] as MovieCredits,
      movieReleaseDates: responses[2] as MovieReleaseDates,
      movieReviews: responses[3] as MovieReviews,
      similarMovies: responses[4] as ListOfMedia,
    },
  };
};

interface Props {
  movie: Movie;
  movieCredits: MovieCredits;
  movieReleaseDates: MovieReleaseDates;
  movieReviews: MovieReviews;
  similarMovies: ListOfMedia;
}

const MoviePage: NextPage<Props> = ({
  movie,
  movieCredits,
  movieReleaseDates,
  movieReviews,
  similarMovies,
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
    <>
      <MediaContent
        backdropPath={movie.backdrop_path}
        cast={movieCredits.cast.slice(0, 20)}
        directors={movieExecutors.directors}
        genre={movie.genres[0].name}
        overview={movie.overview}
        posterPath={movie.poster_path}
        releaseDate={movie.release_date}
        reviewsCount={movieReviews.total_results}
        restrictionAge={
          movieReleaseDates.results.find((e) => e.iso_3166_1 === 'DK')
            ?.release_dates[0].certification || '0'
        }
        runTime={movie.runtime}
        similarMediaContent={similarMovies.results}
        title={movie.title}
        voteAverage={movie.vote_average}
        voteCount={movie.vote_count}
        writers={movieExecutors.writers}
      />
    </>
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

const getSimilarMovies = (id: string): Promise<ListOfMedia> =>
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

export default MoviePage;
