import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  List, ListItem, ListItemButton, ListItemIcon,
  ListItemText,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from '../common/components/LocalizationProvider';
import { useRestriction } from '../common/util/permissions';

const NavigationItem = ({ action, text, icon }) => (
  <ListItem disablePadding onClick={action}>
    <ListItemButton>
      <ListItemIcon style={{ color: '#fff' }}>
        {icon}
      </ListItemIcon>
      <ListItemText style={{ color: '#fff' }} primary={text} />
    </ListItemButton>
  </ListItem>
);

const SideNavigationItems = () => {
  const navigate = useNavigate();
  const t = useTranslation();

  const readonly = useRestriction('readonly');
  const disableReports = useRestriction('disableReports');
  const user = useSelector((state) => state.session.user);

  const handleSelection = (value) => {
    switch (value) {
      case 'map':
        navigate('/');
        break;
      case 'reports':
        navigate('/reports/combined');
        break;
      case 'settings':
        navigate('/settings/preferences');
        break;
      case 'account':
        navigate(`/settings/user/${user.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <List>
      <NavigationItem
        action={() => handleSelection('map')}
        text={t('mapTitle')}
        icon={<MapIcon />}
      />

      { !disableReports && (
        <NavigationItem
          action={() => handleSelection('reports')}
          text={t('reportTitle')}
          icon={<DescriptionIcon />}
        />
      )}

      <NavigationItem
        action={() => handleSelection('settings')}
        text={t('settingsTitle')}
        icon={<SettingsIcon />}
      />

      { !readonly && (
        <NavigationItem
          action={() => handleSelection('account')}
          text={t('settingsUser')}
          icon={<PersonIcon />}
        />
      )}
    </List>
  );
};
export default SideNavigationItems;
