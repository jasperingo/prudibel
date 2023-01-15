export default interface Message {
  id?: string;
  content: string;
  date: number;
  replyId?: number;
  from: 'user' | 'chatbot';
}
