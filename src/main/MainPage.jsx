import React, {
  useState, useCallback, useEffect,
  useMemo,
} from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import DeviceList from './DeviceList';
import StatusCard from '../common/components/StatusCard';
import { devicesActions } from '../store';
import usePersistedState from '../common/util/usePersistedState';
import EventsDrawer from './EventsDrawer';
import useFilter from './useFilter';
import MainToolbar from './MainToolbar';
import MainMap from './MainMap';
import { useAttributePreference } from '../common/util/preferences';
// import NavigationBar from '../common/components/NavigationBar';
import ToggleSidebar from '../common/components/ToggleSidebar';
import NavigationBar from '../nav/NavigationBar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    [theme.breakpoints.down('sm')]: {
      height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    },
  },
  sidebar: {
    pointerEvents: 'none',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
      left: 0,
      top: 64,
      height: `calc(100% - ${theme.spacing(12)})`,
      width: `calc(${theme.dimensions.drawerWidthDesktop} + 80px)`,
      margin: theme.spacing(1.5),
      zIndex: 3,
      padding: 15,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 10,
    },
    [theme.breakpoints.down('md')]: {
      height: '100%',
      width: '100%',
    },
  },
  header: {
    pointerEvents: 'auto',
    zIndex: 6,
    boxShadow: 'none',
  },
  footer: {
    pointerEvents: 'auto',
    zIndex: 5,
  },
  middle: {
    flex: 1,
    display: 'grid',
  },
  contentMap: {
    pointerEvents: 'auto',
    gridArea: '1 / 1',
  },
  contentList: {
    backgroundColor: theme.palette.mode === 'light' && theme.palette.background.default,
    boxShadow: 'none',
    pointerEvents: 'auto',
    gridArea: '1 / 1',
    zIndex: 4,
    [theme.breakpoints.up('md')]: {
      borderRadius: 10,
      overflow: 'hidden',
    },
  },
}));

const MainPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const mapOnSelect = useAttributePreference('mapOnSelect', true);

  const selectedDeviceId = useSelector((state) => state.devices.selectedId);
  const positions = useSelector((state) => state.session.positions);
  const [filteredPositions, setFilteredPositions] = useState([]);
  const selectedPosition = filteredPositions.find((position) => selectedDeviceId && position.deviceId === selectedDeviceId);

  const [filteredDevices, setFilteredDevices] = useState([]);

  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = usePersistedState('filter', {
    statuses: [],
    groups: [],
  });
  const [filterSort, setFilterSort] = usePersistedState('filterSort', '');
  const [filterMap, setFilterMap] = usePersistedState('filterMap', false);

  const [devicesOpen, setDevicesOpen] = useState(desktop);
  const [eventsOpen, setEventsOpen] = useState(false);

  const onEventsClick = useCallback(() => setEventsOpen(true), [setEventsOpen]);

  const toggleSidebarMemo = useMemo(() => (desktop ? <ToggleSidebar /> : null), [desktop]);

  useEffect(() => {
    if (!desktop && mapOnSelect && selectedDeviceId) {
      setDevicesOpen(false);
    }
  }, [desktop, mapOnSelect, selectedDeviceId]);

  useEffect(() => {
    if (desktop) {
      setDevicesOpen(true);
    }
  }, [desktop]);

  useFilter(keyword, filter, filterSort, filterMap, positions, setFilteredDevices, setFilteredPositions);

  return (
    <>
      {desktop && (
        <NavigationBar />
      )}

      <div className={classes.root}>
        {desktop && (
          <MainMap
            filteredPositions={filteredPositions}
            selectedPosition={selectedPosition}
            onEventsClick={onEventsClick}
          />
        )}

        <div id="sidebar" className={classes.sidebar}>
          { toggleSidebarMemo }

          <Paper square elevation={3} className={`${classes.header} without-bg-i`}>
            <MainToolbar
              filteredDevices={filteredDevices}
              desktop={desktop}
              devicesOpen={devicesOpen}
              setDevicesOpen={setDevicesOpen}
              keyword={keyword}
              setKeyword={setKeyword}
              filter={filter}
              setFilter={setFilter}
              filterSort={filterSort}
              setFilterSort={setFilterSort}
              filterMap={filterMap}
              setFilterMap={setFilterMap}
            />
          </Paper>
          <div className={classes.middle}>
            {!desktop && (
              <div className={classes.contentMap}>
                <MainMap
                  filteredPositions={filteredPositions}
                  selectedPosition={selectedPosition}
                  onEventsClick={onEventsClick}
                />
              </div>
            )}
            <Paper
              square
              className={`${classes.contentList}`}
              style={devicesOpen ? {} : { visibility: 'hidden' }}
            >
              <DeviceList devices={filteredDevices} />
            </Paper>
          </div>
        </div>

        <EventsDrawer open={eventsOpen} onClose={() => setEventsOpen(false)} />
        {selectedDeviceId && (
          <StatusCard
            deviceId={selectedDeviceId}
            position={selectedPosition}
            onClose={() => dispatch(devicesActions.selectId(null))}
            desktopPadding={theme.dimensions.drawerWidthDesktop}
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
