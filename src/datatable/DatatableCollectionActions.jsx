import React from 'react';
import CollectionActions from '../settings/components/CollectionActions';
import { useDeviceReadonly } from '../common/util/permissions';

const DatatableCollectionActions = ({ value, setTimestamp, actionConnections }) => {
  const deviceReadonly = useDeviceReadonly();

  return (
    <div className="action-buttons">
      <CollectionActions
        itemId={value}
        editPath="/settings/device"
        endpoint="devices"
        setTimestamp={setTimestamp}
        customActions={[actionConnections]}
        readonly={deviceReadonly}
      />
    </div>
  );
};

export default DatatableCollectionActions;
