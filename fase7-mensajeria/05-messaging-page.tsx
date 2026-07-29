/**
 * Messaging Page
 * Página principal de mensajería
 *
 * Ubicación: app/(dashboard)/mensajeria/page.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Navbar } from '@/components/common/08-common-navbar';
import { Card, CardContent } from '@/components/ui/03-ui-card';
import { Button } from '@/components/ui/01-ui-button';
import { Input } from '@/components/ui/02-ui-input';
import { MessageBubble } from './03-message-bubble';
import { ConversationItem } from './04-conversation-item';
import { getConversations, getMessages, sendMessage, markAsRead } from '@/lib/services/message-server-actions';
import { Search, Send, Paperclip } from 'lucide-react';

interface Conversation {
  id: string;
  subject?: string;
  participants: any[];
  lastMessage?: any;
  unreadCount: number;
  muteNotifications?: boolean;
}

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  status: string;
  author: any;
  attachments?: any[];
}

export default function MessagingPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadConversations();
  }, [user?.id]);

  const loadConversations = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const result = await getConversations(user.id);
      if (result.success) {
        setConversations(result.data?.conversations || []);
        if (result.data?.conversations?.[0]) {
          setSelectedConversation(result.data.conversations[0].id);
          loadMessages(result.data.conversations[0].id);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const result = await getMessages({
        conversationId,
        page: 1,
        limit: 50,
      });
      if (result.success) {
        setMessages(result.data?.messages || []);
      }
    } finally {
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    setIsSending(true);
    try {
      const result = await sendMessage({
        recipientId: conversations
          .find(c => c.id === selectedConversation)
          ?.participants[0].id || '',
        content: messageInput,
      });

      if (result.success) {
        setMessageInput('');
        await loadMessages(selectedConversation);
      }
    } finally {
      setIsSending(false);
    }
  };

  const filteredConversations = conversations.filter(c =>
    c.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (authLoading || isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <p className="m-auto text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </>
    );
  }

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <>
      <Navbar />

      <div className="flex h-[calc(100vh-60px)] bg-white dark:bg-gray-900">
        {/* Sidebar - Conversaciones */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Mensajes
            </h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-600 dark:text-gray-400">
                No hay conversaciones
              </div>
            ) : (
              filteredConversations.map(conv => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isActive={conv.id === selectedConversation}
                />
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        {selectedConv ? (
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {selectedConv.subject || selectedConv.participants.map(p => p.name).join(', ')}
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOwn={msg.author.id === user?.id}
                  showAvatar={idx === 0 || messages[idx - 1]?.author.id !== msg.author.id}
                />
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <Paperclip size={18} />
                </Button>
                <Input
                  placeholder="Escribe un mensaje..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isSending}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={isSending || !messageInput.trim()}
                  className="p-2"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600 dark:text-gray-400">
            <p>Selecciona una conversación</p>
          </div>
        )}
      </div>
    </>
  );
}
