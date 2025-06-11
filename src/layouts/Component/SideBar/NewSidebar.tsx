import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
  Button as MUIButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { MENUITEMS } from '../../../common/Sidemenudata';
import Logo from '../../../assets/images/brand/toggle-dark.png';

const NewSidebar = () => {
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const navigateTo = (path: string) => {
    navigate(path);
    setDropdownOpenIndex(null);
    setDrawerOpen(false);
  };

  const scrollMenu = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Box
        sx={{ backgroundColor: 'rgba(4, 47, 72, 0.98)', marginBottom: '1.5rem'  }}
      >
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
              backgroundColor: 'rgb(0 71 112)',
              borderRadius: '2px',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 'fit-content' }}>
            <img src={Logo} alt="Logo" style={{ height: 40 }} />
          </Box>

          {!isMobile && (
            <>
              <IconButton onClick={() => scrollMenu('left')} sx={{ color: '#fff' }}>
                <KeyboardArrowLeftIcon />
              </IconButton>

              <Box
                ref={scrollRef}
                sx={{
                  display: 'flex',
                  gap: 2,
                  whiteSpace: 'nowrap',
                  overflowX: 'auto',
                  ml: 1,
                  mr: 1,
                  flexGrow: 1,
                  flexShrink: 1,
                  '& > *': {
                    flexShrink: 0,
                  },
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                }}
              >
                {MENUITEMS.map((item: any, index: number) => {
                  if (item.type === 'sub' && item.children) {
                    return (
                      <Dropdown
                        key={index}
                        isOpen={dropdownOpenIndex === index}
                        toggle={() => {}}
                        onMouseEnter={() => setDropdownOpenIndex(index)}
                        onMouseLeave={() => setDropdownOpenIndex(null)}
                        className="backgroundTransparent"
                        style={{ display: 'inline-block', background: 'transparent' }}
                      >
                        <DropdownToggle
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#fff',
                            textTransform: 'capitalize',
                          }}
                        >
                          {item.title} <ArrowDropDownIcon sx={{ fontSize: 20 }} />
                        </DropdownToggle>
                        <DropdownMenu dark container="body">
                          {item.children.map((child: any, childIdx: number) => (
                            <DropdownItem key={childIdx} onClick={() => navigateTo(child.path)}>
                              {child.title}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    );
                  } else if (item.type === 'link') {
                    return (
                      <MUIButton
                        key={index}
                        sx={{
                          color: '#fff',
                          textTransform: 'capitalize',
                          '&:hover': {
                            backgroundColor: 'rgb(0 71 112)',
                          },
                        }}
                        onClick={() => navigateTo(item.path)}
                      >
                        {item.title}
                      </MUIButton>
                    );
                  }
                  return null;
                })}
              </Box>

              <IconButton onClick={() => scrollMenu('right')} sx={{ color: '#fff' }}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </>
          )}

          {isMobile && (
            <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Admin Profile Dropdown */}
    {/* <Dropdown
  isOpen={profileDropdownOpen}
  toggle={() => setProfileDropdownOpen(!profileDropdownOpen)}
  className="header-element main-profile-user"
  align="end"
  autoClose="outside"
>
  <DropdownToggle
    className="header-link d-flex align-items-center"
    variant=""
    id="mainHeaderProfile"
  >
    <span className="me-2">
      <img
        src={ALLImages('user21')}
        alt="img"
        width="30"
        height="30"
        className="rounded-circle"
      />
    </span>
    <div className="d-xl-block d-none lh-1">
      <h6 className="fs-13 font-weight-semibold mb-0">Admin</h6>
      <span className="op-8 fs-10">Super Admin</span>
    </div>
  </DropdownToggle>
  <DropdownMenu className="pt-0 overflow-hidden dropdown-menu-end mt-1">
    <Link className="dropdown-item" to={`${import.meta.env.BASE_URL}Dashboard/IndexPage`}>
      <i className="ti ti-user-circle fs-18 me-2 op-7"></i>Profile
    </Link>
    <DropdownDivider className="my-0" />
    <Link className="dropdown-item" to={`${import.meta.env.BASE_URL}`}>
      <i className="ti ti-power fs-18 me-2 op-7"></i>Sign Out
    </Link>
  </DropdownMenu>
</Dropdown> */}

        </Toolbar>
      </Box>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: 'rgb(0 71 112)',
            height: '100%',
            color: '#fff',
          }}
        >
          <List>
            {MENUITEMS.map((item: any, index: number) => {
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
