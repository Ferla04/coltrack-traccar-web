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
      minWidth: 120,
      flex: 1,
    },
    {
      headerName: t('deviceIdentifier'),
      field: 'uniqueId',
      minWidth: 130,
      flex: 1,
    },
    {
      headerName: t('groupParent'),
      field: 'groupId',
      flex: 1,
      minWidth: 80,
      valueGetter: ({ data: { groupId } }) => (
        groupId ? groups[groupId]?.name : null
      ),
    },
    {
      headerName: t('sharedPhone'),
      field: 'phone',
      flex: 1,
      minWidth: 130,
    },
    {
      headerName: t('deviceModel'),
      field: 'model',
      flex: 1,
      minWidth: 130,
    },
    {
      headerName: t('deviceContact'),
      field: 'contact',
      flex: 1,
      minWidth: 130,
    },
    {
      headerName: t('userExpirationTime'),
      field: 'expirationTime',
      flex: 1,
      minWidth: 130,
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
      flex: 1,
      minWidth: 130,
    },
  ], [t]);
};

export default devicesColumns;
