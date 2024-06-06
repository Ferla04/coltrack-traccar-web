import { useMemo } from 'react';
import { useTranslation } from '../common/components/LocalizationProvider';
import { formatTime } from '../common/util/formatter';
import DatatableCollectionActions from './DatatableCollectionActions';

const devicesColumns = ({ setTimestamp, actionConnections, groups }) => {
  const t = useTranslation();

  return useMemo(() => [
    {
      headerName: t('sharedName'),
      field: 'name',
      width: 130,
    },
    {
      headerName: t('deviceIdentifier'),
      field: 'uniqueId',
      width: 150,
    },
    {
      headerName: t('groupParent'),
      field: 'groupId',
      valueGetter: ({ data: { groupId } }) => (
        groupId ? groups[groupId]?.name : null
      ),
      width: 100,
    },
    {
      headerName: t('sharedPhone'),
      field: 'phone',
      width: 150,
    },
    {
      headerName: t('deviceModel'),
      field: 'model',
    },
    {
      headerName: t('deviceContact'),
      field: 'contact',
      width: 110,
    },
    {
      headerName: t('userExpirationTime'),
      field: 'expirationTime',
      valueGetter: ({ data: { expirationTime } }) => (
        formatTime(expirationTime, 'date')
      ),
    },
    {
      headerName: '',
      field: 'id',
      cellRenderer: DatatableCollectionActions,
      cellRendererParams: {
        setTimestamp,
        actionConnections,
      },
      width: 120,
    },
  ], [t]);
};

export default devicesColumns;
