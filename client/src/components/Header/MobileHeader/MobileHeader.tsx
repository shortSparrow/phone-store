import React from 'react';
import { Link } from 'react-router-dom';

import './MobileHeader.scss';

export const MobileHeader = () => {
    return (
        <div className="header-navigation-burger__wrapper">
            <div className="header-navigation-burger__line">
                <div className="header-nav-burger__logo-wrapper">LOGO</div>

                <div className="header-nav-burger__menu-wrapper">
                    <button className="burger-icon" onClick={() => {
                        document.querySelector('.header-nav-burger__nav-wrapper')?.classList.toggle('header-nav-burger__nav-wrapper--active')
                    }}>X</button>

                </div>
            </div>

            <nav className="header-nav-burger__nav-wrapper">
                <ul className="header-nav-burger__item-wrapper">
                    <li className="header-nav-burger__item">
                        <Link to="/" className="header-nav-burger__link">home</Link>
                    </li>

                    <li className="header-nav-buger__item">
                        <Link to="/phones" className="header-nav-burger__link">phones</Link>
                    </li>

                    <li className="header-nav-burger__item">
                        <Link to="/tablets" className="header-nav-burger__link">tablet</Link>
                    </li>

                    <li className="header-nav-burger__item">
                        <Link to="/accessories" className="header-nav-burger__link">accessories</Link>
                    </li>

                    <li className="header-nav-burger__item">
                        <Link to="/favorites" className="header-nav-burger__link">Favotites</Link>
                    </li>
                    <li className="header-nav-burger__item">
                        <Link to="/chart" className="header-nav-burger__link">Chart</Link>
                    </li>
                </ul>
            </nav>

        </div>
    )
};