import { Suspense, useCallback } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../components/Profile';
import { Button } from '../components/Button';

function Home() {
  const navigate = useNavigate();
  const handleEditted = useCallback(() => {
    navigate('/edit');
  }, [navigate]);
  return (
    <>
      <Suspense fallback={<div>...loading</div>}>
        <Profile />
      </Suspense>
      <Button onClick={handleEditted} type="button">
        Edit
      </Button>
    </>
  );
}

export default Home;
