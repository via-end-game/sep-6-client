import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from '../Button/Button';
import styles from './AuthForm.module.css';
import { useState } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const AuthForm: React.FC = () => {
  const [hasAuthError, setAuthError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<AuthFormElement>) => {
    event.preventDefault();

    const { emailInput, passwordInput } = event.currentTarget.elements;

    const signInSubmit = await onSignInSubmit(
      emailInput.value,
      passwordInput.value
    );
    console.log('Signing is ' + signInSubmit);
  };

  const onSignInSubmit = async (email: string, password: string) => {
    console.log('[Placeholder] Fetching /login with the following data ->', {
      email,
      password,
    });

    const signInResult = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    console.log('SignInResult ->', signInResult);

    // @ts-ignore
    if (signInResult && signInResult.ok) return router.replace('/profile');

    // @ts-ignore
    setAuthError(!signInResult.ok);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          id="emailInput"
          name="email"
          placeholder="Email"
          spellCheck="false"
          type="email"
          required
        />
        <label className={styles.inputLabel} htmlFor="email">
          Email
        </label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          id="passwordInput"
          name="password"
          placeholder="Password"
          spellCheck="false"
          type="password"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
          required
        />
        <label className={styles.inputLabel} htmlFor="password">
          Password
        </label>
      </div>
      <div className={styles.formButton}>
        <Button>Sign in</Button>
      </div>
      <div>{hasAuthError && 'Wrong credentials'}</div>
    </form>
  );
};

export default AuthForm;
