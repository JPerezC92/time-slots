import { FC, useMemo } from 'react';

import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { CustomerName } from 'src/Customers/Domain/CustomerName';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { useTimeSlotBookingCreator } from 'src/Bookings/Infrastructure/controllers/useTimeSlotBookingCreator';
import { useTimeSlotBookerCanceller } from 'src/Bookings/Infrastructure/controllers/useTimeSlotBookerCanceller';

import styles from './TimeSlotRow.module.scss';
import { useAuthViewStore } from 'src/Auth/Infrastructure/ZustandAuthStore';

const getColor = (timeSlot: TimeSlot): string | undefined => {
  if (timeSlot.wasBookedForTheCurrentUser)
    return styles.TimeSlotsRow_wasBookedForTheCurrentUser;
  if (timeSlot.isBooked) return styles.TimeSlotsRow_isBooked;
  return '';
};

export const TimeSlotRow: FC<{ timeSlot: TimeSlot }> = ({ timeSlot }) => {
  const { customer } = useAuthViewStore();
  const timeSlotBooker = useTimeSlotBookingCreator({ timeSlot, customer });
  const timeSlotBookerCanceller = useTimeSlotBookerCanceller({
    timeSlot,
    customer,
  });
  const color = useMemo(() => getColor(timeSlot), [timeSlot]);

  const onClick = () => {
    if (timeSlot.isBooked && timeSlot.wasBookedForTheCurrentUser) {
      timeSlotBookerCanceller.run();
    } else {
      timeSlotBooker.run();
    }
  };

  return (
    <>
      <tr
        className={`${styles.TimeSlotsRow} ${color && color}`}
        // onClick={onClick}
      >
        <td>
          {`${timeSlot.start} - ${timeSlot.end}`}{' '}
          {(timeSlotBooker.isLoading || timeSlotBookerCanceller.isLoading) &&
            'Cargando'}
        </td>

        {customer.isLoggedIn && (
          <>
            <td>
              {!timeSlot.isBooked && (
                <button type="button" onClick={timeSlotBooker.run}>
                  Book
                </button>
              )}

              {timeSlot.isBooked && timeSlot.wasBookedForTheCurrentUser && (
                <button type="button" onClick={timeSlotBookerCanceller.run}>
                  Cancel booking
                </button>
              )}
            </td>
          </>
        )}
      </tr>
    </>
  );
};
