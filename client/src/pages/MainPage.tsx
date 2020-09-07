import React from 'react';
import Header from '../components/Header/Header';

import './MainPage.scss';
import {connect } from 'react-redux';
import { RootStateInterface } from '../interfaces/rootStateInterface';



const MainPage: React.FC = (props) => {

    return (
        <div className="main-page">
            <Header />
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
        </div>
    )
}


const mapStateToProps = (state: RootStateInterface) => ({
    deviceScreen: state.appState.deviceScreen
})

// const mapDispatchToProps = (dispatch) => ({
    
// })



export default connect(mapStateToProps, null)(MainPage)