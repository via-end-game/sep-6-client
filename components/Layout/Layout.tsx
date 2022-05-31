import Header from '../Header';
import styles from './Layout.module.css';

interface Props {
  children: any;
}

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <div className={styles.container}>
      <Header />
      {/* <Search /> */}
    </div>
    {children}
  </>
);

export default Layout;
