import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './DesktopHeader.scss';
import { Link, useParams, useLocation } from 'react-router-dom';

const DesktopHeader = () => {
    const location = useLocation()

    useEffect(() => {
        // console.log(location);
    }, [location])

    return (
        <div className="header-navigation__wrapper">
            <div className="header-navigation__item">
                <div className="header-nav__logo-wrapper"></div>
                <nav className="header-nav__nav-wrapper">
                    <ul className="header-nav__item-wrapper">
                        <li className={`header-nav__item ${location.pathname === "/" ? "header-nav__item--active" : ""}`}>
                            <Link to="/" className="header-nav__link">home</Link>
                        </li>

                        <li className={`header-nav__item ${location.pathname === "/phones" ? "header-nav__item--active" : ""}`}>
                            <Link to="/phones" className="header-nav__link">phones</Link>
                        </li>

                        <li className={`header-nav__item ${location.pathname === "/tablets" ? "header-nav__item--active" : ""}`}>
                            <Link to="/tablets" className="header-nav__link">tablet</Link>
                        </li>

                        <li className={`header-nav__item ${location.pathname === "/accessories" ? "header-nav__item--active" : ""}`}>
                            <Link to="/accessories" className="header-nav__link">accessories</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header-navigation__item">
                <div className={`header-navigation__icon-wrapper ${location.pathname === "/favorites" ? "header-navigation__icon-wrapper--active" : ""}`}>
                    <Link to="/favorites" className="header-navigation__icon-link">
                        <img src="/icons/heart.svg" alt="favorites" />
                    </Link>

                </div>
                <div className={`header-navigation__icon-wrapper ${location.pathname === "/chart" ? "header-navigation__icon-wrapper--active" : ""}`}>
                    <Link to="/chart" className="header-navigation__icon-link">
                        <img src="/icons/shopping-bag.svg" alt="shopping-bag" />
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