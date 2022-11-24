import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './Wallet.module.css';
import { NftGrid } from '../../NftGrid';

const Wallet: FC = () => {
  const { data } = useSession();
  return (
    <div className={styles.wallet}>
      <Image src='/assets/mage.svg' width={46} height={46} alt='profile' />
      <h4>{data?.user.address}</h4>
      <p>Profile ID: {data?.user.profileId}</p>
      <p>Session Expiration Time: {data?.user.expirationTime}</p>
      <NftGrid
        address={data?.user.address ?? ''}
        chain={'0x13881'}
      />
    </div>
  );
};

export default Wallet;
