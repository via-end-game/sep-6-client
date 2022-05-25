import { NextPage } from 'next';
import Search from '../components/Search';
import { Heading2Text } from '../components/Text/Text';

const SearchPage: NextPage = () => {
  return (
    <div>
      <Heading2Text>Search</Heading2Text>
      <br />
      <div className="page-container">
        <Search />
      </div>
    </div>
  );
};

export default SearchPage;
