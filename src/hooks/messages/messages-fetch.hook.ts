import { useCallback, useState } from "react";
import { Unsubscribe } from "firebase/auth/react-native";
import { collection, onSnapshot, getFirestore, query, orderBy } from "firebase/firestore";
import Message from "../../models/message.model";

type ReturnType = [
  fetchMessages: (userId: string) => Unsubscribe,
  list: Message[], 
  loading: boolean,
  loaded: boolean,
  serror: string | null,
  retryFetch: ()=> void
];

export const useMessageList = (): ReturnType => {

  const [list, setList] = useState<Message[]>([]);

  const [loaded, setLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  
  const retryFetch = useCallback(()=> setError(null), []);

  const fetchMessages = useCallback((userId: string)=> {
    setError(null);

    if (!loaded) {
      setLoading(true);
    }

    const q = query(collection(getFirestore(), userId), orderBy('date', 'desc'));

    return onSnapshot(q, (querySnapshot) => {
      const messages: Message[] = [];

      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() as any });
      });

      setList((old) => {
        const mList = messages.filter((m) => old.find((om) => om.id === m.id) === undefined);
        
        return [...mList, ...old];
      });

      if (!loaded) {
        setLoaded(true);
        setLoading(false);
      }
    }, (error) => {
      console.log(error);
      setError(error.message);

      if (!loaded) {
        setLoading(false);
      }
    });
  }, [loaded]);

  return [
    fetchMessages, 
    list, 
    loading, 
    loaded, 
    error, 
    retryFetch
  ];
}
