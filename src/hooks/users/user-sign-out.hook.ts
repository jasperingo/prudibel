import { getAuth } from "firebase/auth/react-native";
import { useState } from "react";
import { firebaseApp } from "../../configs/firebase.config";

type ReturnTuple = [
  onSubmit: ()=> Promise<void>,
  success: boolean,
  error: string | null,
];

export const useUserSignOut = (): ReturnTuple => {
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<string | null>(null);
  
  const onSubmit = async () => {
    try {
      const auth = getAuth(firebaseApp);
      await auth.signOut();
      setSuccess(true);
    } catch {
      setError('Sign out failed');
    }
  }

  return [onSubmit, success, error];
}
