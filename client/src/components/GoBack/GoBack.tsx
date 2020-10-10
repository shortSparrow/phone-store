import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import "./GoBack.scss";

const GoBack: React.FC = () => {
    let history = useHistory();

    return (
        <div className="go-back__navigation">
            <Link to="" >
                <img src="/icons/arrow-black.svg" alt="go back icon" />
            </Link>
            <p className="small-navigation__text go-back__text" onClick={() => history.goBack()}>Back</p>
        </div>
    )
}

export default GoBack