import { Outlet, useNavigate } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Session } from '@toolpad/core/AppProvider';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { store } from '@/store'
import { clearAuth } from '@/store/auth/authSlice';
import { NavigationList } from './components/layouts/navigation/Navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const NAVIGATION = NavigationList;

const BRANDING = {
  title: 'Form Assist',
};

export default function App() {
  const user = useSelector((state: RootState) => state.auth.user)
  const session: Session = {
    user: {
      name: user?.name,
      email: user?.email,
      image: '',
    }
  }

  const navigate = useNavigate();
  const authentication = useMemo(() => {
    return {
      signIn: () => { },
      signOut: () => {
        store.dispatch(clearAuth())
        navigate('/auth/login', { replace: true });
      },
    };
  }, []);

  const queryClient = new QueryClient();
  return (
    <ReactRouterAppProvider authentication={authentication} session={session} navigation={NAVIGATION} branding={BRANDING}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </ReactRouterAppProvider>
  );
}