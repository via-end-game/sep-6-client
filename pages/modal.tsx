import { NextPage } from 'next';
import CustomListModal from '../components/CustomListModal';

const ModalPage: NextPage = () => {
  return (
    <div style={{ paddingTop: '196px', paddingBottom: '1500px' }}>
      <CustomListModal
        movieToList={{
          genre: 'Action',
          posterPath: '/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
          rating: 7.7,
          title: 'Sonic the Hedgehog 2',
          tmdbID: 675353,
        }}
      />
    </div>
  );
};

export default ModalPage;
