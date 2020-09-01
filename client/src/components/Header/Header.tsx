import React from 'react';
import {connect} from 'react-redux';

import './Header.scss';

const Header: React.FC = () => {

    return (
        <div>
            <h1>Header here</h1>
        </div>
    )
}

const mapStateToProps = () => ({

});

const matDispatchToProps = () => ({

});

export default connect(mapStateToProps, matDispatchToProps)(Header);