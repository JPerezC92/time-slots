import { FC, useMemo } from 'react';
import format from 'date-fns/format';

import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { useAuthViewStore } from 'src/Auth/Infrastructure/ZustandAuthStore';
import { useBookingCanceller } from 'src/Bookings/Infrastructure/controllers/useBookingCanceller';
import { useBookingCreator } from 'src/Bookings/Infrastructure/controllers/useBookingCreator';

import styles from './TimeSlotRow.module.scss';

const getColor = (timeSlot: TimeSlot): string | undefined => {
  if (timeSlot.isBookedByCustomer)
    return styles.TimeSlotsRow_wasBookedForTheCurrentUser;
  if (timeSlot.isBooked) return styles.TimeSlotsRow_isBooked;
  return '';
};

// const TimeSlotAction: FC = ({}) => {
//   return <></>;
// };

export const TimeSlotRow: FC<{ timeSlot: TimeSlot }> = ({ timeSlot }) => {
  const { customer } = useAuthViewStore();
  const timeSlotBooker = useBookingCreator({ timeSlot, customer });
  const timeSlotBookerCanceller = useBookingCanceller({
    timeSlot,
    customer,
  });
  const color = useMemo(() => getColor(timeSlot), [timeSlot]);

  return (
    <>
      <tr
        className={`${styles.TimeSlotsRow} ${color && color}`}
        // onClick={onClick}
      >
        <td>
          {`${format(timeSlot.start, 'p')} - ${format(timeSlot.end, 'p')}`}{' '}
          {(timeSlotBooker.isLoading || timeSlotBookerCanceller.isLoading) &&
            'Cargando'}
        </td>

        {customer.isLoggedIn && (
          <>
            {/* {timeSlot.isOutOfTime() ? (
              <td>Time Expired</td>
            ) : ( */}
            <td>
              {!timeSlot.isBooked && (
                <button type="button" onClick={timeSlotBooker.run}>
                  Book
                </button>
              )}

              {timeSlot.isBooked && timeSlot.isBookedByCustomer && (
                <button type="button" onClick={timeSlotBookerCanceller.run}>
                  Cancel booking
                </button>
              )}
            </td>
            {/* )} */}
          </>
        )}
      </tr>
    </>
  );
};
