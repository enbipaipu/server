import { useAtom } from 'jotai';
import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [count, setCount] = useState([0, 50]);

  // const getCount = useCallback(async () => {
  //   const newCount = await apiClient.rooms.get2.post({ body: 'post' });
  //   setCount(newCount.body);
  // }, []);

  // useEffect(() => {
  //   const num = setInterval(getCount, 2000);
  //   return () => {
  //     clearInterval(num);
  //   };
  // }, [getCount]);

  if (!user) return <Loading visible />;
  let user_id = 'unkown';

  const getUserId = async () => {
    user_id = 'user';
  };

  const push = async () => {
    const Body = {
      body: 1,
      body2: 'post',
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
