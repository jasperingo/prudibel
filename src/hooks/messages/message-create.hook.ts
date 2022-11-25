import { useCallback } from "react";
import Message from "../../models/message.model";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "../users/user.hook";

export const useMessageCreate = () => {
  const user = useUser();

  return useCallback(async (message: Message) => {
    try {

      const collectionRef = collection(getFirestore(), user?.uid ?? '');
      
      return await setDoc(doc(collectionRef), message);
    } catch (error) {
      console.log(error);
    }
  }, []);
}
