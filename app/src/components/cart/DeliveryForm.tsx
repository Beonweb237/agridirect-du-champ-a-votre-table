import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { deliveryOptions, cameroonCities, deliveryCosts } from '@/data/deliveryOptions';

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
}

export default function DeliveryForm() {
  const { lang, t } = useLanguage();
  const { setDeliveryInfo, setDeliveryCost, setCheckoutStep } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    deliveryType: 'standard' as 'standard' | 'express' | 'pickup',
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [shaking, setShaking] = useState<string | null>(null);

  const selectedOption = deliveryOptions.find((o) => o.id === formData.deliveryType);
  const deliveryCost = formData.city
    ? (deliveryCosts[formData.city]?.[formData.deliveryType] ?? 1500)
    : 0;

  const triggerShake = useCallback((field: string) => {
    setShaking(field);
    setTimeout(() => setShaking(null), 300);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('validation.required') as string;
      triggerShake('fullName');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('validation.required') as string;
      triggerShake('phone');
    } else if (!/^\+?237[\s]?[6-9][\s]?\d{2}[\s]?\d{3}[\s]?\d{3}$|^\+?237[\s]?[2-9][\s]?\d{7}$|^6[\s]?\d{2}[\s]?\d{3}[\s]?\d{3}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('validation.phone') as string;
      triggerShake('phone');
    }
    if (!formData.address.trim()) {
      newErrors.address = t('validation.required') as string;
      triggerShake('address');
    }
    if (!formData.city) {
      newErrors.city = t('validation.required') as string;
      triggerShake('city');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setDeliveryInfo(formData);
      setDeliveryCost(deliveryCost);
      setCheckoutStep('payment');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClasses = (field: string) =>
    `w-full h-[52px] md:h-12 bg-soil-50 border-[1.5px] rounded-[10px] px-4 text-[15px] text-soil-900 placeholder:text-soil-500 outline-none transition-all duration-200 ${
      errors[field as keyof FormErrors]
        ? 'border-error shadow-[0_0_0_3px_rgba(194,59,43,0.1)]'
        : 'border-soil-300 focus:border-terracotta focus:shadow-[0_0_0_3px_#F2E0D6]'
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="bg-white p-6 rounded-2xl max-w-[768px] mx-auto"
    >
      <h2 className="font-display text-display-md text-soil-900">
        {t('delivery.title') as string}
      </h2>
      <p className="text-body text-soil-600 mt-1">{t('delivery.subtitle') as string}</p>

      <div className="mt-6 space-y-4">
        {/* Full Name */}
        <motion.div
          animate={shaking === 'fullName' ? { x: [0, -4, 4, -4, 4, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-soil-700 mb-1.5">
            {t('delivery.name') as string} *
          </label>
          <input
            type="text"
            placeholder={t('delivery.name.placeholder') as string}
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={inputClasses('fullName')}
          />
          {errors.fullName && (
            <p className="text-error text-[13px] mt-1 flex items-center gap-1">
              <AlertCircle size={13} /> {errors.fullName}
            </p>
          )}
        </motion.div>

        {/* Phone */}
        <motion.div
          animate={shaking === 'phone' ? { x: [0, -4, 4, -4, 4, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-soil-700 mb-1.5">
            {t('delivery.phone') as string} *
          </label>
          <input
            type="tel"
            placeholder={t('delivery.phone.placeholder') as string}
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={inputClasses('phone')}
          />
          {errors.phone && (
            <p className="text-error text-[13px] mt-1 flex items-center gap-1">
              <AlertCircle size={13} /> {errors.phone}
            </p>
          )}
        </motion.div>

        {/* Address */}
        <motion.div
          animate={shaking === 'address' ? { x: [0, -4, 4, -4, 4, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-soil-700 mb-1.5">
            {t('delivery.address') as string} *
          </label>
          <textarea
            placeholder={t('delivery.address.placeholder') as string}
            rows={3}
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className={`${inputClasses('address')} h-auto py-3 resize-none`}
          />
          {errors.address && (
            <p className="text-error text-[13px] mt-1 flex items-center gap-1">
              <AlertCircle size={13} /> {errors.address}
            </p>
          )}
        </motion.div>

        {/* City */}
        <motion.div
          animate={shaking === 'city' ? { x: [0, -4, 4, -4, 4, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-soil-700 mb-1.5">
            {t('delivery.city') as string} *
          </label>
          <select
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className={inputClasses('city')}
          >
            <option value="">{t('delivery.city.placeholder') as string}</option>
            {cameroonCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-error text-[13px] mt-1 flex items-center gap-1">
              <AlertCircle size={13} /> {errors.city}
            </p>
          )}
        </motion.div>

        {/* Delivery Type */}
        <div>
          <label className="block text-sm font-medium text-soil-700 mb-2">
            {t('delivery.type') as string}
          </label>
          <div className="space-y-2">
            {deliveryOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-4 rounded-xl border-[1.5px] cursor-pointer transition-all duration-200 ${
                  formData.deliveryType === option.id
                    ? 'border-terracotta bg-terracotta-light/30'
                    : 'border-soil-200 hover:border-soil-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryType"
                  value={option.id}
                  checked={formData.deliveryType === option.id}
                  onChange={(e) => handleChange('deliveryType', e.target.value)}
                  className="w-4 h-4 accent-terracotta"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium text-soil-900">
                      {lang === 'fr' ? option.label : option.labelEn}
                    </span>
                    <span className="text-[15px] font-bold text-soil-900">
                      {option.price === 0 ? (lang === 'fr' ? 'Gratuit' : 'Free') : `${option.price.toLocaleString()} FCFA`}
                    </span>
                  </div>
                  <p className="text-[13px] text-soil-500">
                    {lang === 'fr' ? option.estimatedTime : option.estimatedTimeEn}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-soil-700 mb-1.5">
            {t('delivery.notes') as string}
          </label>
          <textarea
            placeholder={t('delivery.notes.placeholder') as string}
            rows={2}
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className={`${inputClasses('notes')} h-auto py-3 resize-none`}
          />
        </div>

        {/* GPS Location Button */}
        <button
          type="button"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(() => {});
            }
          }}
          className="flex items-center gap-2 px-4 py-3 border-[1.5px] border-soil-300 rounded-[10px] text-soil-700 text-sm font-medium hover:bg-soil-100 transition-colors w-full justify-center"
        >
          <MapPin size={16} />
          {t('delivery.useGps') as string}
        </button>

        {/* Delivery Cost Preview */}
        {formData.city && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center p-4 bg-leaf-light/50 rounded-xl"
          >
            <span className="text-sm text-soil-700">
              {t('cart.delivery') as string} ({lang === 'fr' ? selectedOption?.label : selectedOption?.labelEn})
            </span>
            <span className="font-bold text-soil-900">{deliveryCost.toLocaleString()} FCFA</span>
          </motion.div>
        )}

        {/* CTA */}
        <button
          onClick={handleSubmit}
          className="w-full h-14 bg-terracotta text-white font-semibold text-[15px] rounded-[10px] hover:bg-terracotta-dark active:scale-[0.98] transition-all duration-200 mt-4"
        >
          {t('delivery.cta') as string}
        </button>
      </div>
    </motion.div>
  );
}
