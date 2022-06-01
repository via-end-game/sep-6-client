import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';
import YouTube, { YouTubeProps } from 'react-youtube';
import { getResourcePath } from '../../utils/tmdbResources';
import styles from './MediaContentBackdrop.module.css';

interface Props {
  backdropPath: string;
  title: string;
  videoId?: string;
}

const MediaContentBackdrop: React.FC<Props> = ({
  backdropPath,
  title,
  videoId,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className={styles.backdrop}>
        <div
          className={`${styles.backdropImageContainer} ${
            videoId && styles.backdropImageContainerWithVideo
          }`}
        >
          <Image
            alt={`${title} backdrop`}
            layout="fill"
            objectFit="cover"
            priority={true}
            src={getResourcePath(backdropPath)}
            unoptimized={true}
          />
        </div>
        {videoId && (
          <div className={styles.backdropPlayContainer} onClick={openModal}>
            <Image alt="" height={16} src="/assets/icons/play.svg" width={16} />
          </div>
        )}
      </div>
      <Modal
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      </Modal>
    </div>
  );
};

export default MediaContentBackdrop;

const opts: YouTubeProps['opts'] = {
  height: '493',
  width: '876',
  playerVars: {
    autoplay: 1,
    mute: 1,
  },
};
