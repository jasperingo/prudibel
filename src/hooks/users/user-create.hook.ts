import { useNetInfo } from "@react-native-community/netinfo";
import { FirebaseError } from "firebase/app";
import { getAuth, onAuthStateChanged, Unsubscribe, updateProfile } from "firebase/auth/react-native";
import { createUserWithEmailAndPassword } from "firebase/auth/react-native";
import { useState, useMemo, useCallback } from "react";
import { firebaseApp } from "../../configs/firebase.config";

type ReturnTuple = [
  onSubmit: (name: string, email: string, password: string)=> Promise<void>,
  success: boolean,
  loading: boolean,
  error: string | null,
];

export const useUserCreate = (): ReturnTuple => {
  const network = useNetInfo();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (displayName: string, email: string, password: string) => {
    if (!network.isConnected) {
      setError('No internet connection');
      return;
    }

    setError(null);
    setLoading(true);
    setSuccess(false);

    try {
      const userCredentials = await createUserWithEmailAndPassword(getAuth(firebaseApp), email, password);
    
      updateProfile(userCredentials.user, { displayName });

      setSuccess(true);
    } catch (error: any) {
      if (error instanceof FirebaseError)
        setError(error.code);
      else 
        setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, success, loading, error];
}
