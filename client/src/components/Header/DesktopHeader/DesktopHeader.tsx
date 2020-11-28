import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './DesktopHeader.scss';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { RootState } from '../../../store/reducers';
import { favoriteDevice } from '../../../interfaces/favoriteDevice';
import { cartDevice } from '../../../interfaces/cartDeviceList';

interface DesktopHeaderInterface {
    favoriteDevices: favoriteDevice[],
    cartDeviceList: cartDevice[]
}

const DesktopHeader: FC<DesktopHeaderInterface> = ({ favoriteDevices, cartDeviceList }) => {
    const location = useLocation()
    let history = useHistory()

    useEffect(() => {
        // console.log(location);
    }, [location])

    return (
        <div className="header-navigation__wrapper">
            <div className="header-navigation__item">
                <div className="header-nav__logo-wrapper">LOGO</div>
                <nav className="header-nav__nav-wrapper">
                    <ul className="header-nav__item-wrapper">
                        <li className={`header-nav__item ${location.pathname === "/" ? "header-nav__item--active" : ""}`} onClick={() => history.push('/')}>
                            <Link to="/" className="header-nav__link">home</Link>
                        </li>

                        <li className={`header-nav__item ${location.pathname === "/phones" ? "header-nav__item--active" : ""}`} onClick={() => history.push('/phones')}>
                            <Link to="/phones" className="header-nav__link">phones</Link>
                        </li>

                        <li className={`header-nav__item ${location.pathname === "/tablets" ? "header-nav__item--active" : ""}`} onClick={() => history.push('/tablets')}>
                            <Link to="/tablets" className="header-nav__link">tablet</Link>
                        </li>

                        <li className={`header-nav__item ${location.pathname === "/accessories" ? "header-nav__item--active" : ""}`} onClick={() => history.push('/accessories')}>
                            <Link to="/accessories" className="header-nav__link">accessories</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header-navigation__item">

                <div className={`header-navigation__icon-wrapper ${location.pathname === "/favorites" ? "header-navigation__icon-wrapper--active" : ""}`} onClick={() => history.push('/favorites')}>
                    {
                        favoriteDevices.length ? (
                            <div className="badge-wrapper" style={{
                                top: 15,
                                right: 15,
                            }}>
                                <div style={{
                                    fontSize: 11,
                                    color: '#fff'
                                }}>{favoriteDevices.length}</div>
                            </div>
                        ): null
                    }
                    <Link to="/favorites" className="header-navigation__icon-link">
                        <img src="/icons/heart.svg" alt="favorites" />
                    </Link>
                </div>
                <div className={`header-navigation__icon-wrapper ${location.pathname === "/cart" ? "header-navigation__icon-wrapper--active" : ""}`} onClick={() => history.push('/cart')}>
                    {
                        cartDeviceList.length ? (
                            <div className="badge-wrapper" style={{
                                top: 15,
                                right: 15,
                            }}>
                                <div style={{
                                    fontSize: 11,
                                    color: '#fff'
                                }}>{cartDeviceList.length}</div>
                            </div>
                        ) : null
                    }
                    <Link to="/cart" className="header-navigation__icon-link">
                        <img src="/icons/shopping-bag.svg" alt="shopping-bag" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    favoriteDevices: state.favoritesDevice.deviceList,
    cartDeviceList: state.cartDeviceList.deviceList
});

const matDispatchToProps = () => ({

});

export default connect(mapStateToProps, matDispatchToProps)(DesktopHeader);