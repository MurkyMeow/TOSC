import { LetterColor } from './tosc';

export const hints = {
  T: {
    [LetterColor.red]: [
      'Do not touch me.',
      'Hands off! ! do not want to be touched, and that is really important',
    ],
    [LetterColor.blue]: [
      'Ask me if I want contact',
      "I want hugs, but not from everyone. Don't hesitate to ask!",
    ],
    [LetterColor.green]: ['Free hugs', 'Please hug me!'],
  },

  O: {
    [LetterColor.red]: [
      "Don't ask me personal questions",
      'Personal questions hurt me. Mind your own business!',
    ],
    [LetterColor.blue]: [
      'Ask me if I am ready for personal questions before asking them.',
      'I want to talk about personal things, but not with everyone - ask first.',
    ],
    [LetterColor.green]: ['I am ready for personal questions', 'Please ask me personal questions!'],
  },

  S: {
    [LetterColor.red]: [
      'Do not talk to me about anything',
      'Do not speak at me. I am not going to talk to anyone, and that is important to me.',
    ],
    [LetterColor.blue]: [
      'Ask me if I am ready to chat.',
      'I want to chat, but not with everyone - ask first.',
    ],
    [LetterColor.green]: ['Ready to chat', 'Plese talk to me!'],
  },

  C: {
    [LetterColor.red]: [
      "Don't criticize me, I will ask for input myself when I will need it.",
      'Keep your opinion to yourself! I am hut when others judge me, and that is important.',
    ],
    [LetterColor.blue]: [
      'Before providing feedback, ask me if I am ready for it.',
      'I want to receive feedback, but not from everone - ask first.',
    ],
    [LetterColor.green]: [
      'I am always ready for your input, be it criticism or praise.',
      "Following Crocker's rules",
    ],
  },
};
