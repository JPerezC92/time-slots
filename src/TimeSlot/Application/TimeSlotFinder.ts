import { BookingRepository } from 'src/Bookings/Domain/BookingRepository';
import { CheckTimeSlotWasBookedForTheCurrentCustomer } from './VerifyTimeSlotWasBookedForTheCurrentUserService';
import { Customer } from 'src/Customers/Domain/Customer';
import { TimeSlotRepository } from '../Domain/TimeSlotRepository';
import { TimeSlotStore } from '../Domain/TimeSlotStore';
import { UseCase } from 'src/Shared/Domain/UseCase';

interface TimeSlotFinderInput {
  customer: Customer;
}

export class TimeSlotFinder
  implements UseCase<Promise<void>, TimeSlotFinderInput>
{
  private readonly _timeSlotRepository: TimeSlotRepository;
  private readonly _bookingRepository: BookingRepository;
  private readonly _timeSlotStore: TimeSlotStore;
  private readonly _verifyTimeSlotWasBookedForTheCurrentUserService: CheckTimeSlotWasBookedForTheCurrentCustomer;

  constructor(props: {
    timeSlotRepository: TimeSlotRepository;
    bookingRepository: BookingRepository;
    timeSlotStore: TimeSlotStore;
  }) {
    this._timeSlotRepository = props.timeSlotRepository;
    this._bookingRepository = props.bookingRepository;
    this._timeSlotStore = props.timeSlotStore;
    this._verifyTimeSlotWasBookedForTheCurrentUserService =
      new CheckTimeSlotWasBookedForTheCurrentCustomer();
  }

  async execute({ customer }: TimeSlotFinderInput): Promise<void> {
    const [timeSlotCollection, bookingList] = await Promise.all([
      this._timeSlotRepository.findAll(),
      this._bookingRepository.findAllByCustomer(customer),
    ]);

    const timeSlotsVerified =
      this._verifyTimeSlotWasBookedForTheCurrentUserService.execute({
        bookingColl: bookingList,
        timeSlot: timeSlotCollection,
      });

    this._timeSlotStore.setTimeSlotCollection(timeSlotsVerified);
  }
}
