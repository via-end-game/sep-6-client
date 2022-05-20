import { Cast, Crew } from '../../types/movie-credits.dto';
import { getResourcePath } from '../../utils/tmdbResources';
import CrewProfilePreview from '../CrewProfilePreview';
import styles from './CrewProfilePreviewList.module.css';

interface Props {
  list: Crew[] | Cast[];
}

const CrewProfilePreviewList: React.FC<Props> = ({ list }) => (
  <div className={styles.container}>
    {list.map((c) => (
      <CrewProfilePreview
        character={'character' in c ? c.character : ''}
        key={c.id}
        name={c.name}
        picturePath={getResourcePath(c.profile_path || '')}
      />
    ))}
  </div>
);

export default CrewProfilePreviewList;
