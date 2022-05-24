import Image from 'next/image';
import styles from './CrewProfilePreview.module.css';

interface Props {
  name: string;
  picturePath?: string;
  character?: string;
}

const CrewProfilePreview: React.FC<Props> = ({
  name,
  picturePath,
  character: role,
}) => (
  <div className={styles.container}>
    <div className={styles.profilePicture}>
      {picturePath ? (
        <Image
          alt={`${name} profile`}
          height={68}
          src={picturePath}
          width={68}
        />
      ) : (
        <div className={styles.profileFallback}></div>
      )}
    </div>
    <div>
      <h3 className={styles.name}>{name}</h3>
      {role && <p className={styles.role}>{role || 'Unkown'}</p>}
    </div>
  </div>
);

export default CrewProfilePreview;
