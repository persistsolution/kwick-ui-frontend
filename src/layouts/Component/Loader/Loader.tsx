import { FC, Fragment } from 'react';
import ALLImages from '../../../common/ImageData';

interface ComponentProps { }

const Loader: FC<ComponentProps> = () => {
    return (
        <Fragment>
            <div id="loader">
                <img src={ALLImages('loader')} className="loader-img" alt="Loader"/>
            </div>
        </Fragment>
    );
};

export default Loader;