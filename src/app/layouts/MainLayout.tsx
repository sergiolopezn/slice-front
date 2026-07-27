import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/shared/components/navigation'

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-bg-app">
      <Sidebar />
      <div className="min-w-0 flex-1" data-testid="main-content">
        <Outlet />
      </div>
    </div>
  )
}
