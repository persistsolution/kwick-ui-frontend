import { FC, Fragment } from 'react';

import { Provider } from "react-redux";
import store from '../common/redux/Store';
import Landingswitcher from './Component/Landingswitcher/Landingswitcher';
import { Outlet } from 'react-router-dom';

interface ComponentProps { }

const Landingpagelayout: FC<ComponentProps> = () => {
    return (
        <Fragment>
            <Provider store={store}>
                {/* <Switcher /> */}
                <Landingswitcher/>
                <Outlet />
            </Provider>
        </Fragment >
    );
};

export default Landingpagelayout;