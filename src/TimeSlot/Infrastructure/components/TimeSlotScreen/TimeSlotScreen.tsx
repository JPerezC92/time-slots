import { FC, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Infrastructure/components/MotorcyclistAvailableCounter';
import { TimeSlotRow } from 'src/TimeSlot/Infrastructure/components/TimeSlotRow';
import {
  useAuthViewStore,
  useZustandAuthStore,
} from 'src/Auth/Infrastructure/ZustandAuthStore';
import { useTimeSlotsFinder } from 'src/TimeSlot/Infrastructure/controllers/useTimeSlotsFinder';
import { useTimeSlotViewStore } from 'src/TimeSlot/Infrastructure/ZustandTimeSlotStore';

import styles from './TimeSlotScreen.module.scss';
import { format, parse } from 'date-fns';
import { timeSlotColl } from './timeslotsColl';
import { addDoc, collection, doc } from 'firebase/firestore';
import { DB } from 'src/Shared/Infrastructure/firebase';

const googleAuth = getAuth();
// const googleAuthProvider = new GoogleAuthProvider();

// const loginWithFirebase = async () => {
//   signInWithPopup(googleAuth, googleAuthProvider)
//     .then((result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result);

//       const token = credential?.accessToken;
//       const user = result.user;
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(
//         error as FirebaseError
//       );
//     });
// };

export const TimeSlotScreen: FC = () => {
  const { customer } = useAuthViewStore();
  const { login, logout, updateCredentials } = useZustandAuthStore();
  const { timeSlotCollection } = useTimeSlotViewStore();
  const findTimeSlots = useTimeSlotsFinder({ customer });

  useEffect(() => {
    onAuthStateChanged(googleAuth, (user) => {
      if (user) {
        updateCredentials({ id: user.uid, username: user.displayName || '' });
      }
    });
  }, [updateCredentials]);

  useEffect(() => {
    findTimeSlots.run();
  }, [findTimeSlots]);

  useEffect(() => {
    // timeSlotColl.map((timeSlot, i) => {
    //   addDoc(collection(DB, 'time-slots-timeslots'), { ...timeSlot, order: i });
    // });
    // const date = parse('8:00', 'HH:mm', new Date());
    // console.log(date);
    // console.log(format(date, 'p'));
  }, []);

  return (
    <div>
      <h1>TimeSlotScreen</h1>
      <h1>{customer.isLoggedIn && customer.name}</h1>
      <MotorcyclistAvailableCounter />

      {!customer.isLoggedIn ? (
        <button type="button" onClick={login}>
          Login
        </button>
      ) : (
        <button type="button" onClick={logout}>
          Logout
        </button>
      )}

      <table className={`${styles.TimeSlotsTable}`}>
        <thead>
          <tr>
            <th>Slot</th>
            <th></th>
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
