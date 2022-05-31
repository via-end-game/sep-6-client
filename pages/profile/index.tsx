import { GetServerSideProps, NextPage } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import MediaContentCustomList from '../../components/MediaContentCustomList';
import styles from '../../styles/Profile.module.css';
import { CustomList } from '../../types/custom-list.dto';
import { getResourcePath } from '../../utils/tmdbResources';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });

  if (session?.user?.id) {
    const responses = await Promise.all([
      getCustomLists(session?.user?.id || 1),
    ]);

    return {
      props: {
        customLists: responses[0],
      },
    };
  }

  return {
    props: {
      customLists: [],
    },
  };
};

interface Props {
  customLists: CustomList[];
}

const ProfilePage: NextPage<Props> = ({ customLists }) => {
  const { data } = useSession();

  const signOutHandler = () => {
    signOut();
  };

  return (
    <main className={styles.main}>
      <div className="page-container">
        <section className={styles.userInformation} id="profile-information">
          <div className={styles.userDetails}>
            <p className={styles.userName}>{data?.user?.name}</p>
            <p className={styles.userEmail}>{data?.user?.email}</p>
          </div>
          <button className={styles.signOut} onClick={signOutHandler}>
            Sign out
          </button>
        </section>
        <section id="custom-lists">
          <p className={styles.listTitle}>Eugeniu’s movie lists</p>
          <div className={styles.listContainer}>
            {customLists.length > 0 &&
              customLists.map(({ id, movies, title }) => (
                <MediaContentCustomList
                  amount={movies?.length || 0}
                  avatarUrl="https://www.themoviedb.org/t/p/w1280/tHsaqfauzG4MuFs5oCbq0pRy5EF.jpg"
                  genres={['Action', 'Drama', 'Thriller', 'Detective']}
                  listId={id}
                  key={id}
                  thumbnailUrl={
                    movies && movies.length
                      ? getResourcePath(movies[0].posterPath)
                      : ''
                  }
                  title={title}
                  userId={1}
                />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
};

const getCustomLists = (id: number): Promise<CustomList[]> =>
  fetch(`${process.env.GCF_URL}/get_movies_by_userid?userId=${id}`).then(
    (res) => res.json()
  );

export default ProfilePage;
