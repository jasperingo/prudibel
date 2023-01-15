export const SURVEY_POSITIVE = ['Yes', 'Yes, I am', 'Yea', 'Ye', 'I have been having it lately'];

export const SURVEY_NEGATIVE = ['No', 'No, I don\'t', 'I don\'t have it', 'Neh', 'Nah'];

export const REPLIES = [
  { 
    id: 0,
    nextId: -1,
    reply: 'Sorry, I do not understand you', 
    messages: [] 
  },
  {
    id: 1,
    nextId: -1,
    reply: 'Welcome, my name is prudibel, 👋\nI can help diagonse you for Coronary disease.\nHow are you feeling?',
    messages: ['Hello', 'Hi', 'Good morning', 'Good day', 'Hey', 'Goodmorning', 'Goodday', 'Goodafternoon', 'Good afternoon',  'Goodevening', 'Good evening', 'Hello Prudibel', 'Hi Prudibel']
  },
  {
    id: 2,
    nextId: -1,
    reply: 'That is good to know,\nFeel free to tell me when you don\'t feel so good. 😉',
    messages: ['I\'m fine', 'I\'m Okay', 'I\'m good', 'Fine', 'Ok', 'Good', 'Okay', 'Well', 'Very well', 'Very well thank you']
  },
  {
    id: 3,
    nextId: 4,
    reply: 'Sorry to hear that, if you can answer some questions, I might be able to help. 😇',
    messages: ['I feel bad', 'I don\'t feel good', 'I\'m not feeling well', 'I don\'t feel well', 'I feel sick', 'Bad', 'Not fine', 'Not good', 'Not ok', 'Not okay', 'Sick', 'Ill', 'Very sick', 'Very ill', 'Tired', 'Weak', 'I have a headache', 'I\'m having headache']
  },
  {
    id: 4,
    nextId: 5,
    reply: 'Are you having pains around your chest?',
    messages: ['Yes, I can answer your questions', 'You can ask', 'You can ask me', 'You can ask me your questions', 'I can answer your question', 'I can answer', 'I will answer your questions', 'I can answer your questions', 'Let\'s get started']
  },
  {
    id: 5,
    nextId: 6,
    reply: 'Are you having shortness of breath?',
    messages: [...SURVEY_POSITIVE, ...SURVEY_NEGATIVE]
  },
  {
    id: 6,
    nextId: 7,
    reply: 'Are you having fatigue?',
    messages: [...SURVEY_POSITIVE, ...SURVEY_NEGATIVE]
  },
  {
    id: 7,
    nextId: -1,
    reply: 'Did you have a heart attack recently?',
    messages: [...SURVEY_POSITIVE, ...SURVEY_NEGATIVE]
  },
  {
    id: 8,
    nextId: 10,
    reply: 'Sorry, there is a possibility that you have the coronary diesease, please visit a doctor as soon as you can.',
    messages: ['__positive']
  },
  {
    id: 9,
    nextId: 10,
    reply: 'You seem okay, have some rest when you can and drink a lot of water. 😀',
    messages: ['__negative']
  },
  {
    id: 10,
    nextId: 11,
    reply: 'Thank you for spending time to talk to me. 😀',
    messages: ['Thank you', 'I\'m grateful', 'Great job', 'thank you', 'Thanks', 'Thank you for your help', 'Thanks for your help'],
  },
  {
    id: 11,
    nextId: -1,
    reply: 'It was nice talking to you, enjoy the rest of your day. 😀',
    messages: ['Bye', 'Bye bye', 'Good bye', 'Goodbye', 'Talk to you later', 'See you later']
  },
];
