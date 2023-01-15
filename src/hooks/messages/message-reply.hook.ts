import { useCallback } from "react";
import Message from "../../models/message.model";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "../users/user.hook";
import { REPLIES, SURVEY_NEGATIVE, SURVEY_POSITIVE } from "../../configs/replies.config";

export const useMessageReply = () => {
  const user = useUser();

  return useCallback(async (messages: Message[]) => {
    const lastMessage = messages[0] ?? {};

    const lastChatbotMessage = messages[1] ?? {};

    let reply = REPLIES[0];

    switch(lastChatbotMessage.replyId) {
      case 7: {
        const answer = [];

        for (let i = 0; i < 7; i += 2) {
          answer.push(messages[i].content);
        }

        let sumYes = 0, sumNo = 0;

        answer.forEach((n) => {
          if (SURVEY_POSITIVE.includes(n)) {
            sumYes++;
          } else if (SURVEY_NEGATIVE.includes(n)) {
            sumNo++;
          }
        });

        if (sumYes > sumNo) {
          reply = REPLIES.find((r) => r.id === 8) ?? reply;
        } else {
          reply = REPLIES.find((r) => r.id === 9) ?? reply;
        }

        break;
      }
      
      default: {
        const currentReply = REPLIES.find((r) => r.id === lastChatbotMessage.replyId);

        const nextReply = (currentReply !== undefined && currentReply.nextId > -1) 
          ? REPLIES.find((r) => r.id === currentReply.nextId)
          : null;

        if (nextReply?.messages.includes(lastMessage.content)) {
          reply = nextReply;
        } else {
          reply = REPLIES.find((r) => r.messages.includes(lastMessage.content)) ?? reply;
        }
      }
    }

    const botMessage: Message = {
      content: reply.reply,
      date: Date.now(),
      from: 'chatbot',
      replyId: reply.id,
    };

    try {
      const collectionRef = collection(getFirestore(), user?.uid ?? '');
      
      return await setDoc(doc(collectionRef), botMessage);
    } catch (error) {
      console.log(error);
    }
  }, []);
}
