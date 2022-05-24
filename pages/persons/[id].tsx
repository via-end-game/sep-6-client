import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { LoadMoreButton } from '../../components/Button/Button';
import Filmography from '../../components/Filmography';
import MediaContentPreview from '../../components/MediaContentPreview';
import { Heading1Text, Heading2Text } from '../../components/Text/Text';
import styles from '../../styles/Persons.module.css';
import { MovieCreditsBasedOnActor } from '../../types/movie-credits-based-on-actor';
import { Person } from '../../types/person.dto';
import { splitArrayToChunks } from '../../utils/arrays';
import { getAge, getExplicitDate } from '../../utils/date';
import {
  getSortMediaByRating as getMediaSortedByRating,
  getSortMediaByYear as getMediaSortedByYear,
} from '../../utils/mediaContent';
import { getResourcePath } from '../../utils/tmdbResources';

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const responses = await Promise.all([
    getDetailedInfoActorFetch(id),
    getMoviesActorPlayedIn(id),
  ]);
  return {
    props: {
      actor: responses[0] as Person,
      movieCredits: responses[1] as MovieCreditsBasedOnActor,
    },
  };
};

interface Props {
  actor: Person;
  movieCredits: MovieCreditsBasedOnActor;
}

const ActorPage: NextPage<Props> = ({ actor, movieCredits }) => {
  const [mediaSortedByRating] = useState(
    splitArrayToChunks(
      getMediaSortedByRating(movieCredits.cast).splice(0, 9),
      3
    )
  );
  const [mediaSortedByYear] = useState(getMediaSortedByYear(movieCredits.cast));

  return (
    <>
      <main className={styles.personPage}>
        <section className={styles.profile} id="profile">
          <Image
            alt={`${actor} profile`}
            height={525}
            objectFit="cover"
            src={getResourcePath(actor.profile_path)}
            width={415}
          />
          <div className={styles.profileDetails}>
            <div className={styles.profileName}>
              <Heading1Text>{actor.name}</Heading1Text>
            </div>
            <p className={styles.profileActivity}>
              Acting / Production / Writing / Creator
            </p>
          </div>
        </section>
        <section
          className={`${styles.biography} page-container`}
          id="biography"
        >
          <Heading2Text>Biography</Heading2Text>
          <p className={styles.biographyDescription}>{actor.biography}</p>
          <div className={styles.biographyReadMoreButton}>
            <LoadMoreButton text="read" />
          </div>
        </section>
        <section
          className={`${styles.personalInformation} page-container`}
          id="personal-information"
        >
          <Heading2Text>Personal {'\n'}Information</Heading2Text>
          <div className={styles.personalInformationBar}>
            <div className={styles.personalInformationBarElement}>
              <p className={styles.personalInformationTitle}>Place of Birth</p>
              <p className={styles.personalInformationValue}>
                {actor.place_of_birth}
              </p>
            </div>
            <div className={styles.personalInformationBarElement}>
              <p className={styles.personalInformationTitle}>About</p>
              <p className={styles.personalInformationValue}>
                {`${actor.known_for_department}, \n${
                  actor.id === 1 ? 'Female' : 'Male'
                }`}
              </p>
            </div>
            <div className={styles.personalInformationBarElement}>
              <p className={styles.personalInformationTitle}>Birthday</p>
              <p className={styles.personalInformationValue}>
                {`${getExplicitDate(actor.birthday)}, \n${getAge(
                  actor.birthday
                )} years old`}
              </p>
            </div>
          </div>
        </section>
        <section className={`${styles.knownFor} page-container`} id="known-for">
          <div className={styles.knownForHeading}>
            <Heading2Text>Known {'\n'}For</Heading2Text>
          </div>
          <div className={styles.knownForMediaList}>
            {mediaSortedByRating.map((mediaContents, i) => (
              <div key={mediaContents.reduce((s, e) => `${s}${e}`, `${i}`)}>
                {mediaContents.map(({ id, poster_path, title }) => (
                  <MediaContentPreview
                    key={id}
                    link={`/movies/${id}`}
                    posterPath={getResourcePath(poster_path || '')}
                    title={title}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
        <section
          className={`${styles.filmography} page-container`}
          id="filmography"
        >
          <div className={styles.filmographyHeader}>
            <Heading2Text>Filmography</Heading2Text>
          </div>
          <div className={styles.filmographyInformation}>
            <div className={styles.filmographyDepartaments}>
              <button
                className={`${styles.filmographyDepartament} ${styles.filmographyDepartamentSelected}`}
              >
                Acting
                <span className={styles.filmographyDepartamentAmount}>
                  - {movieCredits.cast.length}
                </span>
              </button>
              <p className={styles.filmographyDepartament}>Production</p>
              <p className={styles.filmographyDepartament}>Writing</p>
              <p className={styles.filmographyDepartament}>Creator</p>
            </div>
            <div className={styles.filmographyList}>
              {mediaSortedByYear.map(
                ({ character, id, release_date, title }) => (
                  <Filmography
                    character={character}
                    id={id}
                    key={id}
                    title={title}
                    year={
                      release_date
                        ? parseInt(release_date.split('-')[0])
                        : 'Unknown'
                    }
                  />
                )
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const getDetailedInfoActorFetch = (id: string): Promise<Person> =>
  fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

const getMoviesActorPlayedIn = (
  id: string
): Promise<MovieCreditsBasedOnActor> =>
  fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

export default ActorPage;
