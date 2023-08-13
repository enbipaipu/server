import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [count, setCount] = useState(0);
  const [user_Id, setUser_Id] = useState('52d93b71-9e0b-49e9-8aa5-9303e506c419');

  const getUserId = async () => {
    const result = await apiClient.rooms.getPlayerId.get();

    setUser_Id(result.body.userId);
  };

  //ok
  const getCount = useCallback(async () => {
    const newCount = await apiClient.rooms.get2.post({ body: { userId: user_Id } });
    setCount(newCount.body);
  }, [user_Id]);

  useEffect(() => {
    const num = setInterval(getCount, 5000);
    return () => {
      clearInterval(num);
    };
  }, [getCount]);

  if (!user) return <Loading visible />;

  //ok
  const push = async () => {
    const res = await apiClient.rooms.controller2.post({ body: { userId: user_Id } });
    console.log(res.body);
  };

  return (
    <>
      <div className={styles.under}>
        <h1>{user_Id}</h1>
        <div className={styles.button} onClick={getUserId}>
          getUserId
        </div>
        <div className={styles.button} onClick={push}>
          count+1
        </div>
        <h1 className={styles.left}>{count}</h1>
      </div>
    </>
  );
};

export default Home;
