import Link from 'next/link';
import styles from './Filmography.module.css';

interface Props {
  character: string;
  id: number;
  title: string;
  year: number | string;
}

const Filmography: React.FC<Props> = ({ character, id, title, year }) => (
  <div className={styles.filmography}>
    <Link href={`/movies/${id}`}>
      <a>
        <div className={styles.filmographyContainer}>
          <div>
            <p className={styles.title}>{title}</p>
            <p className={styles.character}>{character}</p>
          </div>
          <p className={styles.year}>{year}</p>
        </div>
      </a>
    </Link>
  </div>
);

export default Filmography;
