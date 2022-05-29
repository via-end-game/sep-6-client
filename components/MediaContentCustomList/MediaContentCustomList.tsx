import Image from 'next/image';
import Link from 'next/link';
import styles from './MediaContentCustomList.module.css';

interface Props {
  amount: number;
  avatarUrl: string;
  genres?: string[];
  listId: number;
  thumbnailUrl: string;
  title: string;
  userId: number;
}

const MediaContentCustomList: React.FC<Props> = ({
  amount,
  avatarUrl,
  genres,
  listId,
  thumbnailUrl,
  title,
}) => (
  <Link href={`/user-lists/${listId}`}>
    <a>
      <div className={styles.customList}>
        <div className={styles.imageContainer}>
          {thumbnailUrl && (
            <Image
              alt={`${title} thumbnail`}
              layout="fill"
              objectFit="cover"
              src={thumbnailUrl}
              unoptimized={true}
            />
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.avatarContainer}>
            <Image
              alt="avatar"
              height={32}
              objectFit="cover"
              src={avatarUrl}
              unoptimized={true}
              width={32}
            />
          </div>
          <p className={styles.title}>{title}</p>
          <p className={styles.genres}>{genres && genres.join(' / ')}</p>
          <p className={styles.amount}>{amount} Titles</p>
        </div>
      </div>
    </a>
  </Link>
);

export default MediaContentCustomList;
