import React, { useMemo } from 'react';
import './DropdownMenu.css';
import { useSelector } from 'react-redux';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useTranslation } from '../common/components/LocalizationProvider';

const routes = () => {
  const t = useTranslation();
  const user = useSelector((state) => state.session.user);

  return useMemo(() => [
    {
      title: t('mapTitle'),
      route: '/',
      icon: <MapIcon />,
      dropdown: [],
    },
    {
      title: t('settingsUser'),
      route: `/settings/user/${user.id}`,
      icon: <PersonIcon />,
      dropdown: [],
    },
    {
      title: t('reportTitle'),
      route: '/reports/combined',
      icon: <DescriptionIcon />,
      dropdown: [
        {
          title: 'prueba12',
          route: '/',
          icon: <PersonIcon />,
        },
        {
          title: 'prueba23',
          route: '/',
          icon: <PersonIcon />,
        },
      ],
    },
    {
      title: t('settingsTitle'),
      route: '/settings/preferences',
      icon: <SettingsIcon />,
      dropdown: [
        {
          title: 'prueba1',
          route: '/',
          icon: <PersonIcon />,
        },
        {
          title: 'prueba2',
          route: '/',
          icon: <PersonIcon />,
        },
        {
          title: 'prueba3',
          route: '/',
          icon: <PersonIcon />,
        },
        {
          title: 'prueba4',
          route: '/',
          icon: <PersonIcon />,
        },
      ],
    },
  ], [t]);
};

const DropdownMenuItem = ({ dropdown }) => (
  <section className="sub-menu">
    <ul className="list-item">
      {
        dropdown.map(({ title, route, icon }) => (
          <li key={`route-${title}`}>
            <Link href={route}>
              {icon}
              {title}
            </Link>
          </li>
        ))
      }
    </ul>
  </section>
);

const DropdownMenu = () => {
  console.log('menu');
  return (
    <nav className="dropdown-menu">
      <ul>
        {
          routes().map(({ title, route, icon, dropdown }) => {
            const activeDropdown = dropdown.length > 0;
            return (
              <li key={`route-${title}`} className={activeDropdown ? 'dropdown-item-has-children' : ''}>
                <Link href={route}>
                  { icon }
                  { title }
                </Link>

                {
                  activeDropdown
                    ? (<DropdownMenuItem dropdown={dropdown} />)
                    : null
                }
              </li>
            );
          })
        }
        {/* <li>
          <a href="#">Mapa</a>
        </li>
        <li>
          <a href="#">Cuenta</a>
        </li>
        <li className="dropdown-item-has-children">
          <a href="#">
            Ajustes
            <i className="fas fa-angle-down" />
          </a>
          <div className="sub-menu">
            <ul className="list-item">
              <li>
                <a href="#">
                  <i className="fas fa-heart" />
                  Preferencias
                </a>
              </li>
            </ul>
          </div>
        </li> */}
      </ul>
    </nav>
  );
};

export default DropdownMenu;
