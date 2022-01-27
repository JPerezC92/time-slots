import type { NextPage } from 'next';

import { Layout } from 'src/UI/Layout';
import { TimeSlotScreen } from 'src/TimeSlot/Infrastructure/components/TimeSlotScreen';

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
