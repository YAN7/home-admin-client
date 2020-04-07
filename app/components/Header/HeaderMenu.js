import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { NavLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import logo from 'dan-images/logo.svg';
import brand from 'dan-api/dummy/brand';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import dummy from 'dan-api/dummy/dummyContents';
import MenuIcon from '@material-ui/icons/Menu';
import SidebarContent from '../Sidebar/SidebarContent';
import DropListMenu from './DropListMenu';
import MegaMenu from './MegaMenu';
import HeaderAction from './HeaderAction';
import styles from './header-jss';
import SearchUi from '../Search/SearchUi';

class HeaderMenu extends React.Component {
  state = {
    status: dummy.user.status,
    anchorEl: null,
    fixed: false,
  };

  // Initial menu ui
  flagFixedMenu = false;

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixedMenu = (scroll > 64);
    if (this.flagFixedMenu !== newFlagFixedMenu) {
      this.setState({ fixed: newFlagFixedMenu });
      this.flagFixedMenu = newFlagFixedMenu;
    }
  }

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeStatus = status => {
    this.setState({ status });
    this.handleClose();
  }

  render() {
    const {
      classes,
      type,
      dataMenu,
      history,
      mode,
      toggleDrawerOpen,
      openMobileNav,
      loadTransition,
      isLogin,
      logoLink,
      changeMode
    } = this.props;
    const {
      status,
      anchorEl,
      fixed
    } = this.state;
    return (
      <AppBar
        className={
          classNames(
            classes.appBar,
            classes.attachedbar,
            fixed ? classes.fixed : ''
          )
        }
      >
        <div className={classes.appMenu}>
          <Hidden lgUp>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={toggleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <HeaderAction fixed={fixed} changeMode={changeMode} mode={mode} />
            <NavLink to={logoLink} className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
          </Hidden>
          <div className={classes.searchHeaderMenu}>
            <div className={classNames(classes.wrapper, classes.dark)}>
              <div className={classes.search}>
                <SearchIcon />
              </div>
              <SearchUi history={history} />
            </div>
          </div>
          <Toolbar />
        </div>
        <Hidden mdDown>
          <Fragment>
            { type === 'mega-menu' ? <MegaMenu dataMenu={dataMenu} /> : <DropListMenu dataMenu={dataMenu} />}
          </Fragment>
        </Hidden>
        <Hidden lgUp>
          <SwipeableDrawer
            onClose={toggleDrawerOpen}
            onOpen={toggleDrawerOpen}
            open={!openMobileNav}
            anchor="left"
          >
            <div className={classes.swipeDrawerPaper}>
              <SidebarContent
                drawerPaper
                leftSidebar
                toggleDrawerOpen={toggleDrawerOpen}
                loadTransition={loadTransition}
                dataMenu={dataMenu}
                status={status}
                anchorEl={anchorEl}
                openMenuStatus={this.handleOpen}
                closeMenuStatus={this.handleClose}
                changeStatus={this.handleChangeStatus}
                isLogin={isLogin}
              />
            </div>
          </SwipeableDrawer>
        </Hidden>
      </AppBar>
    );
  }
}

HeaderMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  dataMenu: PropTypes.array.isRequired,
  openMobileNav: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  logoLink: PropTypes.string,
  isLogin: PropTypes.bool
};

HeaderMenu.defaultProps = {
  isLogin: true,
  logoLink: '/',
};

export default withStyles(styles)(HeaderMenu);
