import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AuthForm from '../../components/AuthForm';
import styles from '../../styles/SignUp.module.css';

const SignUpPage: NextPage = () => {
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
              Get back <br />
              into your account
            </p>
            <p className={styles.callToSignIn}>
              Don{"'"}t have an account Best Movies Inc.?{' '}
              <Link href="/auth/sign-up">
                <a className={styles.callToSignInLink}>Sign Up</a>
              </Link>
            </p>
          </div>
          <div className={styles.formContainer}>
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
