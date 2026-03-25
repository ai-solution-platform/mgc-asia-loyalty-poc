import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from './pages/LandingPage';
import MobileLayout from './components/layout/MobileLayout';
import AdminLayout from './components/layout/AdminLayout';
import HomePage from './pages/app/HomePage';
import CampaignsPage from './pages/app/CampaignsPage';
import RewardsPage from './pages/app/RewardsPage';
import WalletPage from './pages/app/WalletPage';
import ProfilePage from './pages/app/ProfilePage';
import NotificationsPage from './pages/app/NotificationsPage';
import AppointmentPage from './pages/app/AppointmentPage';
import TierBenefitsPage from './pages/app/TierBenefitsPage';
import PrivacyPage from './pages/app/PrivacyPage';
import NotificationSettingsPage from './pages/app/NotificationSettingsPage';
import HelpPage from './pages/app/HelpPage';
import EarnPage from './pages/app/EarnPage';
import TransferPage from './pages/app/TransferPage';
import DashboardPage from './pages/admin/DashboardPage';
import MembersPage from './pages/admin/MembersPage';
import CampaignsAdminPage from './pages/admin/CampaignsAdminPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import RewardsAdminPage from './pages/admin/RewardsAdminPage';
import CouponsAdminPage from './pages/admin/CouponsAdminPage';
import CommunicationsPage from './pages/admin/CommunicationsPage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Customer Mobile App */}
          <Route path="/app" element={<MobileLayout />}>
            <Route index element={<HomePage />} />
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="appointment" element={<AppointmentPage />} />
            <Route path="tier-benefits" element={<TierBenefitsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="notification-settings" element={<NotificationSettingsPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="earn" element={<EarnPage />} />
            <Route path="transfer" element={<TransferPage />} />
          </Route>

          {/* Admin Operation Portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="campaigns" element={<CampaignsAdminPage />} />
            <Route path="rewards" element={<RewardsAdminPage />} />
            <Route path="coupons" element={<CouponsAdminPage />} />
            <Route path="communications" element={<CommunicationsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
