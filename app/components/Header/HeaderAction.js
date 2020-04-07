import React from 'react';
import classNames from 'classnames';
import { Tooltip, IconButton } from '@material-ui/core';
import Ionicon from 'react-ionicons';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './header-jss';

const elem = document.documentElement;

class HeaderAction extends React.PureComponent {
  state = {
    fullScreen: false,
    fixed: false,
  }

  openFullScreen = () => {
    this.setState({ fullScreen: true });
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  closeFullScreen = () => {
    this.setState({ fullScreen: false });
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  turnMode = mode => {
    const { changeMode } = this.props;
    if (mode === 'light') {
      changeMode('dark');
    } else {
      changeMode('light');
    }
  };

  render() {
    const { classes, mode, fixed } = this.props;
    const { fullScreen } = this.state;
    return (
      <div className={classNames(classes.headerProperties, { [classes.headerPropertiesFixed]: fixed })}>
        <div className={classNames(classes.headerAction, classes.invert)}>
          <Tooltip title={fullScreen ? 'Exit Full Screen' : 'Full Screen'} placement="bottom">
            <IconButton className={classes.button} onClick={fullScreen ? this.closeFullScreen : this.openFullScreen}>
              <Ionicon icon="ios-qr-scanner" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Turn Dark/Light" placement="bottom">
            <IconButton className={classes.button} onClick={() => this.turnMode(mode)}>
              <Ionicon icon="ios-bulb-outline" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

HeaderAction.propTypes = {
  classes: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  fixed: PropTypes.bool.isRequired,
};

export default withStyles(styles)(HeaderAction);
