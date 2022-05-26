import Image from 'next/image';
import styles from './Button.module.css';

interface ButtonProps {
  children: string;
}

export const Button: React.FC<ButtonProps> = ({ children }) => (
  <button className={styles.customList}>{children}</button>
);

interface LoadMoreButtonProps {
  text: 'load' | 'see' | 'read';
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ text }) => (
  <button className={styles.loadMoreButton}>
    {text} more
    <span className={styles.loadMoreButtonArrow}>
      <Image
        alt=""
        height={14}
        src="/assets/icons/arrow-down.svg"
        unoptimized={true}
        width={14}
      />
    </span>
  </button>
);

export const WatchListButton: React.FC = () => (
  <button className={styles.loadMoreButton}>
    Add to watch list
    <span className={`${styles.watchListPlus} ${styles.loadMoreButtonArrow}`}>
      <Image
        alt=""
        height={14}
        src="/assets/icons/plus.svg"
        unoptimized={true}
        width={14}
      />
    </span>
  </button>
);

interface ToCustomListButtonProps {
  mediaType: 'movie' | 'show';
}

export const ToCustomListButton: React.FC<ToCustomListButtonProps> = ({
  mediaType,
}) => (
  <button className={styles.customList}>
    <div className={styles.customListIconContainer}>
      <Image
        alt=""
        height={12}
        src="/assets/icons/film.svg"
        unoptimized={true}
        width={12}
      />
    </div>
    Add {mediaType} to list
  </button>
);
