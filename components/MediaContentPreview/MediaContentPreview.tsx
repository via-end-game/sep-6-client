import Image from 'next/image';
import Link from 'next/link';
import { Heading3Text } from '../Text/Text';
import styles from './MediaContentPreview.module.css';

interface Props {
  link: string;
  posterPath: string;
  showTitle?: boolean;
  title: string;
}

const MediaContentPreview: React.FC<Props> = ({
  link,
  posterPath,
  showTitle = true,
  title,
}) => {
  return (
    <Link href={link}>
      <a>
        <div className={styles.mediaContentPreviewContainer}>
          <Image
            alt={`${title} poster`}
            height={308}
            src={posterPath}
            width={208}
          />
          {showTitle && (
            <div className={styles.mediaContentPreviewTitleContainer}>
              <Heading3Text>{title}</Heading3Text>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default MediaContentPreview;
