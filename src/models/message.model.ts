export default interface Message {
  id?: string;
  content: string;
  date: number;
  key?: number;
  from: 'user' | 'chatbot';
}

