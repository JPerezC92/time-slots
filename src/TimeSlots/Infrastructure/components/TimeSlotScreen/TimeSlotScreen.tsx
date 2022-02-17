import { FC, useEffect, useState } from 'react';
import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { MotorcyclistAvailableCounter } from '@Motorcyclists/Infrastructure/components/MotorcyclistAvailableCounter';
import { TimeSlotRow } from '@TimeSlots/Infrastructure/components/TimeSlotRow';
import {
  useAuthMergedStore,
  useAuthViewStore,
} from '@Auth/Infrastructure/ZustandAuthStore';
import { useBookingFinder } from '@Bookings/Infrastructure/controllers/useBookingFinder';
import { useTimeSlotsFinder } from '@TimeSlots/Infrastructure/controllers/useTimeSlotsFinder';
import { useTimeSlotViewStore } from '@TimeSlots/Infrastructure/ZustandTimeSlotStore';
import { useFindUserInfo } from '@Auth/Infrastructure/hooks/useFindUserInfo';
import { useLogout } from '@Auth/Infrastructure/hooks/useLogout';
import { AuthStore } from '@Auth/Domain/AuthStore';

const selectTokenExists = (s: AuthStore) => s.tokenExists;

export const TimeSlotScreen: FC = () => {
  const { customer } = useAuthViewStore();
  const { timeSlotCollection } = useTimeSlotViewStore();
  const { run: timeSlotsFinderRun } = useTimeSlotsFinder();
  const { run: bookingFinderRun } = useBookingFinder();
  const { run: findUserInfoRun } = useFindUserInfo();
  const { run: logoutRun } = useLogout();
  const [disableWhileBooking, setDisableWhileBooking] = useState(false);

  const tokenExists = useAuthMergedStore(selectTokenExists);

  useEffect(() => {
    timeSlotsFinderRun();
  }, [timeSlotsFinderRun, customer.isLoggedIn]);

  useEffect(() => {
    if (customer.isLoggedIn) bookingFinderRun();
  }, [bookingFinderRun, customer.isLoggedIn]);

  useEffect(() => {
    if (tokenExists()) findUserInfoRun();
  }, [findUserInfoRun, tokenExists]);

  return (
    <Box margin="1rem" display="flex" flexDirection="column" gap="1rem">
      <MotorcyclistAvailableCounter />

      <Table
        variant="simple"
        width="min-intrinsic"
        size="sm"
        marginInline="auto"
      >
        <Thead bg="gray.100">
          <Tr>
            <Th
              textAlign="center"
              colSpan={2}
              fontSize="xl"
              padding="1rem"
              marginBlock="1rem"
            >
              Time slot
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {timeSlotCollection.map((timeSlot) => (
            <TimeSlotRow
              key={`${timeSlot.start}-${timeSlot.end}`}
              end={timeSlot.end}
              isBooked={timeSlot.isBooked}
              isBookedByCustomer={timeSlot.isBookedByCustomer}
              start={timeSlot.start}
              timeSlotId={timeSlot.id}
              setDisableWhileBooking={setDisableWhileBooking}
              disableWhileBooking={disableWhileBooking}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
