import React, { FC, useEffect, useState, MouseEvent } from 'react';
import { connect } from 'react-redux';

import './DesktopHeader.scss';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { RootState } from '../../../store/reducers';
import { favoriteDevice } from '../../../interfaces/favoriteDevice';
import { cartDevice } from '../../../interfaces/cartDeviceList';
import { DeviceScreenType } from '../../../interfaces/appStateInterface';

interface DesktopHeaderInterface {
    favoriteDevices: favoriteDevice[],
    cartDeviceList: cartDevice[],
    deviceScreen: DeviceScreenType
}

const DesktopHeader: FC<DesktopHeaderInterface> = (props) => {
    const { favoriteDevices, cartDeviceList, deviceScreen } = props;
    const [openSearchField, setOpenSearchField] = useState(false)

    const location = useLocation()
    let history = useHistory()

    useEffect(() => {
        if (deviceScreen.value! >= 910) {
            setOpenSearchField(false)
        }
    }, [deviceScreen])


    // console.log('props.children: ', props.children);


    return (
        <div className="header-navigation__wrapper">
            <div className="header-navigation__item">
                <div className="header-nav__logo-wrapper" onClick={() => history.push('/')}>
                    <img src="icons/logo.png" className="logo-image" style={{ width: '100%' }} />
                </div>
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

            {
                props.children && deviceScreen.value! >= 910
                    ? (

                        <div className="header-search-field--wrapper">
                            <label className="header-search-field--label">
                                <img src="/icons/Search.svg" style={{ position: 'absolute', right: 25, cursor: 'pointer' }} />
                                {props.children}
                            </label>
                        </div>
                    )
                    : (
                        <div className="header-search-field--wrapper">
                            <div
                                className="header-search-field--icon-wrapper"
                                onClick={() => setOpenSearchField(true)}
                            >
                                <img src="/icons/Search.svg" style={{ cursor: 'pointer' }} />
                            </div>

                        </div>
                    )
            }

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
                        ) : null
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

                        <div className="search-field-alert__content">
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
}

const mapStateToProps = (state: RootState) => ({
    favoriteDevices: state.favoritesDevice.deviceList,
    cartDeviceList: state.cartDeviceList.deviceList,
    deviceScreen: state.appState.deviceScreen
});

const matDispatchToProps = () => ({

});

export default connect(mapStateToProps, matDispatchToProps)(DesktopHeader);