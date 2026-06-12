import { useState, useRef, useEffect, useCallback, type ReactElement } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Phone,
  MoreVertical,
  Plus,
  Send,
  MessageCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import { conversations as initialConversations } from '@/data/conversations';
import type { Conversation, Message } from '@/data/conversations';
import ConversationList from '@/components/chat/ConversationList';
import MessageBubble from '@/components/chat/MessageBubble';
import TypingIndicator from '@/components/chat/TypingIndicator';
import AttachmentMenu from '@/components/chat/AttachmentMenu';

// Date divider component
function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-soil-200" />
      <span className="text-body-sm text-soil-500">{label}</span>
      <div className="flex-1 h-px bg-soil-200" />
    </div>
  );
}

// Empty state when no conversation selected
function EmptyChatState({ onExplore }: { onExplore: () => void }) {
  const { lang } = useLanguage();
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full p-8 text-center">
      <MessageCircle size={64} className="text-soil-300 mb-4" />
      <h3 className="font-display text-display-md text-soil-900 mb-2">
        {lang === 'fr' ? 'Pas Encore de Messages' : 'No Messages Yet'}
      </h3>
      <p className="text-body text-soil-600 mb-6 max-w-sm">
        {lang === 'fr'
          ? 'Commencez une conversation avec un producteur en visitant son profil ou une page produit.'
          : 'Start a conversation with a producer by visiting their profile or a product page.'}
      </p>
      <button
        onClick={onExplore}
        className="px-6 py-3 bg-terracotta text-white rounded-[10px] text-body font-semibold hover:bg-terracotta-dark transition-colors"
      >
        {lang === 'fr' ? 'Explorer le Marche' : 'Explore Marketplace'}
      </button>
    </div>
  );
}

export default function ChatPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const [typingConvId, setTypingConvId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedConv = conversations.find((c) => c.id === selectedId);

  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectedConv?.messages.length, typingConvId, scrollToBottom]);

  // Simulate typing indicator on conversation select
  useEffect(() => {
    if (selectedId) {
      setTypingConvId(null);
      const conv = conversations.find((c) => c.id === selectedId);
      if (conv && conv.online) {
        const t1 = setTimeout(() => setTypingConvId(selectedId), 1500);
        const t2 = setTimeout(() => setTypingConvId(null), 4000);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    }
  }, [selectedId]);

  const handleSend = useCallback(() => {
    if (!inputText.trim() || !selectedId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'text',
      content: inputText.trim(),
      sender: 'sent',
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, newMessage], unread: 0 }
          : c
      )
    );
    setInputText('');

    // Simulate reply
    setTimeout(() => {
      const autoReply: Message = {
        id: `msg-${Date.now() + 1}`,
        type: 'text',
        content:
          lang === 'fr'
            ? "Merci pour votre message ! Je vous reponds des que possible."
            : 'Thank you for your message! I will reply as soon as possible.',
        sender: 'received',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedId ? { ...c, messages: [...c.messages, autoReply] } : c
        )
      );
    }, 2000);
  }, [inputText, selectedId, lang]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleSelectConversation = useCallback((id: string) => {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedId(null);
  }, []);

  // Group messages by date for date dividers
  const renderMessages = () => {
    if (!selectedConv) return null;
    const msgs = selectedConv.messages;
    const elements: ReactElement[] = [];

    // Simple heuristic: show "Today" divider if last message is recent
    if (msgs.length > 3) {
      elements.push(<DateDivider key="today" label={lang === 'fr' ? 'Aujourd\'hui' : 'Today'} />);
    }

    msgs.forEach((msg) => {
      elements.push(<MessageBubble key={msg.id} message={msg} />);
    });

    // Show typing indicator
    if (typingConvId === selectedConv.id) {
      elements.push(<TypingIndicator key="typing" />);
    }

    return elements;
  };

  const t = {
    online: lang === 'fr' ? 'En ligne' : 'Online',
    writeMessage: lang === 'fr' ? 'Ecrivez un message...' : 'Write a message...',
  };

  return (
    <Layout hideFooter>
      <div className="pt-14 md:pt-16 h-[calc(100dvh-56px)] md:h-[calc(100dvh-64px)] flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Conversation List - hidden on mobile when chat selected */}
          <div
            className={`w-full md:w-[360px] lg:w-[400px] shrink-0 border-r border-soil-200 ${
              selectedId ? 'hidden md:flex' : 'flex'
            }`}
          >
            <ConversationList
              conversations={conversations}
              selectedId={selectedId}
              onSelect={handleSelectConversation}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Right: Chat Area */}
          <div
            className={`flex-1 flex flex-col bg-soil-50 ${
              !selectedId ? 'hidden md:flex' : 'flex'
            }`}
          >
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="shrink-0 h-14 bg-white border-b border-soil-200 flex items-center px-4 z-30">
                  <button
                    onClick={handleBackToList}
                    className="md:hidden p-2 -ml-2 text-soil-700 hover:text-soil-900 mr-1"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <div className="relative mr-3">
                    <div className="w-9 h-9 rounded-full bg-leaf text-white flex items-center justify-center text-label font-semibold">
                      {selectedConv.avatar}
                    </div>
                    {selectedConv.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-leaf border-2 border-white rounded-full animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body text-soil-900 font-semibold truncate">
                      {lang === 'fr' ? selectedConv.producerName : selectedConv.producerNameEn}
                    </p>
                    <p className="text-[11px] text-soil-500">
                      {selectedConv.online
                        ? t.online
                        : lang === 'fr'
                          ? selectedConv.lastActive
                          : selectedConv.lastActiveEn}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-soil-600 hover:text-soil-900 transition-colors">
                      <Phone size={18} />
                    </button>
                    <button className="p-2 text-soil-600 hover:text-soil-900 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {renderMessages()}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="shrink-0 bg-white border-t border-soil-200 px-4 py-2 flex items-center gap-2 z-30">
                  <button
                    onClick={() => setAttachmentOpen(true)}
                    className="w-10 h-10 rounded-full bg-soil-200 flex items-center justify-center text-soil-600 hover:bg-soil-300 transition-colors shrink-0"
                  >
                    <Plus size={20} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t.writeMessage}
                    className="flex-1 h-11 rounded-full bg-soil-50 border border-soil-200 px-4 text-body text-soil-900 outline-none focus:border-terracotta focus:shadow-[0_0_0_3px_#F2E0D6] transition-all"
                  />
                  <motion.button
                    onClick={handleSend}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      inputText.trim()
                        ? 'bg-terracotta text-white hover:bg-terracotta-dark'
                        : 'bg-soil-200 text-soil-400'
                    }`}
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
              </>
            ) : (
              <EmptyChatState onExplore={() => navigate('/marketplace')} />
            )}
          </div>
        </div>
      </div>

      {/* Attachment Menu */}
      <AttachmentMenu open={attachmentOpen} onClose={() => setAttachmentOpen(false)} />
    </Layout>
  );
}
