import React from 'react';
import ReactDOM from 'react-dom';
import * as MC from './index';

const side_menu_Width = 240;

const useStyles = MC.makeStyles((theme: MC.Theme) =>
MC.createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${side_menu_Width}px)`,
      marginLeft: side_menu_Width,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: side_menu_Width,
      flexShrink: 0
    },
    drawerPaper: {
      width: side_menu_Width
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -side_menu_Width
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: MC.fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: MC.fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200
      }
    }
  })
);

export default function SideMenu(menuProps: any) {
  const classes = useStyles(MC.PropTypes);
  const theme = MC.useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <MC.CssBaseline />
      <MC.AppBar
        position="fixed"
        className={MC.clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <MC.Toolbar>
          <MC.IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={MC.clsx(classes.menuButton, open && classes.hide)}
          >
            <MC.MenuIcon />
          </MC.IconButton>
          <MC.Typography variant="h6" noWrap>
           EK Infra Operations Center
          </MC.Typography>
          <div className={classes.search}>
              <div className={classes.searchIcon}>
                <MC.SearchIcon />
              </div>
              <MC.InputBase
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'Search' }}
              />
            </div>

        </MC.Toolbar>
      </MC.AppBar>
      <MC.Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <MC.IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <MC.ChevronLeftIcon /> : <MC.ChevronRightIcon />}
          </MC.IconButton>
        </div>
        <MC.Divider />
        <MC.List>
          {menuProps.menus.map((menu, index) => (
            <MC.ListItem button key={menu.menu_id}>
              <MC.ListItemText><MC.Link to={menu.navigate_to}>{menu.menu_name}</MC.Link></MC.ListItemText>
            </MC.ListItem>
          ))}
        </MC.List>
        <MC.Divider />
      </MC.Drawer>

    </div>
  );
}
