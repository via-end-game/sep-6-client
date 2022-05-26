import Image from 'next/image';
import { Heading5Text } from '../Text/Text';
import styles from './TrailerPreview.module.css';

interface Props {
  description: string;
  thumbnailPath: string;
  title: string;
}

const TrailerPreview: React.FC<Props> = ({
  description,
  thumbnailPath,
  title,
}) => (
  <div className={styles.trailerPreview}>
    <div className={styles.thumbnail}>
      <Image
        alt={`${title} trailer thumbnail`}
        layout="fill"
        objectFit="cover"
        src={thumbnailPath}
        unoptimized={true}
      />
    </div>
    <div className={styles.textContent}>
      <Heading5Text>{title}</Heading5Text>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);

export default TrailerPreview;
