import { FC } from "react";
import type { NextPage } from "next";
import styles from "./Index.module.scss";

const Home: NextPage = () => {
  const timeSlot = [
    { start: "8:00 am", end: "8:30 am" },
    { start: "8:30 am", end: "9:00 am" },
    { start: "9:00 am", end: "9:30 am" },
    { start: "9:30 am", end: "10:00 am" },
    { start: "10:00 am", end: "10:30 am" },
    { start: "10:30 am", end: "11:00 am" },
    { start: "11:00 am", end: "11:30 am" },
    { start: "11:30 am", end: "12:00 pm" },
    { start: "12:00 pm", end: "12:30 pm" },
    { start: "12:30 pm", end: "1:00 pm" },
    { start: "1:00 pm", end: "1:30 pm" },
    { start: "1:30 pm", end: "2:00 pm" },
    { start: "2:00 pm", end: "2:30 pm" },
    { start: "2:30 pm", end: "3:00 pm" },
    { start: "3:00 pm", end: "3:30 pm" },
    { start: "3:30 pm", end: "4:00 pm" },
    { start: "4:00 pm", end: "4:30 pm" },
    { start: "4:30 pm", end: "5:00 pm" },
    { start: "5:00 pm", end: "5:30 pm" },
    { start: "5:30 pm", end: "6:00 pm" },
    { start: "6:00 pm", end: "6:30 pm" },
    { start: "6:30 pm", end: "7:00 pm" },
    { start: "7:00 pm", end: "7:30 pm" },
    { start: "7:30 pm", end: "8:00 pm" },
  ];

  return (
    <div>
      <table className={`${styles.TimeSlotsTable}`}>
        <tbody>
          {timeSlot.map((slot, index) => (
            <TimeSlotRow key={`${slot.start} ${slot.end}`} Slot={slot} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

const TimeSlotRow: FC<{ Slot: { start: string; end: string } }> = ({
  Slot,
}) => {
  return (
    <tr className={styles.TimeSlotsRow}>
      {Slot.start} - {Slot.end}
    </tr>
  );
};
