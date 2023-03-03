import React, { MouseEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { RootState } from '../../../store/reducers';

import './MobileHeader.scss';

const MobileHeader = (props: any) => {
    const { favoriteDevices, cartDeviceList, deviceScreen } = props;
    const [openSearchField, setOpenSearchField] = useState(false)

    const location = useLocation()
    let history = useHistory();

    return (
        <div className="header-navigation-burger__wrapper">
            <div className="header-navigation-burger__line">
                <div className="header-nav-burger__logo-wrapper" onClick={() => history.push('/')}>
                    <img src="icons/logo.png" className="logo-image" style={{ width: '100%' }} />
                </div>

                {
                    props.children && deviceScreen.value >= 500
                        ? (
                            <div className="header-search-field--wrapper" style={{ marginRight: 20 }}>
                                <label className="header-search-field--label">
                                    <img src="/icons/Search.svg" style={{ position: 'absolute', right: 25, cursor: 'pointer' }} />

                                    {props.children}
                                </label>
                            </div>
                        )
                        : props.children && deviceScreen.value < 500
                            ? (
                                <div className="header-search-field--wrapper">
                                    <div
                                        className="header-search-field--icon-wrapper header-search-field--icon-wrapper--mobile"
                                        onClick={() => setOpenSearchField(true)}
                                    >
                                        <img src="/icons/Search.svg" style={{ cursor: 'pointer' }} />
                                    </div>

                                </div>
                            )
                            : null

                }

                <div className="header-nav-burger__menu-wrapper">
                    <div className="menu-toggle" onClick={(event: any) => {
                        document.querySelector('.header-nav-burger__nav-wrapper')?.classList.toggle('header-nav-burger__nav-wrapper--active')
                        document.querySelector('.menu-toggle')?.classList.toggle('active')


                    }}>
                        <div className="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="cross">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>


            <nav className="header-nav-burger__nav-wrapper">
                <ul className="header-nav-burger__item-wrapper" onClick={() => {
                    console.log('click');

                }}>
                    <li className={`header-nav-burger__item ${location.pathname === "/" ? "header-nav-burger__item--active" : ""}`} onClick={() => history.push('/')}>
                        <Link to="/" className="header-nav-burger__link third-title ">home</Link>
                    </li>

                    <li className={`header-nav-burger__item ${location.pathname === "/phones" ? "header-nav-burger__item--active" : ""}`} onClick={() => history.push('/phones')}>
                        <Link to="/phones" className="header-nav-burger__link third-title ">phones</Link>
                    </li>

                    <li className={`header-nav-burger__item ${location.pathname === "/tablets" ? "header-nav-burger__item--active" : ""}`} onClick={() => history.push('/tablets')}>
                        <Link to="/tablets" className="header-nav-burger__link third-title ">tablet</Link>
                    </li>

                    <li className={`header-nav-burger__item ${location.pathname === "/accessories" ? "header-nav-burger__item--active" : ""}`} onClick={() => history.push('/accessories')}>
                        <Link to="/accessories" className="header-nav-burger__link third-title ">accessories</Link>
                    </li>

                    <li className={`header-nav-burger__item ${location.pathname === "/favorites" ? "header-nav-burger__item--active" : ""}`} onClick={() => history.push('/favorites')}>
                        <div style={{ width: "max-conent", position: "relative" }}>
                            {
                                favoriteDevices.length ? (
                                    <div className="badge-wrapper badge-wrapper--mobile-header">
                                        <div style={{
                                            fontSize: 11,
                                            color: '#fff'
                                        }}>{favoriteDevices.length}</div>
                                    </div>
                                ) : null
                            }
                            <Link to="/favorites" className="header-nav-burger__link third-title ">Favotites</Link>
                        </div>
                    </li>
                    <li className={`header-nav-burger__item ${location.pathname === "/cart" ? "header-nav-burger__item--active" : ""}`} onClick={() => history.push('/cart')}>
                        <div style={{ width: "max-conent", position: "relative" }}>
                            {
                                favoriteDevices.length ? (
                                    <div className="badge-wrapper badge-wrapper--mobile-header">
                                        <div style={{
                                            fontSize: 11,
                                            color: '#fff'
                                        }}>{cartDeviceList.length}</div>
                                    </div>
                                ) : null
                            }
                            <Link to="/cart" className="header-nav-burger__link third-title ">Chart</Link>
                        </div>

                    </li>
                </ul>
            </nav>

            {
                openSearchField && (

                    <div
                        className="search-field-alert--wrapper"
                        onClick={(event: MouseEvent<HTMLElement>) => {
                            event.preventDefault();

                            const target = event.target as HTMLElement

                            if (target.classList.contains('search-field-alert--wrapper')) {
                                setOpenSearchField(false)
                            }
                        }}
                    >
                        <div className="search-field-alert__content search-field-alert__content--mobile">
                            <div
                                className="search-field-alert__cross"
                                onClick={() => setOpenSearchField(false)}
                            >
                                <img src="/icons/cross.svg" className="search-field-alert__cross--icon" />
                            </div>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}>

                                <img src="/icons/Search.svg" style={{ position: 'absolute', right: 25 }} />
                                {props.children}
                            </label>

                        </div>
                    </div>
                )
            }
        </div>
    )
};

const mapStateToProps = (state: RootState) => ({
    favoriteDevices: state.favoritesDevice.deviceList,
    cartDeviceList: state.cartDeviceList.deviceList,
    deviceScreen: state.appState.deviceScreen
});

const matDispatchToProps = () => ({

});

export default connect(mapStateToProps, matDispatchToProps)(MobileHeader);