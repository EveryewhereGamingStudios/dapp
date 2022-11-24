import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './Navbar.module.css';

const pages = [
  {
    href: '/',
    name: 'Profile',
  },
  {
    href: '/wallet',
    name: 'Wallet',
  },
  {
    href: '/marketplace',
    name: 'Marketplace',
  },
  {
    href: '/download',
    name: 'Download',
  },
];

const Navbar: FC = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles.nav}>
      {pages.map(({ href, name }) => (
        <Link href={href} key={name}>
          <a className={`${styles.tab} ${href === pathname ? styles.active : null}`}> {name}</a>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
