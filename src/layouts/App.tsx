import { FC, Fragment } from 'react';
import { Provider } from 'react-redux';
import store from '../common/redux/Store';
import Switcher from './Component/Switcher/Switcher';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Backtotop from './Component/BacktoTop/BacktoTop';
import { Helmet } from 'react-helmet-async';
import Sidebar from './Component/SideBar/Sidebar';

interface ComponentProps { }

const App: FC<ComponentProps> = () => {

  return (
    <Fragment>
      <Helmet
        htmlAttributes={{
          lang: "en",
          dir: "ltr",
          "data-nav-layout": "vertical",
          "data-theme-mode": "light",
          "data-header-styles": "light",
          "data-menu-styles": "dark",
          "data-page-style": "",
          "data-width": "",
          "data-menu-position": "",
          "data-header-position": ""
        }}><body className="app sidebar-mini ltr" /></Helmet>
      <Provider store={store}>
        <Switcher />
        <div className='page'>
          <div className="page-main">
            <Header />
            <Sidebar />
            <div className="main-content app-content mt-0">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
        <Backtotop />
      </Provider>
    </Fragment>
  );
};

export default App;