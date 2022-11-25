import { getAuth } from "firebase/auth/react-native";
import { firebaseApp } from "../../configs/firebase.config";

export const useUser = () => {
  const auth = getAuth(firebaseApp);
  return auth.currentUser;
}
