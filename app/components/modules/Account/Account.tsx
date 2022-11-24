import React, { FC, useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useMoralisQuery, useMoralis } from 'react-moralis';
import styles from './Account.module.css';

const Account: FC = () => {
  const { data: session } = useSession();
  const {
    user,
    logout,
    isLoggingOut,
    setUserData,
    isUserUpdating,
    refetchUserData,
    isAuthenticated,
  } = useMoralis();

  const username = user?.getUsername() ?? '';
  const email = user?.getEmail() ?? '';

  const [newUserName, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  const handleSaveUserData = async (event: React.FormEvent) => {
    event.preventDefault();
    await setUserData({
      username: newUserName,
      email: newEmail,
    });
  };

  const { data: cities, isFetching: citiesIsFetching } = useMoralisQuery(
    'City',
    (query) => query.select('name', 'country').equalTo('country', 'Portugal')
  );

  useEffect(() => {
    if (isAuthenticated) {
      refetchUserData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setNewUsername(username);
  }, [username]);

  useEffect(() => {
    setNewEmail(email);
  }, [email]);

  return (
    <div className={styles.account}>
      <Image src='/assets/mage.svg' width={46} height={46} alt='profile' />
      <h4>{session?.user.address}</h4>
      <p>Profile ID: {session?.user.profileId}</p>
      <p>Session Expiration Time: {session?.user.expirationTime}</p>
      <p>Username: {user?.getUsername()}</p>
      <p>Email: {user?.getEmail()}</p>
      {citiesIsFetching ? (
        <p>Cities: Loading...</p>
      ) : (
        cities && cities.map((city) => <p key={city.get("name")}>{city.get("name")}, {city.get("country")}</p>)
      )}
      <VStack divider={<Divider />}>
        <form style={{ width: '100%' }} onSubmit={handleSaveUserData}>
          <VStack>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type='text'
                value={newUserName}
                onChange={(event) => setNewUsername(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
              />
            </FormControl>
            <Button
              isLoading={isUserUpdating}
              type='submit'
              width='full'
              colorScheme='green'
            >
              Update profile data
            </Button>
          </VStack>
        </form>

        <Button
          onClick={() => logout()}
          disabled={isLoggingOut}
          colorScheme='red'
          width='full'
        >
          Logout
        </Button>
      </VStack>
    </div>
  );
};

export default Account;
