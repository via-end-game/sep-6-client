import Image from 'next/image';
import styles from './Button.module.css';

interface ButtonProps {
  children: string;
}

export const Button: React.FC<ButtonProps> = () => (
  <div className={styles.button}>Not Implemented</div>
);

interface LoadMoreButtonProps {
  text: 'load' | 'see' | 'read';
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ text }) => (
  <button className={styles.loadMoreButton}>
    {`${text} more`}
    <span className={styles.loadMoreButtonArrow}>
      <Image alt="" height={14} src="/assets/icons/arrow-down.svg" width={14} />
    </span>
  </button>
);
