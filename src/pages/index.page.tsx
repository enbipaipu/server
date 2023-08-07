import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [count, setCount] = useState([0, 50]);

  let user_id = 'no UserId';

  const getUserId = async () => {
    const result = await apiClient.rooms.getPlayerId.post({ body: { userId: user_id } });
    user_id = result.body;
    console.log(user_id);
  };

  //ok
  const getCount = useCallback(async () => {
    const newCount = await apiClient.rooms.get2.post({ body: { userId: user_id } });
    setCount(newCount.body);
  }, [user_id]);

  useEffect(() => {
    const num = setInterval(getCount, 5000);
    return () => {
      clearInterval(num);
    };
  }, [getCount]);

  if (!user) return <Loading visible />;

  //ok
  const push = async () => {
    const Body = {
      body: 1,
      body2: user_id,
    };
    const res = await apiClient.rooms.controller.$post({ body: Body });
    console.log(res);
  };

  return (
    <>
      <div className={styles.under}>
        <h1>{user_id}</h1>
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
