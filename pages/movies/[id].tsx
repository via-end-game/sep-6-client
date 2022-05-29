import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FavoriteListButton,
  ToCustomListButton,
} from '../../components/Button/Button';
import CrewProfilePreviewList from '../../components/CrewProfilePreviewList';
import MediaContentPreview from '../../components/MediaContentPreview';
import MediaPageTrailer from '../../components/MediaPageTrailer';
import { Heading1Text, Heading2Text } from '../../components/Text/Text';
import styles from '../../styles/Mov.module.css';
import { ListOfMedia } from '../../types/list-of-media.dto';
import { Crew, MovieCredits } from '../../types/movie-credits.dto';
import { MovieReleaseDates } from '../../types/movie-release-dates.dto';
import { MovieReviews } from '../../types/movie-reviews.dto';
import { MovieVideos } from '../../types/movie-videos.dto';
import { Movie } from '../../types/movie.dto';
import { getNumberWithCommas, getNumberWithSpaces } from '../../utils/numbers';
import { getMovieVideos } from '../../utils/requests';
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
    getMovieVideos(id),
    getSimilarMovies(id),
  ]);

  return {
    props: {
      movie: responses[0] as Movie,
      movieCredits: responses[1] as MovieCredits,
      movieReleaseDates: responses[2] as MovieReleaseDates,
      movieReviews: responses[3] as MovieReviews,
      movieVideos: responses[4] as MovieVideos,
      similarMovies: responses[5] as ListOfMedia,
    },
  };
};

interface Props {
  movie: Movie;
  movieCredits: MovieCredits;
  movieReleaseDates: MovieReleaseDates;
  movieReviews: MovieReviews;
  movieVideos: MovieVideos;
  similarMovies: ListOfMedia;
}

const MoviePage: NextPage<Props> = ({
  movie,
  movieCredits,
  movieVideos,
  // movieReleaseDates,
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

  const handleAddToFavorites = async (
    genre: string,
    posterPath: string,
    rating: number,
    title: string,
    tmdbID: number
  ) => {
    const response = await fetch(
      'https://europe-west3-sep6-351006.cloudfunctions.net/add_movie_to_user_list',
      {
        method: 'POST',
        body: JSON.stringify({
          genre,
          posterPath,
          rating,
          title,
          tmdbID,
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (response.ok) return console.log('Movie added to your favorite list');

    return console.error(
      'Error while trying to add the movie to the favortie list'
    );
  };

  return (
    <main>
      <section className={styles.overviewSection} id="overview">
        <div className={styles.backdrop}>
          <div className={styles.backdropImageContainer}>
            <Image
              alt={`${movie.title} backdrop`}
              layout="fill"
              objectFit="cover"
              priority={true}
              src={getResourcePath(movie.backdrop_path)}
              unoptimized={true}
            />
          </div>
          <div className={styles.backdropPlayContainer}>
            <Image alt="" height={16} src="/assets/icons/play.svg" width={16} />
          </div>
        </div>
        <div className={`${styles.overviewContainer} page-container`}>
          <div className={styles.posterGroup}>
            <div className={styles.posterImageContainer}>
              <Image
                alt={`${movie.title} poster`}
                layout="fill"
                objectFit="cover"
                priority={true}
                src={getResourcePath(movie.poster_path)}
                unoptimized={true}
              />
            </div>
            <ToCustomListButton mediaType="movie" />
            <div className={styles.score}>
              <p className={styles.raiting}>
                {String(movie.vote_average).replace('.', ',')}
                <span className={styles.raitingOf}> / 10</span>
              </p>
              <button className={styles.share}>
                <div className={styles.shareIconContainer}>
                  <Image
                    alt=""
                    height={16}
                    src="/assets/icons/share.svg"
                    unoptimized={true}
                    width={16}
                  />
                </div>
                SHARE
              </button>
            </div>
            <p className={styles.raitingVotes}>
              {getNumberWithSpaces(movie.vote_count)}
            </p>
            <div className={styles.rate}>
              <p className={styles.rateText}>Rate this</p>
              <div className={styles.rateStars}>
                <Image
                  alt=""
                  height={14}
                  src="/assets/icons/star-full.svg"
                  unoptimized={true}
                  width={14}
                />
                <Image
                  alt=""
                  height={14}
                  src="/assets/icons/star-full.svg"
                  unoptimized={true}
                  width={14}
                />
                <Image
                  alt=""
                  height={14}
                  src="/assets/icons/star-full.svg"
                  unoptimized={true}
                  width={14}
                />
                <Image
                  alt=""
                  height={14}
                  src="/assets/icons/star-full.svg"
                  unoptimized={true}
                  width={14}
                />
                <Image
                  alt=""
                  height={14}
                  src="/assets/icons/star-full.svg"
                  unoptimized={true}
                  width={14}
                />
                <Image
                  alt=""
                  height={14}
                  src="/assets/icons/star-full.svg"
                  unoptimized={true}
                  width={14}
                />
                <Image
                  alt=""
                  height={14}
                  src="/assets/icons/star-full.svg"
                  unoptimized={true}
                  width={14}
                />
                <Image
                  alt=""
                  height={14}
                  src="/assets/icons/star.svg"
                  unoptimized={true}
                  width={14}
                />
                <Image
                  alt=""
                  height={14}
                  src="/assets/icons/star.svg"
                  unoptimized={true}
                  width={14}
                />
              </div>
            </div>
          </div>
          <div className={styles.overview}>
            <div className={styles.overviewTitle}>
              <Heading1Text>{movie.title}</Heading1Text>
            </div>
            <div className={styles.overviewOffsetContainer}>
              <p className={styles.overviewDescription}>{movie.overview}</p>
              <div className={styles.feedbacks}>
                <div className={styles.feedback}>
                  <p className={styles.feedbackTitle}>Popularity</p>
                  <p className={styles.feedbackValue}>17 (+7)</p>
                </div>
                <div className={styles.feedback}>
                  <p className={styles.feedbackTitle}>Reviews</p>
                  <p className={styles.feedbackValue}>
                    {getNumberWithSpaces(movieReviews.results.length)}
                  </p>
                </div>
              </div>
              <FavoriteListButton
                handler={() =>
                  handleAddToFavorites(
                    movie.genres[0].name || 'default',
                    movie.poster_path,
                    movie.vote_average,
                    movie.title,
                    movie.id
                  )
                }
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className={`${styles.castAndCrewSection} page-container`}
        id="cast-and-crew"
      >
        <Heading2Text>Cast & {'\n'}Crew</Heading2Text>
        <div className={styles.crewAndCastNames}>
          <div className={styles.topCasts}>
            {movieCredits.cast.slice(0, 3).map(({ character, id, name }) => (
              <div className={styles.topCast} key={id}>
                <p className={styles.topCastCharacter}>
                  {character.replaceAll('/', '\n')}
                </p>
                <div>
                  <p className={styles.topCastName}>{name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.topCrews}>
            {movieExecutors.directors.length > 0 && (
              <div className={styles.topCrew}>
                <p className={styles.topCrewJob}>
                  Director{movieExecutors.directors.length > 1 && 's'}
                </p>
                <p className={styles.topCrewName}>
                  {movieExecutors.directors.map(({ name }) => name).join(', ')}
                </p>
              </div>
            )}

            {movieExecutors.writers.length > 0 && (
              <div className={styles.topCrew}>
                <p className={styles.topCrewJob}>
                  Writer{movieExecutors.writers.length > 1 && 's'}
                </p>
                <p className={styles.topCrewName}>
                  {movieExecutors.writers.map(({ name }) => name).join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className={styles.videosSection} id="videos">
        <div className={`${styles.videoSectionTitle} page-container`}>
          <Heading2Text>Videos</Heading2Text>
        </div>
        <div className={styles.videosList}>
          {movieVideos.results
            .filter(
              ({ type }) => type === 'Trailer' || type === 'Behind the Scenes'
            )
            .map(({ id, key, name }) => (
              <MediaPageTrailer id={key} key={id} title={name} />
            ))}
        </div>
      </section>
      <section className={styles.castSection} id="cast">
        <div className={`${styles.castSectionTitle} page-container`}>
          <Heading2Text>Cast</Heading2Text>
          <p className={styles.castSectionSubTitle}>
            Cast overview, first billed only
          </p>
          <div className={styles.castList}>
            <CrewProfilePreviewList
              list={[...movieCredits.cast].splice(0, 10)}
            />
          </div>
        </div>
      </section>
      <section className={styles.boxOfficeSection} id="box-office">
        <div className="page-container">
          <Heading2Text>Box {'\n'}office</Heading2Text>
          <div className={styles.boxOfficeBudgets}>
            <div className={styles.boxOfficeBudgetTitleWrapper}>
              <p className={styles.boxOfficeBudgetTitle}>Budget</p>
            </div>
            <p className={styles.boxOfficeBudgetValue}>
              ${getNumberWithCommas(movie.budget)}
            </p>
            <div className={styles.boxOfficeBudgetTitleWrapper}>
              <p className={styles.boxOfficeBudgetTitle}>
                Cumulative Worldwide Gross
              </p>
            </div>
            <p
              className={`${styles.boxOfficeBudgetValue} ${styles.boxOfficeBudgetValueRevenue}`}
            >
              ${getNumberWithCommas(movie.revenue)}
            </p>
          </div>
        </div>
      </section>
      <section className={styles.moreLikeThis} id="more-like-this">
        <div className="page-container">
          <div className={styles.moreLikeThisTitle}>
            <Heading2Text>More {'\n'}Like This</Heading2Text>
          </div>
          <div className={styles.mediaRecommandationList}>
            {[...similarMovies.results]
              .splice(0, 8)
              .map(({ id, poster_path, title }) => (
                <MediaContentPreview
                  key={id}
                  link={`/movies/${id}`}
                  posterPath={getResourcePath(poster_path)}
                  title={title}
                />
              ))}
          </div>
        </div>
      </section>
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

const getSimilarMovies = (id: string): Promise<ListOfMedia> =>
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

export default MoviePage;
