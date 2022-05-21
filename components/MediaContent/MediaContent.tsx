import Image from 'next/image';
import { SimilarMovieResult } from '../../types/list-of-media.dto';
import { Cast, Crew } from '../../types/movie-credits.dto';
import { getNumberWithSpaces } from '../../utils/numbers';
import { getMinutesToHoursAndMinutes } from '../../utils/time';
import { getResourcePath } from '../../utils/tmdbResources';
import CrewProfilePreviewList from '../CrewProfilePreviewList';
import styles from './MediaContent.module.css';

interface Props {
  backdropPath: string;
  cast: Cast[];
  directors: Crew[];
  genre: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  reviewsCount: number;
  restrictionAge: string;
  runTime: number;
  similarMediaContent: SimilarMovieResult[];
  title: string;
  voteAverage: number;
  voteCount: number;
  writers: Crew[];
}

const MediaContent: React.FC<Props> = (props) => {
  return (
    <main>
      <div className={styles.cover}>
        <Image
          alt={`${props.title} cover`}
          height={469}
          src={getResourcePath(props.backdropPath)}
          width={1300}
        />
      </div>
      <div className={styles.movie}>
        <div className={styles.moviePreview}>
          <div className={styles.moviePoster}>
            <Image
              alt={props.title}
              height={390}
              src={getResourcePath(props.posterPath)}
              width={260}
            />
          </div>
          <div className="movie-rating">
            <div className={styles.movieVote}>
              <p className={styles.movieVoteScale}>
                <span className={styles.movieVoteAverage}>
                  {props.voteAverage}
                </span>
                /10
              </p>
              <p className={styles.movieShare}>
                <span className={styles.movieShareIcon}>
                  <Image
                    alt=""
                    height={13}
                    src="/assets/icons/share.svg"
                    width={13}
                  />
                </span>
                Share
              </p>
            </div>
            <p className={styles.movieVoteCount}>
              {getNumberWithSpaces(props.voteCount)}
            </p>
          </div>
          <div className="movie-rate">
            <p className={styles.movieRateText}>Rate this</p>
            <div className={styles.movieRateStars}>
              {[...Array(10)].map((k) => (
                <div key={k}>
                  <Image
                    alt=""
                    height={16}
                    src="/assets/icons/star.svg"
                    width={16}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.movieDetails}>
          <div className={styles.movieStats}>
            <div className={styles.movieInfo}>{props.restrictionAge}</div>
            <div className={styles.movieInfo}>
              {getMinutesToHoursAndMinutes(props.runTime)}
            </div>
            <div className={styles.movieInfo}>{props.genre}</div>
            <div className={styles.movieInfo}>{props.releaseDate}</div>
          </div>
          <h2 className={styles.movieTitle}>{props.title}</h2>
          <div className={styles.movieDescription}>
            <p className={styles.movieOverview}>{props.overview}</p>
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
                  <p className={styles.movieFactInfo}>{props.reviewsCount}</p>
                </div>
              </div>
              <button className={styles.uppercaseButton}>
                ADD TO WATCHLIST +
              </button>
            </div>
          </div>
          <div className={styles.movieCredits}>
            <h2 className={styles.movieCreditsHeader}>
              Director{props.directors.length > 1 && 's'}
            </h2>
            <CrewProfilePreviewList list={props.directors} />
          </div>
          <div className={styles.movieCredits}>
            <h2 className={styles.movieCreditsHeader}>
              Writer{props.writers.length > 1 && 's'}
            </h2>
            <CrewProfilePreviewList list={props.writers} />
          </div>
          <div className={styles.movieCredits}>
            <h2 className={styles.movieCreditsHeader}>Cast</h2>
            <CrewProfilePreviewList list={props.cast.slice(0, 20)} />
          </div>
        </div>
      </div>

      <div>
        <h2>Similar movies</h2>
        {props.similarMediaContent.map((mediaContent) => (
          <div key={mediaContent.id}>
            <Image
              alt={mediaContent.title}
              height={240}
              src={`https://image.tmdb.org/t/p/original${mediaContent.poster_path}`}
              width={240}
            />
            <h3>{mediaContent.title}</h3>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MediaContent;
