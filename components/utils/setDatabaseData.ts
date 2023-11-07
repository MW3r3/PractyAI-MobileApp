import { getDatabase, ref, set } from "firebase/database";

export async function setDatabaseData(path: string, value: any): Promise<void> {
  const db = getDatabase();
  const dbRef = ref(db, path);
  await set(dbRef, value);
}