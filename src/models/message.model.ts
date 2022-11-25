export default interface Message {
  id?: string;
  content: string;
  date: number;
  from: 'user' | 'chatbot';
}

