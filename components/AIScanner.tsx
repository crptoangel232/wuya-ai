import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCw, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { analyzePlantImage, analyzeSoilImage } from '../services/geminiService';

interface AIScannerProps {
  mode: 'PLANT' | 'SOIL';
  onClose: () => void;
}

const AIScanner: React.FC<AIScannerProps> = ({ mode, onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        // Strip prefix for API
        const base64Data = base64.split(',')[1];
        analyze(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyze = async (base64Data: string) => {
    setLoading(true);
    setResult(null);
    try {
      const res = mode === 'PLANT' 
        ? await analyzePlantImage(base64Data)
        : await analyzeSoilImage(base64Data);
      setResult(res);
    } catch (error) {
      setResult("Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className={`p-4 text-white flex justify-between items-center ${mode === 'PLANT' ? 'bg-leaf-600' : 'bg-earth-500'}`}>
        <h2 className="font-bold text-lg flex items-center gap-2">
          {mode === 'PLANT' ? <Camera size={20} /> : <Upload size={20} />}
          {mode === 'PLANT' ? 'AI Plant Doctor' : 'AI Soil Scan'}
        </h2>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
          <X size={20} />
        </button>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {!image ? (
          <div className="h-64 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
               onClick={() => fileInputRef.current?.click()}>
            <Camera size={48} className="mb-4 opacity-50" />
            <p className="font-medium">Take a photo or upload</p>
            <p className="text-sm opacity-75">
              {mode === 'PLANT' ? 'Focus on the affected leaf' : 'Capture a clear view of soil texture'}
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative h-48 w-full rounded-xl overflow-hidden bg-black">
              <img src={image} alt="Scan" className="w-full h-full object-contain" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-8 text-center animate-pulse">
                <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4 ${mode === 'PLANT' ? 'border-leaf-600' : 'border-earth-500'}`}></div>
                <p className="text-gray-600 font-medium">AI is analyzing your {mode === 'PLANT' ? 'crop' : 'soil'}...</p>
                <p className="text-xs text-gray-400 mt-2">Detecting issues • Checking database • Formulating advice</p>
              </div>
            )}

            {result && !loading && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-leaf-600" />
                  Analysis Result
                </h3>
                <div className="prose prose-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {result}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => setImage(null)}
                    className={`w-full py-3 rounded-lg font-semibold text-white shadow-md ${mode === 'PLANT' ? 'bg-leaf-600 hover:bg-leaf-700' : 'bg-earth-500 hover:bg-earth-600'}`}
                  >
                    Scan Another
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIScanner;
