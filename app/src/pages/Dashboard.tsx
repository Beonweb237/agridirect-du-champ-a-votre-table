import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import KPICard from '@/components/dashboard/KPICard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import OrdersTable from '@/components/dashboard/OrdersTable';
import InventoryList from '@/components/dashboard/InventoryList';
import CustomerInsights from '@/components/dashboard/CustomerInsights';
import QuickActionsFAB from '@/components/dashboard/QuickActionsFAB';
import { kpiCards } from '@/data/dashboardData';

const dateRangeTabs = [
  { key: '7d', label: '7 jours', labelEn: '7 days' },
  { key: '30d', label: '30 jours', labelEn: '30 days' },
  { key: '3m', label: '3 mois', labelEn: '3 months' },
  { key: '1y', label: 'Cette Annee', labelEn: 'This Year' },
];

const dashboardTabs = [
  { key: 'overview', label: 'Vue d\'Ensemble', labelEn: 'Overview' },
  { key: 'orders', label: 'Commandes', labelEn: 'Orders' },
  { key: 'products', label: 'Produits', labelEn: 'Products' },
  { key: 'analytics', label: 'Analytics', labelEn: 'Analytics' },
  { key: 'messages', label: 'Messages', labelEn: 'Messages' },
];

export default function Dashboard() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  const t = {
    title: lang === 'fr' ? 'Tableau de Bord' : 'Dashboard',
    producerBadge: lang === 'fr' ? 'Producteur' : 'Producer',
  };

  return (
    <Layout>
      <div className="pt-16 md:pt-20 pb-6 min-h-[100dvh] bg-white">
        {/* Dashboard Header */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="flex flex-col gap-4 py-4 border-b border-soil-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="font-display text-display-md text-soil-900">{t.title}</h1>
                <span className="px-2.5 py-1 bg-leaf-light text-leaf-dark text-label rounded-full">
                  {t.producerBadge}
                </span>
              </div>
              <button className="relative p-2 text-soil-600 hover:text-soil-900 transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-terracotta rounded-full animate-pulse" />
              </button>
            </div>

            {/* Tabs - desktop */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex gap-1">
                {dashboardTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 text-body-sm font-medium transition-colors relative ${
                      activeTab === tab.key ? 'text-terracotta' : 'text-soil-500 hover:text-soil-700'
                    }`}
                  >
                    {lang === 'fr' ? tab.label : tab.labelEn}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="dashTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta"
                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 bg-soil-100 rounded-full p-1">
                {dateRangeTabs.map((range) => (
                  <button
                    key={range.key}
                    onClick={() => setDateRange(range.key)}
                    className={`px-3 py-1 rounded-full text-label transition-colors ${
                      dateRange === range.key
                        ? 'bg-white text-soil-900 shadow-sm'
                        : 'text-soil-500 hover:text-soil-700'
                    }`}
                  >
                    {lang === 'fr' ? range.label : range.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile: scrollable tabs */}
            <div className="flex md:hidden gap-1 overflow-x-auto hide-scrollbar">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded-full text-label whitespace-nowrap transition-colors ${
                    activeTab === tab.key
                      ? 'bg-terracotta text-white'
                      : 'bg-soil-100 text-soil-600'
                  }`}
                >
                  {lang === 'fr' ? tab.label : tab.labelEn}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {kpiCards.map((card, i) => (
              <KPICard key={card.title} card={card} index={i} />
            ))}
          </div>

          {/* Revenue Chart */}
          <RevenueChart />

          {/* Orders Table */}
          <OrdersTable />

          {/* Inventory + Alerts */}
          <InventoryList />

          {/* Customer Insights */}
          <CustomerInsights />
        </div>
      </div>

      {/* FAB */}
      <QuickActionsFAB />
    </Layout>
  );
}
