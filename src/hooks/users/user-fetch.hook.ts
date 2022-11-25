import { useNetInfo } from "@react-native-community/netinfo";
import { Unsubscribe } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth/react-native";
import { useCallback, useState } from 'react';
import { firebaseApp } from "../../configs/firebase.config";

type UserFetchReturnTuple = [
  ()=> Unsubscribe | undefined,
  boolean, 
  boolean, 
  string | null,
  () => void
];

export const useUserFetch = (): UserFetchReturnTuple => {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const network = useNetInfo();

  const retryFetch = ()=> {
    setError(null);
    setLoading(false);
  }

  const fetchUser = useCallback(
    () => {

      if (!network.isConnected) {
        setLoading(false);
        setError('No internet connection');
        return;
      }

      setError(null);
      setLoading(true);

      return onAuthStateChanged(
        getAuth(firebaseApp), 
        ()=> {  
          setSuccess(true);
          setLoading(false);
        },
        (error)=> { 
          setLoading(false);
          setError(error.message);
        },
      );
    },
    [network]
  );
  
  return [fetchUser, loading, success, error, retryFetch]
}
