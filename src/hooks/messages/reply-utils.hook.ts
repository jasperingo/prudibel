import { REPLIES } from "../../configs/replies.config";

export const useReplyMessages = () => {
  return (replyId: number) => {
    return REPLIES.find((r) => r.id === replyId)?.messages ?? [];
  }
}

export const useNextReply = () => {
  return (replyId: number) => {
    const reply = REPLIES.find((r) => r.id === replyId);

    return REPLIES.find((r) => r.id === reply?.nextId);
  }
}

export const useNextReplyMessages = () => {
  const nextReply = useNextReply();

  const replyMessages = useReplyMessages();

  return (replyId: number) => {
    if (replyId === 1) {
      return [...replyMessages(2), ...replyMessages(3)]
    }

    if (replyId === 2) {
      return [...replyMessages(10), ...replyMessages(11), ...replyMessages(3)]
    }

    if (replyId === 7) {
      return replyMessages(replyId);
    }

    if (replyId === 11) {
      return [];
    }
    
    return replyMessages(nextReply(replyId)?.id ?? 0);
  }
}
