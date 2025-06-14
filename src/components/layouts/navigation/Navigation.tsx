import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import type { Navigation } from '@toolpad/core/AppProvider';

export const NavigationList: Navigation = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'forms',
    title: 'Forms',
    icon: <DescriptionIcon />,
    pattern: 'forms{/:id}*',
  }
];