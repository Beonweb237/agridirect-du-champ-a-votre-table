import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import Home from '@/pages/Home';
import Marketplace from '@/pages/Marketplace';
import ProductDetail from '@/pages/ProductDetail';
import ProducerProfile from '@/pages/ProducerProfile';
import Cart from '@/pages/Cart';
import MapPage from '@/pages/MapPage';
import Dashboard from '@/pages/Dashboard';
import Chat from '@/pages/Chat';
import About from '@/pages/About';
import Traceability from '@/pages/Traceability';

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/producer/:id" element={<ProducerProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="/trace/:qr" element={<Traceability />} />
      </Routes>
    </LanguageProvider>
  );
}
