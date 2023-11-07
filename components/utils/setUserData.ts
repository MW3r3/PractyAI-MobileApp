import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

export async function setUserData(info: string, value: string | number | boolean | object | null): Promise<void> {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  if (!userId) {
    console.log("No user is signed in.");
    throw new Error("No user is signed in.");
  }

  const db = getDatabase();
  const dbRef = ref(db, `users/${userId}/${info}`);
  await set(dbRef, value);
}