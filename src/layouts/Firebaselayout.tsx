import { FC, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Provider } from "react-redux";
import Switcher from './Component/Switcher/Switcher';
import store from '../common/redux/Store';
import { Outlet } from 'react-router-dom';

interface ComponentProps { }

const Firebaselayout: FC<ComponentProps> = () => {
    return (
        <Fragment>
            <Helmet
                htmlAttributes={{
                }}><body className="app sidebar-mini ltr login-img" /></Helmet>
            <Provider store={store}>
                <Switcher />
                <div className='page'>
                    <Outlet />
                </div>
            </Provider>
        </Fragment>
    );
};

export default Firebaselayout;