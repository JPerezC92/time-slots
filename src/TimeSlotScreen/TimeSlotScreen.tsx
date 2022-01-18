import { FC } from 'react';

import { timeSlot } from './timeslotsColl';
import { TimeSlotRow } from 'pages/TimeSlotRow';

import styles from './TimeSlotScreen.module.scss';
import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Infrastructure/components/MotorcyclistAvailableCounter';

// interface Props {}

export const TimeSlotScreen: FC = () => {
  return (
    <div>
      <h1>TimeSlotScreen</h1>
      <MotorcyclistAvailableCounter />
      {/* <pre>{JSON.stringify(timeSlot, null, 2)}</pre> */}

      <table className={`${styles.TimeSlotsTable}`}>
        <thead>
          <tr>
            <th>Slot</th>
          </tr>
        </thead>
        <tbody>
          {timeSlot.map((slot) => (
            <TimeSlotRow key={`${slot.start}-${slot.end}`} slot={slot} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
