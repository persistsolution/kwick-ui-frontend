import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { defaultMenu } from '../../../common/Sidemenudata';
import Logo from '../../../assets/images/brand/desktop-dark.png';

const NewSidebar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, children: any[]) => {
    setAnchorEl(event.currentTarget);
    setMenuItems(children);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuItems([]);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    handleClose();
    setDrawerOpen(false);
  };

  const renderMenuItems = (items: any[]) =>
    items.map((item: any, index: number) => {
      if (item.type === 'sub' && item.children) {
        return item.children.map((subChild: any, subIdx: number) => (
          <MenuItem key={subIdx} onClick={() => navigateTo(subChild.path)}>
            {subChild.title}
          </MenuItem>
        ));
      }
      return (
        <MenuItem key={index} onClick={() => navigateTo(item.path)}>
          {item.title}
        </MenuItem>
      );
    });

  return (
    <>
   <AppBar position="static" sx={{ backgroundColor: 'rgba(4, 47, 72, 0.98)', marginBottom: "1.5rem" }}>
   <Toolbar
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    paddingLeft: 2,
    paddingRight: 2,
    '&::-webkit-scrollbar': {
      height: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '2px',
    },
  }}
>
  {/* Logo on the left */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 'fit-content', flexShrink: 0 }}>
    <img src={Logo} alt="Logo" style={{ height: 40 }} />
  </Box>

  {/* Desktop Navigation Buttons - force scrollable */}
  {!isMobile && (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        whiteSpace: 'nowrap',
        overflowX: 'auto',
        ml: 2,
        flexGrow: 1,
        flexShrink: 1,
        '& > *': {
          flexShrink: 0,
        },
      }}
    >
      {defaultMenu
        .filter((item: any) => item.type && item.title)
        .map((item: any, index: number) => {
          if (item.type === 'sub' && item.children) {
            return (
              <Button
                key={index}
                sx={{ color: '#fff', textTransform: 'capitalize' }}
                onClick={(e) => handleOpenMenu(e, item.children)}
              >
                {item.title}
              </Button>
            );
          } else if (item.type === 'link') {
            return (
              <Button
                key={index}
                sx={{ color: '#fff', textTransform: 'capitalize' }}
                onClick={() => navigateTo(item.path)}
              >
                {item.title}
              </Button>
            );
          }
          return null;
        })}
    </Box>
  )}

  {/* Mobile Icon */}
  {isMobile && (
    <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
      <MenuIcon />
    </IconButton>
  )}
</Toolbar>


  {/* Submenu */}
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    PaperProps={{
      sx: { backgroundColor: 'rgba(4, 47, 72, 0.98)', color: 'white' },
    }}
  >
    {renderMenuItems(menuItems)}
  </Menu>
</AppBar>


      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, backgroundColor: 'rgba(4, 47, 72, 0.98)', height: '100%', color: '#fff' }}>
          <List>
            {defaultMenu.map((item: any, index: number) => {
              if (item.type === 'sub' && item.children) {
                return item.children.map((child: any, idx: number) => (
                  <ListItem button key={`${index}-${idx}`} onClick={() => navigateTo(child.path)}>
                    <ListItemText primary={child.title} />
                  </ListItem>
                ));
              } else if (item.type === 'link') {
                return (
                  <ListItem button key={index} onClick={() => navigateTo(item.path)}>
                    <ListItemText primary={item.title} />
                  </ListItem>
                );
              }
              return null;
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NewSidebar;
