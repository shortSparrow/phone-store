import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import './MainPage.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { phones, hotPricePhones } from '../../store/actions'
import { phoneCardInterface, phoneListStateType } from '../../interfaces/phonesInterfaces';
import { DeviceScreenType } from '../../interfaces/appStateInterface';
import PhoneCardList from '../../components/PhoneCardList/PhoneCardList';
import SmallNavigation from '../../components/SmallNavigation/SmallNavigation';
import SliderDevice from '../../components/SliderDevice/SliderDevice';



const MainPage: React.FC<mainPropsInterfaces> = (props) => {
    useEffect(() => {
        props.loadHotPricePhones()
    }, [])

    useEffect(() => {
        console.log(props.hotPricePhonesList);

    }, [props.hotPricePhonesList])

    return (
        <div className="main-page">
            <Header />
            <div className="main-limit">
                <h1>Main page</h1>
                <SliderDevice deviceList={props.hotPricePhonesList} />
            </div>
        </div>
    )
}

interface mainPropsInterfaces {
    hotPricePhonesLoading: boolean | null,
    hotPricePhonesFailed: any,
    hotPricePhonesList: phoneCardInterface[],
    loadHotPricePhones: () => {},
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    hotPricePhonesLoading: state.hotPricePhones.loading,
    hotPricePhonesFailed: state.hotPricePhones.error,
    hotPricePhonesList: state.hotPricePhones.hotPricePhoneList,
})

const mapDispatchToProps = (dispatch: any) => ({
    loadHotPricePhones: () => dispatch(hotPricePhones.loadHotPricePhones()),
})



export default connect(mapStateToProps, mapDispatchToProps)(MainPage)