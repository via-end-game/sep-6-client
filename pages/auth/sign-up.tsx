import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SignUpForm from '../../components/AuthForm/SignUpForm';
import styles from '../../styles/SignUp.module.css';

const SignUpPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      }
    });

    // const redirectOnSession = async () => {
    //   const session = await getSession();

    //   if (session) {
    //     router.replace('/');
    //   }
    // };

    // redirectOnSession();
  }, [router]);

  return (
    <div className={styles.signUp}>
      <div className={`${styles.signUpContainer} page-container`}>
        <div className={styles.signUpBackground}>
          <Image
            alt=""
            height={764}
            src="https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/vv5a8u6e40kyH0Hp6HuamAgzRai.jpg"
            unoptimized={true}
            width={920}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentContainer}>
            <p className={styles.title}>
              Create an <br />
              account
            </p>
            <p className={styles.callToSignIn}>
              Already a member of Best Movies Inc.?{' '}
              <Link href="/auth/sign-in">
                <a className={styles.callToSignInLink}>Sign In</a>
              </Link>
            </p>
          </div>
          <div className={styles.formContainer}>
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
