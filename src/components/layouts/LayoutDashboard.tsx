import { Outlet, Navigate } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function LayoutDashboard() {
  const token = useSelector((state: RootState) => state.auth.token)
  if (!token) {
      return <Navigate to="/auth/login" replace />
  }

  return (
    <DashboardLayout>
      <PageContainer >
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}