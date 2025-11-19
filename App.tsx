import React, { useState } from 'react';
import { LayoutGrid, Leaf, Sprout, Store, Bot, CloudSun, MapPin, Droplets, Wind, DollarSign, Search, Menu } from 'lucide-react';
import { AppView, MarketItem } from './types';
import AIScanner from './components/AIScanner';
import ChatAssistant from './components/ChatAssistant';
import CoopDashboard from './components/CoopDashboard';

// --- Mock Data ---
const MOCK_MARKET_ITEMS: MarketItem[] = [
  { id: '1', name: 'Local Parboiled Rice', category: 'Crop', price: 450, currency: 'SLE', location: 'Bo Market', seller: 'Amara Kamara', image: 'https://picsum.photos/200/200?random=1' },
  { id: '2', name: 'NPK 15-15-15', category: 'Fertilizer', price: 800, currency: 'SLE', location: 'Kenema Depot', seller: 'Agro Supply Co.', image: 'https://picsum.photos/200/200?random=2' },
  { id: '3', name: 'Cassava Tubers', category: 'Crop', price: 120, currency: 'SLE', location: 'Freetown', seller: 'Fatima S.', image: 'https://picsum.photos/200/200?random=3' },
  { id: '4', name: 'Hoes & Machetes', category: 'Tool', price: 250, currency: 'SLE', location: 'Makeni', seller: 'Tools Ltd', image: 'https://picsum.photos/200/200?random=4' },
];

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Components for Views ---

  const HomeView = () => (
    <div className="pb-24">
      {/* Header Section */}
      <div className="bg-leaf-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-leaf-100 text-sm">Good Morning,</p>
            <h1 className="text-2xl font-bold">Farmer Musa</h1>
          </div>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <CloudSun size={24} />
          </div>
        </div>
        
        {/* Weather Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2 text-sm text-leaf-100 mb-2">
            <MapPin size={14} />
            <span>Bo District, Sierra Leone</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-4xl font-bold">28°C</span>
              <p className="text-sm">Partly Cloudy</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex flex-col items-center">
                <Droplets size={16} className="mb-1 opacity-80" />
                <span>65%</span>
              </div>
              <div className="flex flex-col items-center">
                <Wind size={16} className="mb-1 opacity-80" />
                <span>12 km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="p-6">
        <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setView(AppView.PLANT_DOCTOR)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:bg-leaf-50 transition-colors">
            <div className="p-3 bg-leaf-100 text-leaf-600 rounded-full">
              <Leaf size={24} />
            </div>
            <span className="font-medium text-sm">Plant Doctor</span>
          </button>
          <button onClick={() => setView(AppView.SOIL_SCAN)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:bg-earth-50 transition-colors">
            <div className="p-3 bg-earth-100 text-earth-500 rounded-full">
              <Sprout size={24} />
            </div>
            <span className="font-medium text-sm">Soil Scan</span>
          </button>
          <button onClick={() => setView(AppView.ASSISTANT)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:bg-blue-50 transition-colors">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Bot size={24} />
            </div>
            <span className="font-medium text-sm">Farm AI</span>
          </button>
          <button onClick={() => setView(AppView.MARKETPLACE)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:bg-orange-50 transition-colors">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
              <Store size={24} />
            </div>
            <span className="font-medium text-sm">Market</span>
          </button>
        </div>
      </div>

      {/* Community Feed Snippet */}
      <div className="px-6 pb-6">
        <h2 className="font-bold text-gray-800 mb-4">Community Hub</h2>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex gap-3 border-b border-gray-100 pb-3">
            <img src="https://picsum.photos/40/40?random=10