import { memo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { customerTypes, topCustomers } from '@/data/dashboardData';

const CustomerInsightsComponent = memo(function CustomerInsightsComponent() {
  const { lang } = useLanguage();

  const t = {
    customerTypes: lang === 'fr' ? 'Types de Clients' : 'Customer Types',
    topCustomers: lang === 'fr' ? 'Meilleurs Clients (30j)' : 'Top Customers (30d)',
    orders: lang === 'fr' ? 'commandes' : 'orders',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Pie Chart */}
      <div className="bg-soil-50 rounded-2xl p-6">
        <h3 className="font-display text-display-sm text-soil-900 mb-4">{t.customerTypes}</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-[180px] h-[180px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {customerTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, _name: string, props: { payload?: { name?: string } }) => {
                    return [`${value}%`, props?.payload?.name || ''];
                  }}
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #D9D5D0',
                    borderRadius: 10,
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-3">
            {customerTypes.map((type) => (
              <div key={type.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: type.color }}
                />
                <span className="text-body-sm text-soil-700">
                  {lang === 'fr' ? type.name : type.nameEn} ({type.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-soil-50 rounded-2xl p-6">
        <h3 className="font-display text-display-sm text-soil-900 mb-4">{t.topCustomers}</h3>
        <div className="space-y-3">
          {topCustomers.map((customer, i) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="flex items-center gap-3 py-2"
            >
              <div className="w-9 h-9 rounded-full bg-leaf-light flex items-center justify-center text-leaf text-label font-semibold shrink-0">
                {customer.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body text-soil-900 font-medium truncate">
                  {lang === 'fr' ? customer.name : customer.nameEn}
                </p>
                <p className="text-body-sm text-soil-500">
                  {customer.orderCount} {t.orders}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-body-sm font-medium text-soil-900">{customer.totalSpent}</p>
                <TrendingUp size={12} className="inline text-leaf ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

export default CustomerInsightsComponent;
