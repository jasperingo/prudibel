import { useCallback } from "react";
import Message from "../../models/message.model";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "../users/user.hook";

const REPLIES = [
  {
    reply: 'Welcome, my name is prudibel,\nI can help diagonse you for Coronary disease.\nHow are you feeling?',
    messages: ['Hello', 'Hi', 'Good morning', 'Good day']
  },
  {
    reply: 'That is good to know,\nFeel free to tell me when you don\'t feel so good.',
    messages: ['Fine', 'Ok', 'Good', 'Okay', 'Well', 'Very well', 'Very well thank you']
  },
  {
    reply: 'Sorry to hear that, if you can answer some questions, I might be able to help',
    messages: ['Bad', 'Not fine', 'Not good', 'Not ok', 'Not okay', 'Sick', 'Ill', 'Very sick', 'Very ill', 'Tired', 'Weak']
  },
  {
    reply: 'Are you having pains around your chest?',
    messages: ['Ok', 'Alright', 'I can', 'I will', 'Let\'s get started']
  }
];

export const useMessageReply = () => {
  const user = useUser();

  return useCallback(async (messages: Message[]) => {
    const lastMessage = messages[0];

    const reply = REPLIES.find((r) => r.messages.includes(lastMessage.content)) ?? { reply: 'Sorry, I do not understand you', messages: [] };

    const botMessage: Message = {
      content: reply.reply,
      date: Date.now(),
      from: 'chatbot',
    }

    try {
      const collectionRef = collection(getFirestore(), user?.uid ?? '');
      
      return await setDoc(doc(collectionRef), botMessage);
    } catch (error) {
      console.log(error);
    }
  }, []);
}
