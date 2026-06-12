import { memo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { inventory, stockAlerts } from '@/data/dashboardData';

const InventoryListComponent = memo(function InventoryListComponent() {
  const { lang } = useLanguage();

  const t = {
    myProducts: lang === 'fr' ? 'Mes Produits' : 'My Products',
    addProduct: lang === 'fr' ? 'Ajouter un Produit' : 'Add Product',
    stockAlerts: lang === 'fr' ? 'Alertes Stock' : 'Stock Alerts',
    sales30d: lang === 'fr' ? 'ventes (30j)' : 'sales (30d)',
    edit: lang === 'fr' ? 'Modifier' : 'Edit',
    restock: lang === 'fr' ? 'Reapprovisionner' : 'Restock',
    update: lang === 'fr' ? 'Mettre a Jour' : 'Update',
    outOfStockWarning: lang === 'fr' ? 'Stock epuise dans ~2 jours' : 'Stock out in ~2 days',
    lowStockWarning: lang === 'fr' ? "Pensez a reapprovisionner" : 'Consider restocking',
  };

  const getStockColor = (stock: number, max: number) => {
    const pct = stock / max;
    if (pct < 0.2) return 'bg-terracotta';
    if (pct < 0.5) return 'bg-sun';
    return 'bg-leaf';
  };

  const getStockTextColor = (stock: number, max: number) => {
    const pct = stock / max;
    if (pct < 0.2) return 'text-terracotta';
    if (pct < 0.5) return 'text-sun';
    return 'text-leaf';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Product List */}
      <div className="bg-soil-50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-display-sm text-soil-900">{t.myProducts}</h3>
          <button className="px-3 py-1.5 bg-terracotta text-white text-label rounded-lg hover:bg-terracotta-dark transition-colors">
            {t.addProduct}
          </button>
        </div>
        <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
          {inventory.map((item, i) => {
            const pct = (item.stock / item.maxStock) * 100;
            const barColor = getStockColor(item.stock, item.maxStock);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-3 py-3 border-b border-soil-200 last:border-0"
              >
                <div className="w-12 h-12 rounded-lg bg-soil-200 flex items-center justify-center shrink-0 overflow-hidden">
                  <span className="text-body-sm text-soil-500">{item.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-body text-soil-900 font-semibold truncate">
                      {lang === 'fr' ? item.name : item.nameEn}
                    </p>
                    <span className={`text-body-sm font-medium ${getStockTextColor(item.stock, item.maxStock)}`}>
                      {item.stock}/{item.maxStock}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-soil-200 rounded-full overflow-hidden mb-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                      className={`h-full rounded-full ${barColor}`}
                    />
                  </div>
                  <p className="text-body-sm text-soil-500">
                    {item.sales30d} {t.sales30d}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stock Alerts */}
      <div className="bg-soil-50 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={20} className="text-warning" />
          <h3 className="font-display text-display-sm text-soil-900">{t.stockAlerts}</h3>
        </div>
        <div className="space-y-3">
          {stockAlerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={`bg-white rounded-xl p-4 border-l-[3px] ${
                alert.severity === 'critical' ? 'border-l-terracotta' : 'border-l-warning'
              } shadow-card`}
            >
              <p className="text-body text-soil-900 font-semibold mb-1">
                {lang === 'fr' ? alert.productName : alert.productNameEn} — {lang === 'fr' ? alert.message : alert.messageEn}
              </p>
              <p className="text-body-sm text-soil-600 mb-3">
                {alert.severity === 'critical' ? t.outOfStockWarning : t.lowStockWarning}
              </p>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1.5 rounded-lg text-label transition-colors ${
                    alert.severity === 'critical'
                      ? 'bg-terracotta text-white hover:bg-terracotta-dark'
                      : 'bg-soil-100 text-soil-700 hover:bg-soil-200'
                  }`}
                >
                  {alert.severity === 'critical' ? t.restock : t.update}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

export default InventoryListComponent;
