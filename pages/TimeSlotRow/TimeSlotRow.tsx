import { FC } from 'react';
import { useBookMotorcyclist } from 'src/Bookings/Infrastructure/controllers/useBookMotorcyclist';

import styles from './TimeSlotRow.module.scss';

export const TimeSlotRow: FC<{ slot: { start: string; end: string } }> = ({
  slot,
}) => {
  const bookMotorcyclist = useBookMotorcyclist();

  return (
    <>
      <tr className={styles.TimeSlotsRow} onClick={bookMotorcyclist.run}>
        <td>{`${slot.start} - ${slot.end}`}</td>
      </tr>
    </>
  );
};
