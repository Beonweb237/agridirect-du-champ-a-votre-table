import { memo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Conversation } from '@/data/conversations';

interface Props {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const ConversationListComponent = memo(function ConversationListComponent({
  conversations,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
}: Props) {
  const { lang } = useLanguage();

  const t = {
    searchPlaceholder: lang === 'fr' ? 'Rechercher dans les messages...' : 'Search in messages...',
    all: lang === 'fr' ? 'Tous' : 'All',
    unread: lang === 'fr' ? 'Non Lus' : 'Unread',
    orders: lang === 'fr' ? 'Commandes' : 'Orders',
  };

  const filtered = conversations.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.producerName.toLowerCase().includes(q) ||
      c.messages.some((m) => m.content.toLowerCase().includes(q))
    );
  });

  const getLastMessage = (conv: Conversation) => {
    const msgs = conv.messages;
    return msgs[msgs.length - 1];
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-soil-200">
        <h2 className="font-display text-display-sm text-soil-900 mb-3">
          {lang === 'fr' ? 'Messages' : 'Messages'}
        </h2>
        {/* Search */}
        <div className="flex items-center gap-2 bg-soil-50 rounded-[10px] px-3 h-10">
          <Search size={16} className="text-soil-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 bg-transparent outline-none text-body-sm text-soil-900 placeholder:text-soil-500"
          />
        </div>
        {/* Filter tabs */}
        <div className="flex gap-2 mt-3">
          {[t.all, `${t.unread} (${conversations.reduce((a, c) => a + c.unread, 0)})`, t.orders].map(
            (tab) => (
              <button
                key={tab}
                className="px-3 py-1 rounded-full text-label bg-soil-100 text-soil-600 hover:bg-soil-200 transition-colors"
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Conversation Items */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((conv, i) => {
          const lastMsg = getLastMessage(conv);
          const isSelected = selectedId === conv.id;
          return (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              onClick={() => onSelect(conv.id)}
              className={`w-full flex items-start gap-3 p-4 border-b border-soil-100 text-left transition-colors ${
                isSelected ? 'bg-terracotta-light/50' : 'hover:bg-soil-50'
              } ${conv.unread > 0 ? 'border-l-[3px] border-l-terracotta' : ''}`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-leaf text-white flex items-center justify-center text-body font-semibold">
                  {conv.avatar}
                </div>
                {conv.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-leaf border-2 border-white rounded-full" />
                )}
                {conv.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    {conv.unread}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={`text-body truncate ${conv.unread > 0 ? 'font-bold text-soil-900' : 'font-semibold text-soil-900'}`}>
                    {lang === 'fr' ? conv.producerName : conv.producerNameEn}
                  </p>
                  <span className="text-body-sm text-soil-500 shrink-0 ml-2">{lastMsg?.timestamp}</span>
                </div>
                <p className="text-body-sm text-soil-500 truncate">
                  {lastMsg?.type === 'product'
                    ? (lang === 'fr' ? conv.productName : conv.productNameEn) || lastMsg.content
                    : lastMsg?.type === 'order'
                      ? lastMsg.order?.status || lastMsg.content
                      : lastMsg?.content}
                </p>

                {/* Product context */}
                {conv.productThumbnail && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="w-6 h-6 rounded bg-soil-200 flex items-center justify-center">
                      <span className="text-[8px] text-soil-500">P</span>
                    </div>
                    <span className="text-body-sm text-soil-600">
                      {lang === 'fr' ? conv.productName : conv.productNameEn}
                    </span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});

export default ConversationListComponent;
