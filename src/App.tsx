import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { QuickToast } from './components/QuickToast';
import { HairQuizModal } from './components/HairQuizModal';
import { AuthModal } from './components/AuthModal';

// Views
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ProductDetailView } from './views/ProductDetailView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { AccountView } from './views/AccountView';
import { AdminLoginView } from './views/AdminLoginView';
import { AdminDashboardView } from './views/AdminDashboardView';

const MainAppContent: React.FC = () => {
  const { currentPage, isAdminAuthenticated } = useStore();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'products':
        return <ProductsView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'account':
      case 'auth':
        return <AccountView />;
      case 'admin-login':
        return isAdminAuthenticated ? <AdminDashboardView /> : <AdminLoginView />;
      case 'admin-dashboard':
        return isAdminAuthenticated ? <AdminDashboardView /> : <AdminLoginView />;
      default:
        return <HomeView />;
    }
  };

  const isAdminView = currentPage === 'admin-login' || currentPage === 'admin-dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#173124] selection:bg-[#f0debd] selection:text-[#173124]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer (hidden in admin views for focus) */}
      {!isAdminView && <Footer />}

      {/* Interactive Global Overlays & Widgets */}
      <CartDrawer />
      <HairQuizModal />
      <AuthModal />
      <WhatsAppFloatingButton />
      <QuickToast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
