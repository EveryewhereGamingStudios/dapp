import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './Marketplace.module.css';
import { NftGrid } from '../../NftGrid';

const Marketplace: FC = () => {
  const { data } = useSession();
  return (
    <div className={styles.marketplace}>
      <Image src='/assets/mage.svg' width={46} height={46} alt='profile' />
      <h4>{data?.user.address}</h4>
      <p>Profile ID: {data?.user.profileId}</p>
      <p>Session Expiration Time: {data?.user.expirationTime}</p>
      <NftGrid
        address={'0xF3fF34d0A8ddF4e681eb84E05B294242cd99C0B6'}
        chain={'0x13881'}
      />
    </div>
  );
};

export default Marketplace;
