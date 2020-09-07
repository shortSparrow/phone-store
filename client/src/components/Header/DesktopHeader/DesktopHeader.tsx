import React, { useState } from 'react';
import { connect } from 'react-redux';

import './DesktopHeader.scss';
import { Link } from 'react-router-dom';

const DesktopHeader = () => {

    return (
        <div className="header-navigation__wrapper">
            <div className="header-navigation__item">
                <div className="header-nav__logo-wrapper"></div>
                <nav className="header-nav__nav-wrapper">
                    <ul className="header-nav__item-wrapper">
                        <li className="header-nav__item">
                            <Link to="/" className="header-nav__link">home</Link>
                        </li>

                        <li className="header-nav__item">
                            <Link to="/phones" className="header-nav__link">phones</Link>
                        </li>

                        <li className="header-nav__item">
                            <Link to="/tablets" className="header-nav__link">tablet</Link>
                        </li>

                        <li className="header-nav__item">
                            <Link to="/accessories" className="header-nav__link">accessories</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header-navigation__item">
                <div className="header-navigation__icon-wrapper">
                    <Link to="/favorites" className="header-navigation__icon-link">
                        <img src="icons/heart.svg" alt="favorites" />
                    </Link>

                </div>
                <div className="header-navigation__icon-wrapper">
                    <Link to="/chart" className="header-navigation__icon-link">
                        <img src="icons/shopping-bag.svg" alt="shopping-bag" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = () => ({

});

const matDispatchToProps = () => ({

});

export default connect(mapStateToProps, matDispatchToProps)(DesktopHeader);