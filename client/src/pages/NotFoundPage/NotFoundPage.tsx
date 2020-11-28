import React, { FC } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './NotFoundPage.scss'

const NotFoundPage: FC = () => {
    return (
        <div className="page not-found-page">
            <Header />

            <div className="main-limit not-found-page--content">
                <h1>This page doesn't exist</h1>
            </div>

            <Footer />
        </div>
    )
}

export default NotFoundPage