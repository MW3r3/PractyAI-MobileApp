import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off, DataSnapshot } from 'firebase/database';

interface FetchResult {
  loading: boolean;
  data: any | null;
  error: string | null;
}

export function useDatabaseFetch(path: string): FetchResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, path);
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
  }, [path]);

  return { loading, data, error };
}