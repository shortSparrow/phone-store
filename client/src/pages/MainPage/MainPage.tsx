import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import './MainPage.scss';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import {phones} from '../../store/actions'
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import { DeviceScreenType } from '../../interfaces/appStateInterface';
import PhoneCardList from '../../components/PhoneCardList/PhoneCardList';



const MainPage: React.FC<mainPropsInterfaces> = ({phoneList, loadPhones}) => {

    useEffect(() => {
        loadPhones()
    }, [])

    useEffect(() => {
        // console.log(typeof phoneList);
        // console.log( phoneList);
        
    }, [phoneList])

    // create sorted 
    return (
        <div className="main-page">
            <Header />
            <PhoneCardList phoneList={phoneList}/>
        </div>
    )
}

interface mainPropsInterfaces {
    deviceScreen: DeviceScreenType,
    phoneList: phoneCardInterface[],
    loadPhones: () => {}
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    deviceScreen: state.appState.deviceScreen,
    phoneList: state.phonesState.phoneList
})

const mapDispatchToProps = (dispatch:any) => ({
    loadPhones: () => dispatch(phones.loadPhones())
})



export default connect(mapStateToProps, mapDispatchToProps)(MainPage)