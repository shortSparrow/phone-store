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
import SliderImages from '../../components/SliderImages/SliderImages';
import Footer from '../../components/Footer/Footer';
import ShopCategory from '../../components/ShopCategory/ShopCategory';



const MainPage: React.FC<mainPropsInterfaces> = (props) => {
    useEffect(() => {
        props.loadHotPricePhones()
    }, [])

    useEffect(() => {
        // console.log(props.hotPricePhonesList);

    }, [props.hotPricePhonesList]);

    const imageList = [
        "https://villaesposto.com/wp-content/uploads/2018/09/1040x400.jpg",
        "https://blog.bigyellowbag.com/wp-content/uploads/2018/06/1040x400.png",
        "https://villaesposto.com/wp-content/uploads/2018/08/1040x400-1.png"
    ];

    return (
        <div className="main-page page">
            <Header />
            <div className="main-limit">
                <h1>Main page</h1>

                <h2>IMAGE SLIDER</h2>
                <SliderImages imageList={imageList} />

                <h2>HOT PRICE</h2>
                <SliderDevice deviceList={props.hotPricePhonesList} />

                <h2>Shop by category</h2>
                <ShopCategory />

                <h2>Brand new models</h2>
            </div>
            <Footer />
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