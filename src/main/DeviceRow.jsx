import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import {
  // IconButton,
  // Tooltip,
  // Avatar,
  // ListItemAvatar,
  // ListItemText,
  ListItemButton,
} from '@mui/material';
// import BatteryFullIcon from '@mui/icons-material/BatteryFull'
// import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
// import Battery60Icon from '@mui/icons-material/Battery60'
// import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60'
// import Battery20Icon from '@mui/icons-material/Battery20'
// import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20'
// import ErrorIcon from '@mui/icons-material/Error'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { devicesActions } from '../store';
import {
  formatAddress,
  // formatAlarm,
  // formatBoolean,
  // formatPercentage,
  formatStatus,
  getStatusColor,
} from '../common/util/formatter';
import { useTranslation } from '../common/components/LocalizationProvider';
// import { mapIconKey, mapIcons } from '../map/core/preloadImages'
import { useAdministrator } from '../common/util/permissions';
import { useAttributePreference } from '../common/util/preferences';

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  conatiner: {
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#444444' : '#d6d6d6'}`,
  },
  listItem: {
    height: 100,
    alignItems: 'start',
  },
  icon: {
    width: '25px',
    height: '25px',
    filter: 'brightness(0) invert(1)',
  },
  batteryText: {
    fontSize: '0.75rem',
    fontWeight: 'normal',
    lineHeight: '0.875rem',
  },
  success: {
    color: theme.palette.success.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  neutral: {
    color: theme.palette.mode === 'dark' ? '#d1c8ff' : '#66627a',
  },
  itemTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  itemDevice: {
    fontWeight: 600,
    width: '290px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main,
    fontSize: 14,
  },
  itemLocation: {
    width: '300px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 13,
  },
}));

const DeviceRow = ({ data, index, style }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const t = useTranslation();

  const admin = useAdministrator();

  const item = data[index];
  const position = useSelector((state) => state.session.positions[item.id]);

  const devicePrimary = useAttributePreference('devicePrimary', 'name');
  const deviceSecondary = useAttributePreference('deviceSecondary', '');

  const secondaryText = () => {
    let status;
    if (item.status === 'online' || !item.lastUpdate) {
      status = formatStatus(item.status, t);
    } else {
      status = dayjs(item.lastUpdate).fromNow();
    }
    return (
      <>
        {deviceSecondary && item[deviceSecondary] && `${item[deviceSecondary]} • `}
        <span className={classes[getStatusColor(item.status)]} style={{ fontSize: 13 }}>
          {status}
        </span>
      </>
    );
  };

  const location = position ? formatAddress(position.address) : null;

  return (
    <div style={style} className={classes.conatiner}>
      <ListItemButton
        className={classes.listItem}
        key={item.id}
        onClick={() => dispatch(devicesActions.selectId(item.id))}
        disabled={!admin && item.disabled}
      >
        {/* <ListItemAvatar style={{ display: 'flex' }}>
          <Avatar>
          </Avatar>
        </ListItemAvatar> */}
        {/* <ListItemText
          primary={item[devicePrimary]}
          primaryTypographyProps={{ noWrap: true }}
          secondary={secondaryText()}
          secondaryTypographyProps={{ noWrap: true }}
        /> */}
        <section>
          <article className={classes.itemTitle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill={position?.attributes.ignition ? '#92d050' : '#d60c0c'}
              fillOpacity={1}
              width={15}
            >
              <path
                d="M 256,8 C 119,8 8,119 8,256 8,393 119,504 256,504 393,504 504,393 504,256 504,119 393,8 256,8 Z m 0,424 C 158.94,432 80,353 80,256 80,159 158.94,80 256,80 c 97.06,0 176,79 176,176 0,97 -78.94,176 -176,176 z"
                style={{ opacity: 0.4 }}
              />
              <path d="M256 432c-97.06 0-176-79-176-176S158.94 80 256 80s176 79 176 176-78.94 176-176 176z" />
            </svg>

            <div className={classes.itemDevice}>{item[devicePrimary]}</div>
          </article>
          {location ? (
            <>
              {location.address && <div className={classes.itemLocation}>{location.address}</div>}
              {location.city && <div className={classes.itemLocation}>{location.city}</div>}
            </>
          ) : (
            <div className={classes.itemLocation}>Sin dirección</div>
          )}

          <div>{secondaryText()}</div>
        </section>
        {/* {position && (
          <>
            {position.attributes.hasOwnProperty('alarm') && (
              <Tooltip title={`${t('eventAlarm')}: ${formatAlarm(position.attributes.alarm, t)}`}>
                <IconButton size='small'>
                  <ErrorIcon fontSize='small' className={classes.error} />
                </IconButton>
              </Tooltip>
            )}
            {position.attributes.hasOwnProperty('ignition') && (
              <Tooltip
                title={`${t('positionIgnition')}: ${formatBoolean(position.attributes.ignition, t)}`}
              >
                <IconButton size='small'>
                  {position.attributes.ignition ? (
                    <EngineIcon width={20} height={20} className={classes.success} />
                  ) : (
                    <EngineIcon width={20} height={20} className={classes.neutral} />
                  )}
                </IconButton>
              </Tooltip>
            )}
            {position.attributes.hasOwnProperty('batteryLevel') && (
              <Tooltip
                title={`${t('positionBatteryLevel')}: ${formatPercentage(position.attributes.batteryLevel)}`}
              >
                <IconButton size='small'>
                  {(position.attributes.batteryLevel > 70 &&
                    (position.attributes.charge ? (
                      <BatteryChargingFullIcon fontSize='small' className={classes.success} />
                    ) : (
                      <BatteryFullIcon fontSize='small' className={classes.success} />
                    ))) ||
                    (position.attributes.batteryLevel > 30 &&
                      (position.attributes.charge ? (
                        <BatteryCharging60Icon fontSize='small' className={classes.warning} />
                      ) : (
                        <Battery60Icon fontSize='small' className={classes.warning} />
                      ))) ||
                    (position.attributes.charge ? (
                      <BatteryCharging20Icon fontSize='small' className={classes.error} />
                    ) : (
                      <Battery20Icon fontSize='small' className={classes.error} />
                    ))}
                </IconButton>
              </Tooltip>
            )}
          </>
        )} */}
      </ListItemButton>
    </div>
  );
};

export default DeviceRow;
