import { Person } from '../../types/person.dto';
import { NextPage } from 'next';
import { getResourcePath } from '../../utils/tmdbResources';
import Image from 'next/image';
import styles from '../../styles/Actor.module.css';
import { MovieCreditsBasedOnActor } from '../../types/movie-credits-based-on-actor';

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
  return (
    <main className={styles.mainContainer}>
      <div>
        <Image
          className={styles.imageWrapper}
          alt={`${actor.name} cover`}
          height={430}
          src={getResourcePath(actor.profile_path)}
          width={360}
        />
        <div>
          <h1>Personal Info</h1>
        </div>

        <div>
          <h2>Known for</h2>
          <ul>
            <li>{actor.known_for_department}</li>
          </ul>
        </div>
        <div>
          <h2>Gender</h2>
          {actor.id == 1 ? <p>Female</p> : <p>Male</p>}
        </div>
        <div>
          <h2>Birthday: </h2>
          <p>{actor.birthday}</p>
        </div>
        <div>
          <h2>Place of Birth:</h2>
          <p>{actor.place_of_birth}</p>
        </div>
        <div>
          <h2>Also Known as </h2>
          <p>{actor.also_known_as}</p>
        </div>
        {actor.also_known_as.map((name) => (
          <div key={name}>{name}</div>
        ))}
      </div>

      <div>
        <h1>{`${actor.name}`}</h1>
        <h3>Biography</h3>
        <p>{`${actor.biography}`}</p>
        <div>
          <ul>
            {movieCredits.cast.map((movie) => (
              <div key={movie.id} className={styles.scrollmenu}>
                <Image
                  className={styles.imageWrapper}
                  alt={`${movie.title} title`}
                  height={430}
                  src={getResourcePath(movie.poster_path ?? '')}
                  width={360}
                />
                <p>
                  {movie.title} and {movie.popularity}
                </p>
              </div>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {movieCredits.cast.map((movie) => (
              <li key={movie.id}>
                <p>
                  `${movie.release_date}\t${movie.title}`
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
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
