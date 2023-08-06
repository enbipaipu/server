import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [count, setCount] = useState([0, 50]);

  const getCount = useCallback(async () => {
    const newCount = await apiClient.rooms.controller.get();
    setCount(newCount.body);
  }, []);

  useEffect(() => {
    const num = setInterval(getCount, 2000);
    return () => {
      clearInterval(num);
    };
  }, [getCount]);

  if (!user) return <Loading visible />;

  const push = async () => {
    const res = await apiClient.rooms.controller.$post({ body: 1 });
    console.log(res);
  };

  return (
    <>
      <div className={styles.under}>
        <div className={styles.button} onClick={push}>
          <h1 className={styles.left}>{count[0]}</h1>
          <h1 className={styles.right}>{count[1]}</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
