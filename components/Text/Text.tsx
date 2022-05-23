import styles from './Text.module.css';

interface Props {
  children: string | string[];
}

export const Heading1Text: React.FC<Props> = ({ children }) => (
  <h2 className={styles.heading1}>{children}</h2>
);

export const Heading2Text: React.FC<Props> = ({ children }) => (
  <h3 className={styles.heading2}>{children}</h3>
);

export const Heading3Text: React.FC<Props> = ({ children }) => (
  <h4 className={styles.heading3}>{children}</h4>
);

export const Heading5Text: React.FC<Props> = ({ children }) => (
  <h6 className={styles.heading5}>{children}</h6>
);
