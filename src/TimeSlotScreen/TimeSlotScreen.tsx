import { FC, useEffect } from 'react';

import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Infrastructure/components/MotorcyclistAvailableCounter';
import { TimeSlotRow } from 'pages/TimeSlotRow';
import { useFindTimeSlots } from 'src/TimeSlot/Infrastructure/controllers/useFindTimeSlots';
import { useTimeSlotViewStore } from 'src/TimeSlot/Infrastructure/ZustandTimeSlotStore';

import styles from './TimeSlotScreen.module.scss';

export const TimeSlotScreen: FC = () => {
  const findTimeSlots = useFindTimeSlots();
  const { timeSlotCollection } = useTimeSlotViewStore();

  useEffect(() => {
    findTimeSlots.run();
  }, [findTimeSlots]);

  return (
    <div>
      <h1>TimeSlotScreen</h1>
      <MotorcyclistAvailableCounter />

      <table className={`${styles.TimeSlotsTable}`}>
        <thead>
          <tr>
            <th>Slot</th>
          </tr>
        </thead>
        <tbody>
          {timeSlotCollection.map((slot) => (
            <TimeSlotRow key={`${slot.start}-${slot.end}`} timeSlot={slot} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
