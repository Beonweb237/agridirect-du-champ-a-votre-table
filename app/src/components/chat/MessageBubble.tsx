import { memo } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';
import type { Message } from '@/data/conversations';

interface Props {
  message: Message;
  showAvatar?: boolean;
}

const MessageBubbleComponent = memo(function MessageBubbleComponent({ message }: Props) {
  const isSent = message.sender === 'sent';

  if (message.type === 'order') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex justify-center my-3"
      >
        <div className="bg-soil-100 rounded-lg px-4 py-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-leaf" />
          <span className="text-body-sm text-soil-600">
            {message.order
              ? `${message.order.status} — ${message.order.id}`
              : message.content}
          </span>
        </div>
      </motion.div>
    );
  }

  if (message.type === 'product' && message.product) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className={`flex ${isSent ? 'justify-end' : 'justify-start'} my-2`}
      >
        <div
          className={`max-w-[75%] rounded-2xl overflow-hidden ${
            isSent
              ? 'rounded-br-[4px] bg-terracotta text-white'
              : 'rounded-bl-[4px] bg-white border border-soil-200'
          } shadow-sm`}
        >
          <div className="p-3">
            <div className="w-full h-20 bg-soil-200 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-body-sm text-soil-500">
                {message.product.name.charAt(0)}
              </span>
            </div>
            <p className={`text-body font-semibold ${isSent ? 'text-white' : 'text-soil-900'}`}>
              {message.product.name}
            </p>
            <p className={`text-body-sm ${isSent ? 'text-white/80' : 'text-soil-600'}`}>
              {message.product.price}
            </p>
            <button
              className={`mt-2 text-body-sm font-medium underline ${
                isSent ? 'text-white/90' : 'text-terracotta'
              }`}
            >
              Voir Produit →
            </button>
          </div>
          <div className={`px-3 pb-2 flex items-center justify-end gap-1 ${isSent ? '' : 'bg-soil-50/50'}`}>
            <span className={`text-[11px] ${isSent ? 'text-white/60' : 'text-soil-500'}`}>
              {message.timestamp}
            </span>
            {isSent && message.status && (
              message.status === 'read' ? (
                <CheckCheck size={12} className="text-white/70" />
              ) : (
                <Check size={12} className="text-white/70" />
              )
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Text message
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, x: isSent ? 12 : -12 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isSent ? 'justify-end' : 'justify-start'} my-1`}
    >
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
          isSent
            ? 'bg-terracotta text-white rounded-br-[4px]'
            : 'bg-white text-soil-900 border border-soil-200 rounded-bl-[4px]'
        }`}
      >
        <p className="text-body leading-relaxed">{message.content}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className={`text-[11px] ${isSent ? 'text-white/60' : 'text-soil-500'}`}>
            {message.timestamp}
          </span>
          {isSent && message.status && (
            message.status === 'read' ? (
              <CheckCheck size={12} className="text-white/70" />
            ) : (
              <Check size={12} className="text-white/70" />
            )
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default MessageBubbleComponent;
