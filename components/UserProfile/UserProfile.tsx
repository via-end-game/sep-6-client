import { useSession } from 'next-auth/react';

const UserProfile: React.FC = () => {
  const { data } = useSession();
  console.log('useSessiong.data ->', data);

  return <div>Thats the user profile</div>;
};

export default UserProfile;
