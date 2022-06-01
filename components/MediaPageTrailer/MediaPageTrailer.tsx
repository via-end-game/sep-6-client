import Image from 'next/image';
import React, { useState } from 'react';
import Modal from 'react-modal';
import YouTube, { YouTubeProps } from 'react-youtube';
import styles from './MediaPageTrailer.module.css';

interface Props {
  id: string;
  title: string;
}

const MediaPageTrailer: React.FC<Props> = ({ id, title }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '493',
    width: '876',
    playerVars: {
      autoplay: 1,
      mute: 1,
    },
  };

  const openModal = () => {
    console.log('Open modal was called');
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log('Close modal was called');
    setIsOpen(false);
  };

  return (
    <div>
      <div className={styles.trailer} onClick={openModal}>
        <div className={styles.video}>
          <Image
            alt={`${title} thumbnail`}
            layout="fill"
            objectFit="cover"
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            unoptimized={true}
          />
          <div className={styles.playButton}>
            <Image
              alt=""
              height={16}
              src="/assets/icons/play.svg"
              unoptimized={true}
              width={16}
            />
          </div>
        </div>
        <p className={styles.title}>{title}</p>
      </div>
      <Modal
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <YouTube videoId={id} opts={opts} onReady={onPlayerReady} />
      </Modal>
    </div>
  );
};

export default MediaPageTrailer;
