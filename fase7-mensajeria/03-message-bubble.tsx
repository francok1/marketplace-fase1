/**
 * Message Bubble Component
 * Componente para mostrar mensajes individuales
 *
 * Ubicación: components/messaging/message-bubble.tsx
 */

'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Check, CheckCheck, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/01-ui-button';
import { MessageStatus } from '@/lib/validations/message-validations';

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  status: MessageStatus;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  attachments?: Array<{
    url: string;
    name: string;
    type: string;
  }>;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  onDelete?: (messageId: string) => void;
}

export function MessageBubble({
  message,
  isOwn,
  showAvatar = true,
  onDelete,
}: MessageBubbleProps) {
  const timeAgo = formatDistanceToNow(new Date(message.createdAt), {
    addSuffix: true,
    locale: es,
  });

  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {showAvatar && (
        <div className={`w-8 h-8 rounded-full flex-shrink-0 ${
          isOwn
            ? 'bg-blue-500'
            : 'bg-gray-300 dark:bg-gray-600'
        } flex items-center justify-center text-white text-xs font-bold`}>
          {message.author.avatar ? (
            <img
              src={message.author.avatar}
              alt={message.author.name}
              className="w-full h-full rounded-full"
            />
          ) : (
            message.author.name.charAt(0).toUpperCase()
          )}
        </div>
      )}

      {/* Message Content */}
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Name */}
        {!isOwn && (
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            {message.author.name}
          </p>
        )}

        {/* Bubble */}
        <div
          className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${
            isOwn
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
          }`}
        >
          {/* Texto */}
          <p className="text-sm break-words">{message.content}</p>

          {/* Archivos */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1 border-t border-current border-opacity-20 pt-2">
              {message.attachments.map((file, idx) => (
                <a
                  key={idx}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs hover:opacity-80"
                >
                  <Download size={12} />
                  {file.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Timestamp y Status */}
        <div className={`flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1 ${
          isOwn ? 'flex-row-reverse' : 'flex-row'
        }`}>
          <span>{timeAgo}</span>
          {isOwn && (
            <>
              {message.status === MessageStatus.READ && (
                <CheckCheck size={12} className="text-blue-500" />
              )}
              {message.status === MessageStatus.DELIVERED && (
                <Check size={12} />
              )}
            </>
          )}
        </div>

        {/* Delete Button (own messages only) */}
        {isOwn && onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(message.id)}
            className="mt-1 text-xs text-red-500 hover:text-red-700"
          >
            <Trash2 size={12} />
          </Button>
        )}
      </div>
    </div>
  );
}

export type { MessageBubbleProps };
