import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off, DataSnapshot } from 'firebase/database';
import { getAuth } from "firebase/auth";

interface FetchResult {
  loading: boolean;
  data: any | null;
  error: string | null;
}

export function fetchUserData(info: string): FetchResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) {
      setError("No user is signed in.");
      console.log("No user is signed in.");
      setLoading(false);
      return;
    }

    const db = getDatabase();
    const dbRef = ref(db, `users/${userId}/${info}`);
    const listener = onValue(dbRef, (snapshot: DataSnapshot) => {
      setData(snapshot.val());
      setLoading(false);
    }, (errorObject) => {
      setError(errorObject.message);
      setLoading(false);
    });

    return () => {
      off(dbRef, 'value', listener);
    };
  }, [info]);

  return { loading, data, error };
}


