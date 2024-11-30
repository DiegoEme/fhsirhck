import { openDB } from 'idb';

const DB_NAME = 'CommentsDatabase';
const DB_VERSION = 1;
const STORE_NAME = 'commentsStore';

export const initializeDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addItem = async (item: {content: string}) => {
  const db = await initializeDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.add(item);
  await tx.done;
};

export const getAllItems = async () => {
  const db = await initializeDB();
  return db.getAll(STORE_NAME);
};

export const deleteItem = async (id: number) => {
  const db = await initializeDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.delete(id);
  await tx.done;
};
