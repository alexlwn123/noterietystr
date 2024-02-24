import Link from "next/link";
import Github from "./icons/Github";
import styles from './Footer.module.css';

const Footer = async () => {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        FOSS
        <Link
          href="https://github.com/alexlwn123/notorietystr"
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </Link>
        <Link
          href="https://twitter.com/_alexlewin"
          target="_blank"
          rel="noreferrer"
        >
          @_alexlewin
        </Link>
      </footer>
    </div>
  )
};
export default Footer;
