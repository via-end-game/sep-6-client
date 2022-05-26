import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/Button/Button';
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
              <Link href="#">
                <a className={styles.callToSignInLink}>Log In</a>
              </Link>
            </p>
          </div>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={styles.formProfilePictureContainer}>
                <label
                  className={styles.inputLabelPicture}
                  htmlFor="profile-picture"
                >
                  Pick a profile picture
                </label>
                <div className={styles.imagesContainer}>
                  <div className={styles.imagePlacholder}></div>
                  <div className={styles.imagePlacholder}></div>
                  <div className={styles.imagePlacholder}></div>
                  <div className={styles.imagePlacholder}></div>
                  <div className={styles.imagePlacholder}></div>
                  <div className={styles.imagePlacholder}></div>
                </div>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  name="name"
                  placeholder="Name"
                  spellCheck="false"
                  type="text"
                />
                <label className={styles.inputLabel} htmlFor="name">
                  Name
                </label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  name="email"
                  placeholder="Email"
                  spellCheck="false"
                  type="text"
                />
                <label className={styles.inputLabel} htmlFor="email">
                  Email
                </label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  name="password"
                  placeholder="Password"
                  spellCheck="false"
                  type="password"
                />
                <label className={styles.inputLabel} htmlFor="password">
                  Password
                </label>
              </div>
              <div className={styles.formButton}>
                <Button>Create an account</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
