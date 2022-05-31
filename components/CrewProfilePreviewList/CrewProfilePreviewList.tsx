import Link from 'next/link';
import { Cast } from '../../types/movie-credits.dto';
import { getResourcePath } from '../../utils/tmdbResources';
import CrewProfilePreview from '../CrewProfilePreview';
import styles from './CrewProfilePreviewList.module.css';

interface Props {
  list: Cast[];
}

const CrewProfilePreviewList: React.FC<Props> = ({ list }) => (
  <div className={styles.container}>
    {list.map(({ character, id, name, profile_path }) => (
      <Link href={`/persons/${id}`} key={id}>
        <a>
          <CrewProfilePreview
            character={character}
            name={name}
            picturePath={getResourcePath(profile_path || '')}
          />
        </a>
      </Link>
    ))}
  </div>
);

export default CrewProfilePreviewList;
