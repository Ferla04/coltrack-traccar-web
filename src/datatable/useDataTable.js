import { useCallback, useEffect, useRef } from 'react';

const DELAY = 200;

const useDataTable = (data) => {
  const gridInitialData = useRef(data);
  const gridApiRef = useRef(null);
  const updateTimeoutRef = useRef(null);

  const processUpdates = (newData) => {
    const currentData = [];
    const updates = [];
    const adds = [];

    const isNewData = newData.length !== gridApiRef.current?.getDisplayedRowCount();

    gridApiRef.current?.forEachNode((node, i) => {
      if (newData[i] !== node.data) {
        node.setData(newData[i]);
        updates.push(newData[i]);
      }

      if (isNewData) {
        currentData.push(node.data);
      }
    });

    if (isNewData) {
      newData.forEach((dataItem) => {
        if (!currentData.some((datatable) => datatable.deviceId === dataItem.deviceId)) {
          adds.push(dataItem);
        }
      });
    }

    if (adds.length > 0 || updates.length > 0) {
      gridApiRef.current?.applyTransaction({ add: adds, update: updates });
    }
  };

  const updateGridDataWithDelay = (newData) => {
    if (updateTimeoutRef.current !== null) {
      clearTimeout(updateTimeoutRef.current);
    }
    updateTimeoutRef.current = window.setTimeout(() => {
      processUpdates(newData);
      updateTimeoutRef.current = null;
    }, DELAY);
  };

  const onBtnExport = useCallback(() => {
    if (gridApiRef.current !== null) {
      gridApiRef.current.exportDataAsCsv();
    }
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    const filterTextBox = document.getElementById('filter-text-box');

    if (filterTextBox !== null && gridApiRef.current !== null) {
      gridApiRef.current.setGridOption('quickFilterText', filterTextBox.value);
    }
  }, []);

  useEffect(() => {
    updateGridDataWithDelay(data);

    return () => {
      if (updateTimeoutRef.current !== null) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [data]);

  return {
    gridInitialData: gridInitialData.current,
    gridApiRef,
    onBtnExport,
    onFilterTextBoxChanged,
  };
};

export default useDataTable;
