import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Modal from 'react-modal';
import Layout from '../components/Layout';
import '../styles/fonts.css';
import '../styles/globals.css';
// import '../styles/modal.css';

Modal.setAppElement('#__next');

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
);

export default MyApp;
