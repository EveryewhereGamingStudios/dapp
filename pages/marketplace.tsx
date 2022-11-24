import type { GetServerSideProps, NextPage } from 'next';
import { Default } from '../app/components/layouts/Default';
import { Meta } from '../app/components/elements/Meta';
import { MarketplacePage } from '../app/components/templates';
import { getSession } from 'next-auth/react';

const Marketplace: NextPage<{ content: string }> = ({ content }) => {
  return (
    <Default>
      <Meta />
      <span>{content}</span>
      <MarketplacePage />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      content: session
        ? "You are authenticated. So you can get my secret now - I'm a mage"
        : 'Authenticate to get my secret',
    },
  };
};

export default Marketplace;
