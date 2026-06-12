import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { CheckoutStep } from '@/context/CartContext';

interface StepIndicatorProps {
  currentStep: CheckoutStep;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { t } = useLanguage();

  const steps: { key: CheckoutStep; labelKey: string; num: number }[] = [
    { key: 'delivery', labelKey: 'checkout.step.delivery', num: 1 },
    { key: 'payment', labelKey: 'checkout.step.payment', num: 2 },
    { key: 'confirmation', labelKey: 'checkout.step.confirmation', num: 3 },
  ];

  // Map current step to index
  const stepIndex =
    currentStep === 'delivery' ? 0 :
    currentStep === 'payment' ? 1 :
    currentStep === 'confirmation' ? 2 : -1;

  return (
    <div className="w-full max-w-md mx-auto py-6 px-4">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const isCompleted = i < stepIndex;
          const isActive = i === stepIndex;

          return (
            <div key={step.key} className="flex items-center flex-1 last:flex-none">
              {/* Step circle + label */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted
                      ? '#4A7C3F'
                      : isActive
                        ? '#C75B2A'
                        : '#D9D5D0',
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    step.num
                  )}
                </motion.div>
                <span
                  className={`text-[11px] font-medium mt-1.5 whitespace-nowrap ${
                    isCompleted
                      ? 'text-leaf'
                      : isActive
                        ? 'text-terracotta'
                        : 'text-soil-500'
                  }`}
                >
                  {t(step.labelKey) as string}
                </span>
              </div>

              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 bg-soil-200 relative overflow-hidden rounded-full">
                  <motion.div
                    initial={false}
                    animate={{
                      width: i < stepIndex ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                    className="absolute inset-y-0 left-0 bg-terracotta rounded-full"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
