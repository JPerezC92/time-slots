import type { NextPage } from 'next';

import { TimeSlotScreen } from 'src/TimeSlot/Infrastructure/components/TimeSlotScreen';

const Home: NextPage = () => {
  return (
    <>
      <TimeSlotScreen />
    </>
  );
};

export default Home;
