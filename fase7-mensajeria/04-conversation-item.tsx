/**
 * Conversation Item Component
 * Componente para listar conversaciones
 *
 * Ubicación: components/messaging/conversation-item.tsx
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Bell, BellOff } from 'lucide-react';

interface Conversation {
  id: string;
  subject?: string;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  lastMessage?: {
    content: string;
    createdAt: Date;
    authorId: string;
  };
  unreadCount: number;
  muteNotifications?: boolean;
}

interface ConversationItemProps {
  conversation: Conversation;
  isActive?: boolean;
  onMuteToggle?: (conversationId: string) => void;
}

export function ConversationItem({
  conversation,
  isActive = false,
  onMuteToggle,
}: ConversationItemProps) {
  const participantNames = conversation.participants
    .map((p) => p.name)
    .join(', ');

  const lastMessagePreview = conversation.lastMessage?.content
    ?.substring(0, 50)
    .concat(conversation.lastMessage.content.length > 50 ? '...' : '') || 'Sin mensajes';

  const lastMessageTime = conversation.lastMessage
    ? formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
        addSuffix: false,
        locale: es,
      })
    : '';

  return (
    <Link
      href={`/mensajeria/${conversation.id}`}
      className={`block p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition ${
        isActive ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Avatar + Info */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
            {conversation.participants[0]?.name.charAt(0).toUpperCase()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Name/Subject */}
            <h3 className="font-medium text-gray-900 dark:text-white truncate">
              {conversation.subject || participantNames}
            </h3>

            {/* Last Message */}
            <p className={`text-sm truncate ${
              conversation.unreadCount > 0
                ? 'font-medium text-gray-700 dark:text-gray-200'
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {lastMessagePreview}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {/* Time */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {lastMessageTime}
          </p>

          {/* Unread Badge + Mute */}
          <div className="flex items-center gap-2">
            {conversation.unreadCount > 0 && (
              <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-semibold min-w-max">
                {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
              </span>
            )}

            {onMuteToggle && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onMuteToggle(conversation.id);
                }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
                title={conversation.muteNotifications ? 'Activar notificaciones' : 'Silenciar'}
              >
                {conversation.muteNotifications ? (
                  <BellOff size={16} className="text-gray-500" />
                ) : (
                  <Bell size={16} className="text-gray-500" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export type { ConversationItemProps };
