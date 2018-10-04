import React, { Component, Fragment } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SdCardIcon from '@material-ui/icons/SdCard';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 240;
const lists = {
  primary: [
    {
      icon: DashboardIcon,
      title: "Dashboard",
      url: "/"
    },
    {
      icon: SdCardIcon,
      title: "Access points",
      url: "/access-points"
    },
    {
      icon: MeetingRoomIcon,
      title: "Doors",
      url: "/doors"
    },
    {
      icon: PictureInPictureIcon,
      title: "Zones",
      url: "/zones"
    },
    {
      icon: PeopleOutlineIcon,
      title: "Users",
      url: "/users"
    },
  ],
  secondary : [
    {
      icon: PeopleIcon,
      title: "Operators",
      url: "/operators"
    },
    {
      icon: SettingsIcon,
      title: "Settings",
      url: "/settings"
    },
  ]
};

const getList = key => <List>
  {
    lists[key].map(
      (item, index) =>
      <Link to={ item.url } key={ index }>
        <ListItem button>
          <ListItemIcon>{ React.createElement(item.icon) }</ListItemIcon>
          <ListItemText primary={ item.title } />
        </ListItem>
      </Link>
    )
  }
</List>;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});
@withStyles(styles)
export default class Bar extends Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              this.state.open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="title"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Yaxys dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
        }}
        open={this.state.open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        { getList("primary") }
        <Divider />
        { getList("secondary") }
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        { this.props.children }
      </main>
    </div>;
  }
}


