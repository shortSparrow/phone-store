import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import "./Footer.scss"

const Footer = () => {
    return (
        <div className="footer__wrapper">
            <div className="main-limit footer__content">
                <div className="footer__logo">LOGO</div>
                <div className="footer__navigation__wrapper">
                    <nav className="footer__navigation">
                        <ul className="footer__navigation__list">
                            <li className="footer__navigation__item">
                                <Link to="" className="uppaercase-text footer__navigation__link">Github</Link>
                            </li>
                            <li className="footer__navigation__item">
                                <Link to="" className="uppaercase-text footer__navigation__link">Contacts</Link>
                            </li>
                            <li className="footer__navigation__item">
                                <Link to="" className="uppaercase-text footer__navigation__link">Right</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="footer__back-to-top">
                    <p className="small-text">Back to top</p>
                    <div className="footer__navigation__back-to-top">
                        <img src="./icons/arrow.svg" alt="arrow" className="footer__back-to-top__arrow"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(Footer)