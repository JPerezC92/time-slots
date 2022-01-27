import {
  Alert as AlertBase,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import create from 'zustand';

interface AlertConfig {
  status: 'info' | 'warning' | 'success' | 'error';
  message: string;
}

interface AlertStore {
  addAlert: (alert: AlertConfig) => void;
  alertQueue: Array<AlertConfig>;
  alertRendering?: AlertConfig;
  closeAlert: () => void;
  render: () => void;
}

export const useAlertStore = create<AlertStore>((set, get) => ({
  alertQueue: [],
  alertRendering: undefined,
  addAlert: (alert) =>
    set((state) => ({ alertQueue: [...state.alertQueue, alert] })),

  closeAlert: () => set(() => ({ alertRendering: undefined })),
  render: () => {
    set((state) => ({
      alertQueue: [...state.alertQueue.slice(1)],
      alertRendering: state.alertQueue[0],
    }));
  },
}));

export const Alert: FC = () => {
  const { alertRendering, alertQueue, render, closeAlert } = useAlertStore();

  useEffect(() => {
    if (alertQueue.length > 0 && !alertRendering) render();
  }, [render, alertRendering, alertQueue]);

  return (
    <>
      {alertRendering && (
        <AlertBase status={alertRendering.status}>
          <AlertIcon />
          {/* <AlertTitle mr={2}>Your browser is outdated!</AlertTitle> */}
          <AlertDescription>{alertRendering.message}</AlertDescription>
          <CloseButton
            onClick={closeAlert}
            position="absolute"
            right="8px"
            top="8px"
          />
        </AlertBase>
      )}
    </>
  );
};
