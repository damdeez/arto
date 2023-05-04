import styles from '../styles/Home.module.css';
import homeStyles from './Main.module.css';
import ArtoPic from '../assets/arto-on-porch.jpg';
import Image from 'next/image'

function Main() {
  return (
    <main className={styles.main}>
      Arto, a dog.
      <Image src={ArtoPic} alt="arto" className={homeStyles.artoPic} />
    </main>
  )
};

export default Main;