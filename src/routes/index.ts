import { createBrowserRouter } from 'react-router';
import App from '@/App';
import Layout from '@/components/layouts/LayoutDashboard';
import LayoutAuth from '@/components/layouts/LayoutAuth';
import DashboardPage from '@/pages/index';
import Login from '@/pages/auth/Login';
import NotFoundPage from '@/pages/error/404';
import FormsPage from '@/pages/forms/Forms';
import FormDetailPage from '@/pages/forms/FormDetails';
import FormResponse from '@/pages/forms/FormResponse';
import LayoutForm from '@/components/layouts/LayoutForm';

const unauthenticatedRoutes = [
    {
        path: '/auth',
        Component: LayoutAuth,
        children: [
            {
                path: 'login',
                Component: Login
            },
        ]
    }
]

const authenticatedRoutes = [
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: Layout,
                children: [
                    {
                        path: '',
                        Component: DashboardPage,
                    },
                    {
                        path: 'forms/',
                        Component: FormsPage,
                    },
                    {
                        path: 'forms/:slug/details',
                        Component: FormDetailPage,
                    },
                ],
            },
            {
                path: '/',
                Component: LayoutForm,
                children: [
                    {
                        path: 'forms/:slug/response',
                        Component: FormResponse,
                    },
                ]
            }
        ]
    }
]

const errorPage = [
    {
        Component: App,
        children: [
            {
                path: '*',
                Component: NotFoundPage,
            },
        ]
    }
]

const router = createBrowserRouter([
    ...unauthenticatedRoutes,
    ...authenticatedRoutes,
    ...errorPage
]);


export default router;