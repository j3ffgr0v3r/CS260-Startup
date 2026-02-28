import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastContext = React.createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = React.useState({
    show: false,
    title: '',
    message: '',
    bg: 'dark' // 'success' | 'warning' | 'info' | ...
  });

  function showToast({ title, message, bg = 'dark' }) {
    setToast({ show: true, title, message, bg });
  }

  function hideToast() {
    setToast((t) => ({ ...t, show: false }));
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer position="top-end" className="p-3">
        <Toast bg={toast.bg} show={toast.show} onClose={hideToast} autohide delay={2500}>
          <Toast.Header closeButton>
            <strong className="me-auto">{toast.title}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
