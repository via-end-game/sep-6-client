import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} page-container`}>
        <div>
          <Link href="/">
            <a className={styles.headerLogoContainer}>
              <h1 className={styles.headerLogo}>Best Movies</h1>
            </a>
          </Link>
          <div className={styles.separator} />
          <Link href="/search">
            <button
              className={`${styles.searchContainer} ${styles.navigationItem}`}
            >
              <div className={styles.searchIcon}>
                <Image
                  alt=""
                  height={12}
                  src="/assets/icons/search.svg"
                  unoptimized={true}
                  width={12}
                />
              </div>
              Search
            </button>
          </Link>
        </div>
        <div>
          <Link href="/">
            <a className={styles.navigationItem}>Trending Movies</a>
          </Link>
          <Link href="/">
            <a className={styles.navigationItem}>Trending TV Shows</a>
          </Link>
          <div className={styles.separator} />
          {!session && (
            <Link href="/auth/sign-up">
              <a className={styles.navigationItem}>Sign Up</a>
            </Link>
          )}
          {session && (
            <Link href="/profile">
              <a className={styles.navigationItem}>Profile</a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
