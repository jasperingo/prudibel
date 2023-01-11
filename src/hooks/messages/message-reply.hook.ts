import { useCallback } from "react";
import Message from "../../models/message.model";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "../users/user.hook";

const REPLIES = [
  { 
    reply: 'Sorry, I do not understand you', 
    messages: [] 
  },
  {
    reply: 'Welcome, my name is prudibel, 👋\nI can help diagonse you for Coronary disease.\nHow are you feeling?',
    messages: ['Hello', 'Hi', 'Good morning', 'Good day']
  },
  {
    reply: 'That is good to know,\nFeel free to tell me when you don\'t feel so good. 😉',
    messages: ['I\'m fine', 'I\'m Okay', 'I\'m good', 'Fine', 'Ok', 'Good', 'Okay', 'Well', 'Very well', 'Very well thank you']
  },
  {
    reply: 'Sorry to hear that, if you can answer some questions, I might be able to help. 😇',
    messages: ['I feel bed', 'I don\'t feel good', 'I feel sick', 'Bad', 'Not fine', 'Not good', 'Not ok', 'Not okay', 'Sick', 'Ill', 'Very sick', 'Very ill', 'Tired', 'Weak']
  },
  { // 4
    reply: 'Are you having pains around your chest?',
    messages: ['Yes, I can answer your questions', 'You can ask', 'You can ask me', 'You can ask me your questions', 'I can answer your question', 'I can answer', 'I will answer your questions', 'Let\'s get started']
  },
  { // 5
    reply: 'Are you having shortness of breath?',
    messages: ['Yes', 'No']
  },
  { // 6
    reply: 'Are you having fatigue?',
    messages: ['Yes', 'No']
  },
  { // 7
    reply: 'Did you have a heart attack recently?',
    messages: ['Yes', 'No']
  },
  {
    reply: 'Sorry, there is a possibility that you have the coronary diesease, please visit a doctor as soon as you can.',
    messages: ['__positive']
  },
  {
    reply: 'You seem okay, have some rest when you can and drink a lot of water. 😀',
    messages: ['__negative']
  },
  {
    reply: 'Thank you for spending time to talk to me. 😀',
    messages: ['Thank you', 'I\'m grateful', 'Great job'],
  },
  {
    reply: 'It was nice talking to you, enjoy the rest of your day. 😀',
    messages: ['Bye', 'Bye bye', 'Good bye', 'Goodbye', 'Talk to you later', 'See you later']
  },
];

export const useMessageReply = () => {
  const user = useUser();

  return useCallback(async (messages: Message[]) => {
    const lastMessage = messages[0] ?? {};

    const lastChatbotMessage = messages[1] ?? {};

    let reply = 0;

    switch(lastChatbotMessage.key) {
      case 4:  {
        reply = 5;
        break;
      }
      
      case 5: {
        reply = 6;
        break;
      }

      case 6: {
        reply = 7;
        break;
      }

      case 7: {
        const answer = [];

        for (let i = 0; i < 7; i += 2) {
          answer.push(messages[i].content);
        }

        let sumYes = 0, sumNo = 0;

        answer.forEach((n) => {
          if (n === 'Yes') {
            sumYes++;
          } else if (n === 'No') {
            sumNo++;
          }
        });

        if (sumYes > sumNo) {
          reply = 8;
        } else {
          reply = 9;
        }

        break;
      }
      
      default: {
        reply = REPLIES.findIndex((r) => r.messages.includes(lastMessage.content));
      }
    }

    const botMessage: Message = {
      content: REPLIES[reply < 0 ? 0 : reply].reply,
      date: Date.now(),
      from: 'chatbot',
      key: reply,
    };

    try {
      const collectionRef = collection(getFirestore(), user?.uid ?? '');
      
      return await setDoc(doc(collectionRef), botMessage);
    } catch (error) {
      console.log(error);
    }
  }, []);
}
