import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { recentOrders, statusConfig, orderFilterTabs } from '@/data/dashboardData';
import type { Order } from '@/data/dashboardData';

const OrdersTableComponent = memo(function OrdersTableComponent() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState('all');

  const t = {
    title: lang === 'fr' ? 'Commandes Recentes' : 'Recent Orders',
    seeAll: lang === 'fr' ? 'Voir Tout' : 'See All',
    order: lang === 'fr' ? 'Commande' : 'Order',
    client: lang === 'fr' ? 'Client' : 'Customer',
    products: lang === 'fr' ? 'Produits' : 'Products',
    total: lang === 'fr' ? 'Total' : 'Total',
    status: lang === 'fr' ? 'Statut' : 'Status',
    date: lang === 'fr' ? 'Date' : 'Date',
    view: lang === 'fr' ? 'Voir' : 'View',
    mobileProducts: lang === 'fr' ? 'Produits' : 'Items',
    mobileDate: lang === 'fr' ? 'Date' : 'Date',
  };

  const filteredOrders: Order[] =
    filter === 'all'
      ? recentOrders
      : filter === 'pending'
        ? recentOrders.filter((o) => o.status === 'pending-payment')
        : recentOrders.filter((o) => o.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="bg-soil-50 rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="font-display text-display-sm text-soil-900">{t.title}</h3>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 flex-wrap">
            {orderFilterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-1 rounded-full text-label transition-colors ${
                  filter === tab.key
                    ? 'bg-terracotta text-white'
                    : 'bg-soil-100 text-soil-600 hover:bg-soil-200'
                }`}
              >
                {lang === 'fr' ? tab.label : tab.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-soil-200">
              <th className="text-left text-label text-soil-500 pb-2 pr-4">{t.order}</th>
              <th className="text-left text-label text-soil-500 pb-2 pr-4">{t.client}</th>
              <th className="text-left text-label text-soil-500 pb-2 pr-4">{t.products}</th>
              <th className="text-left text-label text-soil-500 pb-2 pr-4">{t.total}</th>
              <th className="text-left text-label text-soil-500 pb-2 pr-4">{t.status}</th>
              <th className="text-left text-label text-soil-500 pb-2">{t.date}</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order, i) => {
                const config = statusConfig[order.status];
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="border-b border-soil-100 last:border-0 hover:bg-soil-100/50 transition-colors"
                  >
                    <td className="py-3 pr-4 font-mono text-body-sm text-soil-700">{order.id}</td>
                    <td className="py-3 pr-4 text-body-sm text-soil-900">
                      {lang === 'fr' ? order.client : order.clientEn}
                    </td>
                    <td className="py-3 pr-4 text-body-sm text-soil-600">
                      {lang === 'fr' ? order.products : order.productsEn}
                    </td>
                    <td className="py-3 pr-4 text-body-sm font-medium text-soil-900">{order.total}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label ${config.bg} ${config.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                        {lang === 'fr' ? config.label : config.labelEn}
                      </span>
                    </td>
                    <td className="py-3 text-body-sm text-soil-500">{order.date}</td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredOrders.map((order, i) => {
            const config = statusConfig[order.status];
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-white rounded-xl p-4 shadow-card"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-body-sm text-soil-700">{order.id}</span>
                  <span className="text-body-sm text-soil-500">{order.date}</span>
                </div>
                <p className="text-body text-soil-900 font-medium mb-1">
                  {lang === 'fr' ? order.client : order.clientEn}
                </p>
                <p className="text-body-sm text-soil-500 mb-3">
                  {lang === 'fr' ? order.products : order.productsEn}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-medium text-soil-900">{order.total}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label ${config.bg} ${config.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    {lang === 'fr' ? config.label : config.labelEn}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

export default OrdersTableComponent;
