import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [count, setCount] = useState([0, 50]);
  const [user_Id, setUser_Id] = useState('no UserId');

  const getUserId = async () => {
    const result = await apiClient.rooms.getPlayerId.get();

    setUser_Id(result.body.userId);
    console.log(user_Id);
  };

  //ok
  const getCount = useCallback(async () => {
    const newCount = await apiClient.rooms.get2.post({ body: user_Id });
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
    const res = await apiClient.rooms.controller.$post({ body: user_Id });
    console.log(res);
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
        <h1 className={styles.left}>{count[0]}</h1>
        <h1 className={styles.right}>{count[1]}</h1>
      </div>
    </>
  );
};

export default Home;
