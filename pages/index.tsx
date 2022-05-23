import type { NextPage } from 'next';
import Head from 'next/head';
import MediaContentPreview from '../components/MediaContentPreview';
import { Heading1Text, Heading2Text } from '../components/Text/Text';
import TrailerPreview from '../components/TrailerPreview';
import styles from '../styles/Index.module.css';
import { ListOfMedia, SimilarMovieResult } from '../types/list-of-media.dto';
import { splitArrayToChunks } from '../utils/arrays';
import { getTredingMoviesThisWeek } from '../utils/requests';
import { getResourcePath } from '../utils/tmdbResources';

export const getServerSideProps = async () => {
  const [popularMovies] = await Promise.all([getTredingMoviesThisWeek()]);

  return {
    props: {
      popularMovies,
    },
  };
};

interface Props {
  popularMovies: ListOfMedia;
}

const Index: NextPage<Props> = ({ popularMovies }) => {
  return (
    <>
      <Head>
        <title>
          Best Movies - search for your favorite movies and TV shows
        </title>
      </Head>
      <main>
        <section
          className={styles.trendingMediaContent}
          id="trending-media-content"
        >
          <div
            className={styles.trendingHeadingContainer}
            style={{
              backgroundImage: `url(${getResourcePath(
                popularMovies.results[4].backdrop_path
              )})`,
            }}
          >
            <div className={styles.trendingHeading}>
              <Heading1Text>Trending Movies and TV Shows</Heading1Text>
            </div>
          </div>
          <div className={styles.trendingMediaContents}>
            {splitArrayToChunks(
              [...popularMovies.results].splice(0, 16),
              4
            ).map((column: SimilarMovieResult[], index: number) => (
              <div key={index} className={styles.trendingMediaColumn}>
                {column.map(({ id, poster_path, title }) => (
                  <div className={styles.mediaContentPreviewWrapper} key={id}>
                    <MediaContentPreview
                      link={`/movies/${id}`}
                      posterPath={getResourcePath(poster_path)}
                      showTitle={false}
                      title={title}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
        <section className={styles.latestTrailers} id="latest-trailers">
          <div className="page-container">
            <div className={styles.latestTrailersHeading}>
              <Heading2Text>Latest {'\n'}Trailers</Heading2Text>
            </div>
            <div className={styles.latestTrailersList}>
              <TrailerPreview
                description="Season 3 Official Trailer"
                thumbnailPath={
                  'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/Sh5LSKzJB3LiZw5bbK7BlCPy9c.jpg'
                }
                title="Love, Victor"
              />
              <TrailerPreview
                description="Volume 3 Final Trailer"
                thumbnailPath={
                  'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/nBrkOZyI75artyizuBFeya48KbO.jpg'
                }
                title="Love, Death & Robots"
              />
              <TrailerPreview
                description="Season 3 Official Trailer"
                thumbnailPath={
                  'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/qJxzjUjCpTPvDHldNnlbRC4OqEh.jpg'
                }
                title="The Umbrella Academy"
              />
              <TrailerPreview
                description="Season 3 Official Trailer"
                thumbnailPath={
                  'https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg'
                }
                title="The Boys"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
