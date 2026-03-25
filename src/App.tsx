import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import DashboardPage from './pages/admin/DashboardPage';
import MembersPage from './pages/admin/MembersPage';
import CampaignsAdminPage from './pages/admin/CampaignsAdminPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';

function App() {
  return (
    <BrowserRouter>
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
        </Route>

        {/* Admin Operation Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="campaigns" element={<CampaignsAdminPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
