import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./Footer.scss";

const Footer = () => {
  let navigate = useNavigate();

  return (
    <footer className="footer__wrapper">
      <div className="main-limit footer__content">
        <div className="footer__logo" onClick={() => navigate("/")}>
          <img
            src="icons/logo.png"
            className="logo-image"
            style={{ width: "100%" }}
          />
        </div>
        <div className="footer__navigation__wrapper">
          <nav className="footer__navigation">
            <ul className="footer__navigation__list">
              <li className="footer__navigation__item">
                <Link
                  to=""
                  className="uppaercase-text footer__navigation__link"
                >
                  Github
                </Link>
              </li>
              <li className="footer__navigation__item">
                <Link
                  to=""
                  className="uppaercase-text footer__navigation__link"
                >
                  Contacts
                </Link>
              </li>
              <li className="footer__navigation__item">
                <Link
                  to=""
                  className="uppaercase-text footer__navigation__link"
                >
                  Right
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer__back-to-top">
          <p className="small-text">Back to top</p>
          <div
            className="footer__navigation__back-to-top"
            onClick={() => {
              document.body.querySelector(".footer")?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
              });
              // console.log(document.body.querySelector('.header-navigation__wrapper'));
            }}
          >
            <img
              src="./icons/arrow.svg"
              alt="arrow"
              className="footer__back-to-top__arrow"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default connect(null, null)(Footer);
