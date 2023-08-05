import { useAtom } from 'jotai';
import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [count, setCount] = useState(2);

  if (!user) return <Loading visible />;

  const push = () => {
    console.log('aaaaa');
    setCount(count + 1);
  };

  return (
    <>
      <div className={styles.under}>
        <div className={styles.button} onClick={push}>
          <h1>{count}</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
