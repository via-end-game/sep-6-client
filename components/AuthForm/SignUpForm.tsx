import { Button } from '../Button/Button';
import styles from './AuthForm.module.css';
import { useEffect, useState } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  emailInput: HTMLInputElement;
  nameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const SignUpForm: React.FC = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/getImages', { method: 'GET' });

      const data = await response.json();

      setImages(data);
      setSelectedImageUrl(data[0]);
    };

    fetchImages();
  }, []);

  const handleSubmit = async (event: React.FormEvent<AuthFormElement>) => {
    event.preventDefault();

    const { emailInput, nameInput, passwordInput } =
      event.currentTarget.elements;

    await onSignUpSubmit(
      selectedImageUrl.split('/').reverse()[0],
      emailInput.value,
      nameInput.value,
      passwordInput.value
    );
  };

  const onSignUpSubmit = async (
    avatarUrl: string,
    email: string,
    name: string,
    password: string
  ) => {
    console.log('[Placeholder] Fetching /register with the following data ->', {
      avatarUrl,
      email,
      name,
      password,
    });

    const response = await fetch('/api/auth/sign-up', {
      body: JSON.stringify({ avatarUrl, email, name, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error || 'Something went wrong!');
    }

    return data;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formProfilePictureContainer}>
        <label className={styles.inputLabelPicture} htmlFor="profile-picture">
          Pick a profile picture
        </label>
        <div className={styles.imagesContainer}>
          {images.map((el) => (
            <div
              className={`${styles.imagePlacholder} ${
                el === selectedImageUrl && styles.imagePlacholderActive
              }`}
              key={el}
              onClick={() => setSelectedImageUrl(el)}
            >
              <img src={el} />
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          id="nameInput"
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
          id="emailInput"
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
          id="passwordInput"
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
  );
};

export default SignUpForm;
