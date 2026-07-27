import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { DashboardPage } from './pages/DashboardPage'
import { LiveOrdersPage } from './pages/LiveOrdersPage'
import { MenuPage } from './pages/MenuPage'
import { OrderHistoryPage } from './pages/OrderHistoryPage'
import { SettingsPage } from './pages/SettingsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="live-orders" element={<LiveOrdersPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="order-history" element={<OrderHistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
