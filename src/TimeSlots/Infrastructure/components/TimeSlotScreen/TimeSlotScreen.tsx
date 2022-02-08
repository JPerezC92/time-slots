import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Infrastructure/components/MotorcyclistAvailableCounter';
import { TimeSlotRow } from '@TimeSlots/Infrastructure/components/TimeSlotRow';
import { useTimeSlotsFinder } from '@TimeSlots/Infrastructure/controllers/useTimeSlotsFinder';
import { useTimeSlotViewStore } from '@TimeSlots/Infrastructure/ZustandTimeSlotStore';

export const TimeSlotScreen: FC = () => {
  const { timeSlotCollection } = useTimeSlotViewStore();
  const { run: execTimeSlotsFinder } = useTimeSlotsFinder();

  const [disableWhileBooking, setDisableWhileBooking] = useState(false);

  useEffect(() => {
    execTimeSlotsFinder();
  }, [execTimeSlotsFinder]);

  return (
    <>
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
    </>
  );
};
