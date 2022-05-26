import Image from 'next/image';
import styles from './MediaPageTrailer.module.css';

interface Props {
  id: string;
  title: string;
}

const MediaPageTrailer: React.FC<Props> = ({ id, title }) => (
  <div className={styles.trailer}>
    <div className={styles.video}>
      <Image
        alt={`${title} thumbnail`}
        layout="fill"
        objectFit="cover"
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        unoptimized={true}
      />
      <div className={styles.playButton}>
        <Image
          alt=""
          height={16}
          src="/assets/icons/play.svg"
          unoptimized={true}
          width={16}
        />
      </div>
    </div>
    <p className={styles.title}>{title}</p>
  </div>
);

export default MediaPageTrailer;
