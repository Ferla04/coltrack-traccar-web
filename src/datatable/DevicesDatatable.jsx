import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';
import { useSelector } from 'react-redux';
import { useEffectAsync } from '../reactHelper';
import { useTranslation } from '../common/components/LocalizationProvider';
import PageLayout from '../common/components/PageLayout';
import SettingsMenu from '../settings/components/SettingsMenu';
import CollectionFab from '../settings/components/CollectionFab';
import DataTableView from './DataTable.view';
import devicesColumns from './devicesColumnsSetter';

const DevicesDatatable = () => {
  const navigate = useNavigate();
  const t = useTranslation();

  const groups = useSelector((state) => state.groups.items);

  const [timestamp, setTimestamp] = useState(Date.now());
  const [items, setItems] = useState([]);
  const [, setLoading] = useState(false);

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/devices');
      if (response.ok) {
        setItems(await response.json());
      } else {
        throw Error(await response.text());
      }
    } finally {
      setLoading(false);
    }
  }, [timestamp]);

  const actionConnections = {
    key: 'connections',
    title: t('sharedConnections'),
    icon: <LinkIcon fontSize="small" />,
    handler: (deviceId) => navigate(`/settings/device/${deviceId}/connections`),
  };

  const columns = devicesColumns({ setTimestamp, actionConnections, groups });

  return (
    <PageLayout menu={<SettingsMenu />} breadcrumbs={['settingsTitle', 'deviceTitle']}>
      <DataTableView data={items} columns={columns} />
      <CollectionFab editPath="/settings/device" />
    </PageLayout>
  );
};

export default DevicesDatatable;
