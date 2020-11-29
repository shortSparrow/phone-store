import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import './MainPage.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { phones, hotPricePhones } from '../../store/actions'
import { phoneCardInterface, phoneListStateType } from '../../interfaces/phonesInterfaces';
import { DeviceScreenType } from '../../interfaces/appStateInterface';
import DeviceCardList from '../../components/DeviceCardList/DeviceCardList';
import SmallNavigation from '../../components/SmallNavigation/SmallNavigation';
import SliderDevice from '../../components/SliderDevice/SliderDevice';
import SliderImages from '../../components/SliderImages/SliderImages';
import Footer from '../../components/Footer/Footer';
import ShopCategory from '../../components/ShopCategory/ShopCategory';
import { useHTTP } from '../../hooks/useHTTP.hook';



const MainPage: React.FC<mainPropsInterfaces> = (props) => {
    const { getReguest: getNewModelPhones, loading: loadingNewModelPhones, error: errorNewModelPhones } = useHTTP();
    const { getReguest: getHotPricePhones, loading: loadingHotPricePhones, error: errorHotPricePhones } = useHTTP();
    const [imageList, setImageList] = useState<string[]>([])

    const [newModelPhones, setNewModelPhones] = useState([]);
    const [hotPricePhones, setHotPricePhones] = useState([]);


    useEffect(() => {
        props.loadHotPricePhones();
        loadNewModels();
        loadHotPricePhones();    
        
        console.log(newModelPhones);
        
    }, [])

    useEffect(() => {
        if (props.deviceScreen.value && props.deviceScreen.value  < 700) {
            if (imageList[0] !== "icons/big-slider-image-small-1.jpg") {
                setImageList([
                    "icons/big-slider-image-small-1.jpg",
                    "icons/big-slider-image-small-2.jpg",
                    "icons/big-slider-image-small-3.jpg",
                    "icons/big-slider-image-small-5.jpg",
                    "icons/big-slider-image-small-6.jpg",
                ])
            }
        } else {
            if (imageList[0] !== "icons/big-slider-1.jpg") {
                setImageList([
                    "icons/big-slider-image-big-1.jpg",
                    "icons/big-slider-image-big-2.jpg",
                    "icons/big-slider-image-big-3.jpg",
                    "icons/big-slider-image-big-4.jpg",
                    "icons/big-slider-image-big-5.jpg",
                ])
            }
        }
    }, [props.deviceScreen])

    const loadHotPricePhones = useCallback(async () => {
        const request = await getHotPricePhones('/api/phone/hot-price');

        if (request) {
            setHotPricePhones(request)
        }
    },[])

    const loadNewModels = useCallback(async () => {
        const request = await getNewModelPhones('/api/phone/new-models');
        if (request) {
            setNewModelPhones(request)
        }
    },[])

    useEffect(() => {
        console.log(loadingHotPricePhones);

    }, [loadingHotPricePhones])

    return (
        <div className="main-page page">
            <Header />
            <div className="main-limit">
                <div className="main-page__big-slider__wrapper">
                <SliderImages imageList={imageList} />
                </div>

                <p className="main-title main-page__title">Hot price</p>
                <SliderDevice deviceList={hotPricePhones} loading={loadingHotPricePhones} error={errorHotPricePhones} />

                <p className="main-title main-page__title">Shop by category</p>
                <ShopCategory />

                <p className="main-title main-page__title">Brand new models</p>
                <SliderDevice deviceList={newModelPhones} loading={loadingNewModelPhones} error={errorNewModelPhones} />

            </div>
            <Footer />
        </div>
    )
}

interface mainPropsInterfaces {
    hotPricePhonesLoading: boolean | null,
    hotPricePhonesFailed: any,
    hotPricePhonesList: phoneCardInterface[],
    deviceScreen: {name: string | null, value: number | null},
    loadHotPricePhones: () => {},
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    hotPricePhonesLoading: state.hotPricePhones.loading,
    hotPricePhonesFailed: state.hotPricePhones.error,
    hotPricePhonesList: state.hotPricePhones.hotPricePhoneList,
    deviceScreen: state.appState.deviceScreen,
})

const mapDispatchToProps = (dispatch: any) => ({
    loadHotPricePhones: () => dispatch(hotPricePhones.loadHotPricePhones()),
})



export default connect(mapStateToProps, mapDispatchToProps)(MainPage)