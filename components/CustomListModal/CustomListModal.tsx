import Image from 'next/image';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CustomList } from '../../types/custom-list.dto';
import { MovieToList } from '../../types/movie-to-list.dto';
import { CustomListButton, ToCustomListButton } from '../Button/Button';
import styles from './CustomListModal.module.css';

interface Props {
  movieToList: MovieToList;
}

const CustomListModal: React.FC<Props> = ({ movieToList }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [customLists, setCustomLists] = useState<CustomList[]>([]);

  useEffect(() => {
    const getCustomLists = async () => {
      const response = await fetch('/api/get-custom-lists', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) return setCustomLists(data);

      return console.error(
        'Error while trying to fetch custom lists -> ',
        response
      );
    };

    getCustomLists();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      `Clicked on a ${e.target.checked ? 'checked' : 'unchecked'} property`
    );

    if (e.target.checked) {
      console.log('Trying to add a movie to the list');

      const response = await fetch('/api/add-movie-to-list', {
        body: JSON.stringify({ ...movieToList, userListID: e.target.value }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      if (response.ok) return setCustomLists(await response.json());
    } else {
      console.log('Trying to remove a movie from the list');

      const response = await fetch('/api/remove-movie-from-list', {
        body: JSON.stringify({
          movieId: movieToList.tmdbID,
          userListId: e.target.value,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      if (response.ok) return setCustomLists(await response.json());
    }

    return console.error('Error while trying to fetch custom lists');
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <ToCustomListButton mediaType="movie" onClick={openModal} />
      <Modal
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className={styles.header}>
          <p className={styles.title}>Add movie to</p>
          <button className={styles.button} onClick={closeModal}>
            <Image
              alt=""
              height={12}
              src="/assets/icons/close.svg"
              unoptimized={true}
              width={12}
            />
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.lists}>
            {customLists &&
              customLists.length > 0 &&
              customLists.map(({ id, movies, title }) => (
                <label className={styles.list} key={id}>
                  <span className={styles.listTitle}>{title}</span>
                  <input
                    checked={
                      !!movies?.find(
                        ({ tmdbId }) => tmdbId === movieToList.tmdbID
                      ) || false
                    }
                    type="checkbox"
                    value={id}
                    onChange={handleChange}
                  />
                </label>
              ))}
          </div>
          <CustomListButton handler={() => closeModal()}>
            CLOSE
          </CustomListButton>
        </div>
      </Modal>
    </div>
  );
};

export default CustomListModal;
