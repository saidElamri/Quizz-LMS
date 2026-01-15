import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="glass-v2"
              style={{
                padding: '20px 24px',
                width: '320px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                background: 'white',
              }}
            >
              <div style={{ 
                padding: '8px', 
                borderRadius: '10px', 
                background: toast.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : toast.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                color: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : 'var(--fluid-primary)'
              }}>
                {toast.type === 'success' ? <CheckCircle2 size={20} /> : toast.type === 'error' ? <AlertCircle size={20} /> : <Info size={20} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 900, fontSize: '0.85rem', marginBottom: '4px', letterSpacing: '0.05em' }}>{toast.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-600)', fontWeight: 500 }}>{toast.message}</div>
              </div>
              <button onClick={() => removeToast(toast.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.3, padding: 0 }}>
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
