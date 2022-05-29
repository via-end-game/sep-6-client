import type { NextPage } from 'next';
import MediaContentPreview from '../../components/MediaContentPreview';
import styles from '../../styles/UserList.module.css';
import { CustomListPage } from '../../types/custom-list-page.dto';
import { getResourcePath } from '../../utils/tmdbResources';

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const responses = await Promise.all([getCustomList(parseInt(id))]);

  return {
    props: {
      customList: responses[0][0],
    },
  };
};

interface Props {
  customList: CustomListPage;
}

const UserListPage: NextPage<Props> = ({ customList }) => {
  return (
    <main className="page-container">
      <div className={styles.userContainer}>
        <p className={styles.title}>
          {customList.username}
          {"'"}s {customList.title}
        </p>
      </div>
      <div className={styles.movies}>
        {customList.movies.length > 0 &&
          customList.movies.map(({ id, posterPath, title, tmdbId }) => (
            <MediaContentPreview
              key={id}
              link={`/movies/${tmdbId}`}
              posterPath={getResourcePath(posterPath)}
              title={title}
            />
          ))}
      </div>
    </main>
  );
};

const getCustomList = (customListId: number): Promise<CustomListPage[]> =>
  fetch(
    `${process.env.GCF_URL}/get_movies_by_userid_and_userListid?userId=${customListId}`
  ).then((res) => res.json());

export default UserListPage;
