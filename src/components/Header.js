import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import UserLoginForm from '../features/user/UserLoginForm';

const drawerWidth = 240;


const pageLink = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Schedule',
    link: '/schedule'
  },
  {
    name: 'History',
    link: '/history'
  },
  {
    name: 'About Us',
    link: '/aboutus'
  }
]

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
        
      <List>
        {pageLink.map((page) => (
          <ListItem key={page} page={page} disablePadding>
            <ListItemButton component={Link} to={page.link}>
              <ListItemText primary={page.name}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'#512da8'}}>
        <Toolbar>
          <Box sx={{display: 'flex'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
             <MenuIcon />
          </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-MED
          </Typography>
          <UserLoginForm />
        </Toolbar>
      </AppBar>
    </Box>
  );

}


export default Header;