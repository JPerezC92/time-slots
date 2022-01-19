import { runTransaction, Transaction } from 'firebase/firestore';
import { DB } from './connection';

let transactionRef: Transaction;

export const Uow = () => {
  const getTransaction = () => transactionRef;
  const operation = runTransaction(DB, async (transaction) => {
    transactionRef = transaction;
  });

  return { operation, getTransaction };
};
