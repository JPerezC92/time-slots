import React, { FC, useEffect, useMemo } from 'react';
import { Button, Td, Tr } from '@chakra-ui/react';
import format from 'date-fns/format';

import { useAuthViewStore } from 'src/Auth/Infrastructure/ZustandAuthStore';
import { useBookingCanceller } from 'src/Bookings/Infrastructure/controllers/useBookingCanceller';
import { useBookingCreator } from 'src/Bookings/Infrastructure/controllers/useBookingCreator';
import { useBookingMergerStore } from '@Bookings/Infrastructure/ZustandBookingStore';
import styles from './TimeSlotRow.module.scss';

const getColor = ({
  isBooked,
  isBookedByCustomer,
}: {
  isBooked: boolean;
  isBookedByCustomer: boolean;
}): string | undefined => {
  if (isBookedByCustomer) return styles.TimeSlotsRow_wasBookedForTheCurrentUser;
  if (isBooked) return styles.TimeSlotsRow_isBooked;
  return '';
};

interface TimeSlotRowProps {
  timeSlotId: string;
  isBooked: boolean;
  isBookedByCustomer: boolean;
  start: string;
  end: string;
  setDisableWhileBooking: (disableWhileBooking: boolean) => void;
  disableWhileBooking: boolean;
}

export const TimeSlotRow: FC<TimeSlotRowProps> = React.memo(
  ({
    timeSlotId,
    isBooked,
    isBookedByCustomer,
    start,
    end,
    setDisableWhileBooking,
    disableWhileBooking,
  }) => {
    const { customer } = useAuthViewStore();
    const bookingList = useBookingMergerStore((s) => s.bookingList);
    const bookingCreator = useBookingCreator();
    const bookingCanceller = useBookingCanceller();

    const booking = bookingList.find((b) => b.timeSlotId.value === timeSlotId);

    const color = useMemo(
      () => getColor({ isBooked, isBookedByCustomer }),
      [isBooked, isBookedByCustomer]
    );

    useEffect(() => {
      setDisableWhileBooking(bookingCreator.isLoading);
    }, [bookingCreator.isLoading, setDisableWhileBooking]);

    return (
      <>
        <Tr className={`${styles.TimeSlotsRow}`} width="min-intrinsic">
          <Td
            className={`${color && color}`}
            borderRadius="base"
            textAlign="center"
          >
            {/* {`${format(start, 'p')} - ${format(end, 'p')}`} */}
            {`${start} - ${end}`}
          </Td>

          {customer.isLoggedIn && (
            <>
              <Td>
                {!isBooked && (
                  <Button
                    backgroundColor="blue.500"
                    isLoading={bookingCreator.isLoading}
                    isDisabled={disableWhileBooking}
                    onClick={() => bookingCreator.run({ timeSlotId })}
                    size="sm"
                    type="button"
                    width="100%"
                  >
                    Book
                  </Button>
                )}

                {isBooked && isBookedByCustomer && (
                  <Button
                    backgroundColor="red.500"
                    isLoading={bookingCanceller.isLoading}
                    onClick={() =>
                      // booking &&
                      bookingCanceller.run({ timeSlotId: timeSlotId })
                    }
                    size="sm"
                    type="button"
                    width="100%"
                  >
                    Cancel booking
                  </Button>
                )}
              </Td>
            </>
          )}
        </Tr>
      </>
    );
  }
);

TimeSlotRow.displayName = 'TimeSlotRow';
