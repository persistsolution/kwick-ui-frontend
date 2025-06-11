import { FC, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ALLImages from '../../../common/ImageData';
import { Dropdown, DropdownDivider, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ThemeChanger } from '../../../common/redux/Action';
import store from '../../../common/redux/Store';
import Logo from '../../../assets/images/brand/toggle-dark.png';

interface ComponentProps { }
const Header: FC<ComponentProps> = ({local_varaiable , ThemeChanger }: any) => {

  const [open, setOpen] = useState(false);
  function menuClose() {
    const theme = store.getState();
    ThemeChanger({ ...theme, "toggled": "close" });

  }

  const toggleSidebar = () => {
    const theme = store.getState();
    let sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      if (sidemenuType === "vertical") {
        let verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;
        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, "dataNavStyle": "" });
            if (theme.toggled === "close-menu-close") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "close-menu-close" });
            }
            break;
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, "dataNavStyle": "" });
            if (theme.toggled === "icon-overlay-close") {
              ThemeChanger({ ...theme, "toggled": "", "iconOverlay": '' });
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({ ...theme, "toggled": "icon-overlay-close", "iconOverlay": '' });
              }
            }
            break;
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, "dataNavStyle": "" });
            if (theme.toggled === "icon-text-close") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "icon-text-close" });
            }
            break;
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, "dataNavStyle": "" });
            ThemeChanger({ ...theme, "dataNavStyle": "" });
            if (theme.toggled === "double-menu-open") {
              ThemeChanger({ ...theme, "toggled": "double-menu-close" });
            } else {
              let sidemenu = document.querySelector(".side-menu__item.active");
              if (sidemenu) {
                ThemeChanger({ ...theme, "toggled": "double-menu-open" });
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add("double-menu-active");
                } else {

                  ThemeChanger({ ...theme, "toggled": "" });
                }
              }
            }
            // doublemenu(ThemeChanger);
            break;
          // detached
          case "detached":
            if (theme.toggled === "detached-close") {
              ThemeChanger({ ...theme, "toggled": "", "iconOverlay": '' });
            } else {
              ThemeChanger({ ...theme, "toggled": "detached-close", "iconOverlay": '' });
            }

            break;

          // default
          case "default":
            ThemeChanger({ ...theme, "toggled": "" });
        }
        switch (navStyle) {
          case "menu-click":
            if (theme.toggled === "menu-click-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            }
            else {
              ThemeChanger({ ...theme, "toggled": "menu-click-closed" });
            }
            break;
          // icon-overlay
          case "menu-hover":
            if (theme.toggled === "menu-hover-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "menu-hover-closed" });

            }
            break;
          case "icon-click":
            if (theme.toggled === "icon-click-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "icon-click-closed" });

            }
            break;
          case "icon-hover":
            if (theme.toggled === "icon-hover-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "icon-hover-closed" });

            }
            break;

        }
      }
    }
    else {
      if (theme.toggled === "close") {
        ThemeChanger({ ...theme, "toggled": "open" });

        setTimeout(() => {
          if (theme.toggled == "open") {
            const overlay = document.querySelector("#responsive-overlay");

            if (overlay) {
              overlay.classList.add("active");
              overlay.addEventListener("click", () => {
                const overlay = document.querySelector("#responsive-overlay");

                if (overlay) {
                  overlay.classList.remove("active");
                  menuClose();
                }
              });
            }
          }

          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              const overlay = document.querySelector("#responsive-overlay");

              if (overlay) {
                overlay.classList.remove("active");
              }
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, "toggled": "close" });
      }
    }

  };



      //Dark Model
    const ToggleDark = () => {
        ThemeChanger({
            ...local_varaiable,
            "dataThemeMode": local_varaiable.dataThemeMode === 'dark' ? 'light' : 'dark',
            "dataHeaderStyles": local_varaiable.dataHeaderStyles && local_varaiable.dataThemeMode === 'dark' ? 'light' : 'dark',
            "dataMenuStyles": local_varaiable.dataNavLayout === 'horizontal' ? local_varaiable.dataThemeMode === 'dark' ? 'light' : 'dark' : "dark"
        });

        const theme = store.getState();

        if (theme.dataThemeMode !== 'dark') {
            ThemeChanger({
                ...theme,
                "bodyBg1": '',
                "bodyBg2": '',
                "darkBg": '',
                "inputBorder": '',
            });
            localStorage.setItem("vexellighttheme", "light");
            localStorage.removeItem("vexeldarktheme");
            localStorage.removeItem("darkBgRGB1");
            localStorage.removeItem("darkBgRGB2");
            localStorage.removeItem("darkBgRGB3");
            localStorage.removeItem("darkBgRGB4");
        } else {
            localStorage.setItem("vexeldarktheme", "dark");
            localStorage.removeItem("vexellighttheme");
        }
    };

  return (
    <Fragment>
      <header className="app-header header ">
        <div className="main-header-container container-fluid">
          <div className="header-content-left align-items-center">
            <div className="header-element">
              <div className="horizontal-logo">
                <Link to={`${import.meta.env.BASE_URL}Dashboard/IndexPage`} className="header-logo">
                  {/* <img src={ALLImages('logo2')} alt="logo" className="desktop-logo" />
                                    <img src={ALLImages('logo5')} alt="logo" className="toggle-logo" />
                                    <img src={ALLImages('logo1')} alt="logo" className="desktop-dark" />
                                    <img src={ALLImages('logo4')} alt="logo" className="toggle-dark" /> */}
                  {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 'fit-content' }}> */}
                  <img src={Logo} alt="Logo" style={{ height: 40 }} />
                  {/* </Box> */}
                </Link>
              </div>
            </div>
            {/* <div className="header-element">
              <Link to="#" className="sidemenu-toggle header-link" data-bs-toggle="sidebar" onClick={() => toggleSidebar()}>
                <span className="open-toggle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" viewBox="0 0 24 24">
                    <path d="M24 0v24H0V0h24z" fill="none" opacity=".87" />
                    <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z" />
                  </svg>
                </span>
                <span className="close-toggle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" viewBox="0 0 24 24" fill="#000000">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                  </svg>
                </span>
              </Link>
            </div> */}

          </div>
          <Navbar expand='lg' className="header-content-right">
            <Navbar.Toggle onClick={() => setOpen(!open)} aria-expanded={open} className={`d-lg-none ms-auto p-0 border-0 pt-2 ${!open ? 'collapsed' : ''}`}>
              <span className="navbar-toggler-icon fe fe-more-vertical"></span>
            </Navbar.Toggle>
            <div className={`navbar-collapse responsive-navbar ${open ? 'show' : ''}`}>
              <Navbar.Collapse className='p-0'>
                <div className="d-flex align-items-center">


                  {/* Dark / Light mode */}

                  {/* <div className={`header-element header-theme-mode ${local_varaiable.dataThemeMode === 'dark' ? 'dark-layout' : 'light-layout'}`}>
                    <Link to="#" className="header-link layout-setting" onClick={() => ToggleDark()}>
                      <span className="light-layout">
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" className="header-link-icon" viewBox="0 0 24 24">
                          <g><rect fill="none" height="24" width="24" /></g>
                          <g><g><path d="M19.78,17.51c-2.47,0-6.57-1.33-8.68-5.43C8.77,7.57,10.6,3.6,11.63,2.01C6.27,2.2,1.98,6.59,1.98,12 c0,0.14,0.02,0.28,0.02,0.42C2.61,12.16,3.28,12,3.98,12c0,0,0,0,0,0c0-3.09,1.73-5.77,4.3-7.1C7.78,7.09,7.74,9.94,9.32,13 c1.57,3.04,4.18,4.95,6.8,5.86c-1.23,0.74-2.65,1.15-4.13,1.15c-0.5,0-1-0.05-1.48-0.14c-0.37,0.7-0.94,1.27-1.64,1.64 c0.98,0.32,2.03,0.5,3.11,0.5c3.5,0,6.58-1.8,8.37-4.52C20.18,17.5,19.98,17.51,19.78,17.51z" />
                            <path d="M7,16l-0.18,0C6.4,14.84,5.3,14,4,14c-1.66,0-3,1.34-3,3s1.34,3,3,3c0.62,0,2.49,0,3,0c1.1,0,2-0.9,2-2 C9,16.9,8.1,16,7,16z" /> </g> </g>
                        </svg>
                      </span>
                      <span className="dark-layout">
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" className="header-link-icon" viewBox="0 0 24 24">
                          <rect fill="none" height="24" width="24" />
                          <path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
                        </svg>
                      </span>
                    </Link>
                  </div> */}

                  {/* Profile Dropdown */}

                  <Dropdown className="header-element main-profile-user" align='end' autoClose="outside">
                    <Dropdown.Toggle className="header-link d-flex align-items-center" variant="" id="mainHeaderProfile">
                      <span className="me-2">
                        <img src={ALLImages('user21')} alt="img" width="30" height="30" className="rounded-circle" />
                      </span>
                      <div className="d-xl-block d-none lh-1">
                        <h6 className="fs-13 font-weight-semibold mb-0 ">Admin</h6>
                        <span className="op-8 fs-10">Super Admin</span>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='pt-0 overflow-hidden dropdown-menu-end mt-1'>
                      <Link className='dropdown-item' to={`${import.meta.env.BASE_URL}Dashboard/IndexPage`}><i className="ti ti-user-circle fs-18 me-2 op-7"></i>Profile</Link>
                      {/* <Link className='dropdown-item' to={`${import.meta.env.BASE_URL}Dashboard/IndexPage/`}><i className="ti ti-inbox fs-18 me-2 op-7"></i>Dashboard</Link>
                                            <Link className='dropdown-item' to={`${import.meta.env.BASE_URL}Pages/Extension/Blog/`}><i className="ti ti-clipboard-check fs-18 me-2 op-7"></i>Posts & Activities</Link>
                                            <Link className='dropdown-item' to={`${import.meta.env.BASE_URL}Pages/Extension/Settings/`}><i className="ti ti-adjustments-horizontal fs-18 me-2 op-7"></i>Settings & Privacy</Link>
                                            <Link className='dropdown-item' to={`${import.meta.env.BASE_URL}Pages/Extension/Faq/`}><i className="ti ti-help fs-18 me-2 op-7"></i>Help Center</Link>
                                            <DropdownDivider className='my-0' />
                                            <Link className='dropdown-item' to={`${import.meta.env.BASE_URL}Authentication/Register`}><i className="ti ti-user-plus fs-18 me-2 op-7"></i>Add Another Account</Link> */}
                      <Link className='dropdown-item' to={`${import.meta.env.BASE_URL}`}><i className="ti ti-power fs-18 me-2 op-7"></i>Sign Out</Link>
                      <DropdownDivider className='my-0' />
                      {/* <li className="d-flex justify-content-center p-2">
                                                <span><Link className="fs-12 px-2 border-end" to="#">Privacy Policy</Link></span>
                                                <span><Link className="fs-12 px-2 border-end" to="#">Terms</Link></span>
                                                <span><Link className="fs-12 px-2" to="#">Cookies</Link></span>
                                            </li> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Navbar.Collapse>
            </div>

            {/* <div className="header-element">

                            <Link to="#" className="header-link switcher-icon" data-bs-toggle="offcanvas" data-bs-target="#switcher-canvas" onClick={() => Switchericon()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="header-link-icon fa-spin">
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                </svg>
                            </Link>
                        </div> */}


          </Navbar>
        </div>
      </header>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state
});
export default connect(mapStateToProps, { ThemeChanger })(Header);