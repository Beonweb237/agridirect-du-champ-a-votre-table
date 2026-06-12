import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';
import { TrendingUp, BarChart3, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { revenueData } from '@/data/dashboardData';

const RevenueChartComponent = memo(function RevenueChartComponent() {
  const { lang } = useLanguage();
  const t = {
    title: lang === 'fr' ? 'Evolution des Revenus' : 'Revenue Trends',
    revenue: lang === 'fr' ? 'Revenus' : 'Revenue',
    orders: lang === 'fr' ? 'Commandes' : 'Orders',
    total: lang === 'fr' ? 'Total' : 'Total',
    avgDay: lang === 'fr' ? 'Moyenne/jour' : 'Avg/day',
    bestDay: lang === 'fr' ? 'Meilleur jour' : 'Best day',
    bestDayValue: '145,000 FCFA (15 Nov)',
    avgValue: '81,667 FCFA',
    totalValue: '2,450,000 FCFA',
  };

  const formatFCFA = (val: number) => {
    if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
    return `${val}`;
  };

  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const avgRevenue = Math.round(totalRevenue / revenueData.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="bg-soil-50 rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="font-display text-display-sm text-soil-900">{t.title}</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-body-sm">
            <span className="flex items-center gap-1.5 text-leaf">
              <TrendingUp size={14} />
              {t.revenue}
            </span>
            <span className="flex items-center gap-1.5 text-sky">
              <BarChart3 size={14} />
              {t.orders}
            </span>
          </div>
          <button className="p-2 rounded-lg hover:bg-soil-200 transition-colors text-soil-500">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4A7C3F" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4A7C3F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EFEBE6" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#9C9690' }}
              axisLine={{ stroke: '#D9D5D0' }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: '#9C9690' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatFCFA}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: '#9C9690' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #D9D5D0',
                borderRadius: 10,
                fontSize: 13,
                boxShadow: '0 4px 12px rgba(45, 41, 38, 0.1)',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'revenue') return [`${value.toLocaleString()} FCFA`, t.revenue];
                return [`${value}`, t.orders];
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#4A7C3F"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              animationDuration={1200}
              animationEasing="ease-out"
              name="revenue"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#4A8FBF"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
              animationDuration={1200}
              animationEasing="ease-out"
              name="orders"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Row */}
      <div className="flex flex-wrap gap-4 sm:gap-8 mt-4 pt-4 border-t border-soil-200">
        <div>
          <span className="text-body text-soil-900 font-semibold">
            {t.total}: {t.totalValue}
          </span>
        </div>
        <div>
          <span className="text-body-sm text-soil-600">
            {t.avgDay}: {avgRevenue.toLocaleString()} FCFA
          </span>
        </div>
        <div>
          <span className="text-body-sm text-leaf">{t.bestDayValue}</span>
        </div>
      </div>
    </motion.div>
  );
});

export default RevenueChartComponent;
