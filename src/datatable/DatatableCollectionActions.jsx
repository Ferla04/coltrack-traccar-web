import React from 'react';
import CollectionActions from '../settings/components/CollectionActions';
import { useDeviceReadonly } from '../common/util/permissions';

const DatatableCollectionActions = ({ value, setTimestamp, actionConnections }) => {
  const deviceReadonly = useDeviceReadonly();

  return (
    <CollectionActions
      itemId={value}
      editPath="/settings/device"
      endpoint="devices"
      setTimestamp={setTimestamp}
      customActions={[actionConnections]}
      readonly={deviceReadonly}
    />
  );
};

export default DatatableCollectionActions;
