
import React from 'react';
import { ChatMessage as ChatMessageType, Sender } from '../types';
import { BotIcon, UserIcon } from './icons';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  const wrapperClasses = `flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`;
  const bubbleClasses = `max-w-xl p-4 rounded-2xl ${isUser ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`;
  const iconClasses = `h-8 w-8 flex-shrink-0 ${isUser ? 'text-blue-400' : 'text-teal-400'}`;

  const Icon = isUser ? UserIcon : BotIcon;

  return (
    <div className={wrapperClasses}>
      {!isUser && <Icon className={iconClasses} />}
      <div className={bubbleClasses}>
        <p className="text-white whitespace-pre-wrap">{message.text}</p>
      </div>
      {isUser && <Icon className={iconClasses} />}
    </div>
  );
};
