import { memo } from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div className="flex justify-start my-2">
      <div className="bg-white border border-soil-200 rounded-2xl rounded-bl-[4px] px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-soil-400"
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default TypingIndicator;
