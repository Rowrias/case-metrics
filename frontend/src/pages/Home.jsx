import HomeContent from '../components/HomeContent';

export default function Home({ user }) {
  return (
    <div>
      <HomeContent user={user} />
    </div>
  );
};
