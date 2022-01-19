import { FC, useCallback, useMemo } from 'react';

import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { useTimeSlotBooker } from 'src/Bookings/Infrastructure/controllers/useTimeSlotBooker';

import styles from './TimeSlotRow.module.scss';

const getColor = (timeSlot: TimeSlot): string => {
  if (timeSlot.wasBookedForTheCurrentUser)
    return styles.TimeSlotsRow_wasBookedForTheCurrentUser;
  if (timeSlot.isBooked) return styles.TimeSlotsRow_isBooked;
  return '';
};

export const TimeSlotRow: FC<{ timeSlot: TimeSlot }> = ({ timeSlot }) => {
  const timeSlotBooker = useTimeSlotBooker({ timeSlot });
  const color = useMemo(() => getColor(timeSlot), [timeSlot]);

  return (
    <>
      <tr
        className={`
        ${styles.TimeSlotsRow}
        ${color && color}       
        `}
        onClick={timeSlotBooker.run}
      >
        <td>
          {`${timeSlot.start} - ${timeSlot.end}`}{' '}
          {timeSlotBooker.isLoading && 'Cargando'}
        </td>
      </tr>
    </>
  );
};
