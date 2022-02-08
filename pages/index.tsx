import type { NextPage } from 'next';

import { Layout } from 'src/UI/Layout';
import { TimeSlotScreen } from '@TimeSlots/Infrastructure/components/TimeSlotScreen';

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <TimeSlotScreen />
      </Layout>
    </>
  );
};

export default Home;
