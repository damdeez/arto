import useSWR from 'swr';

import styles from '../styles/Home.module.css';
import homeStyles from './Main.module.css';
import ArtoPic from '../assets/arto-on-porch.jpg';
import Image from 'next/image'

function Main() {
  const { data, error, isLoading } = useSWR(
    '/api/status',
    (...args) => fetch(...args).then(res => res.json()
    ));
  console.info('>>> Arto data', data);

  return (
    <main className={styles.main}>
      Arto, a dog.
      <div>I am currently {!isLoading ? data.status : null}</div>
      <Image src={ArtoPic} alt="arto" className={homeStyles.artoPic} />
    </main>
  )
};

export default Main;