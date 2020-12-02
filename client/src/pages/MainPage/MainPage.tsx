import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import './MainPage.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import SliderDevice from '../../components/SliderDevice/SliderDevice';
import SliderImages from '../../components/SliderImages/SliderImages';
import Footer from '../../components/Footer/Footer';
import ShopCategory from '../../components/ShopCategory/ShopCategory';
import { useHTTP } from '../../hooks/useHTTP.hook';

let hotPriceList: any = null;
let newModelList: any = null;


const MainPage: React.FC<mainPropsInterfaces> = (props) => {
    const { getReguest: getNewModelPhones, loading: loadingNewModelPhones, error: errorNewModelPhones } = useHTTP();
    const { getReguest: getHotPricePhones, loading: loadingHotPricePhones, error: errorHotPricePhones } = useHTTP();
    const [imageList, setImageList] = useState<string[]>([])

    const [newModelPhones, setNewModelPhones] = useState(newModelList ? newModelList : []);
    const [hotPricePhones, setHotPricePhones] = useState(hotPriceList ? hotPriceList : []);

    useEffect(() => {
        // loadNewModels();
        if (!hotPriceList) {
            loadHotPricePhones()
        }

        if (!newModelList) {
            loadNewModels()
        }
    }, [])

    useEffect(() => {
        if (props.deviceScreen.value && props.deviceScreen.value < 700) {
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
            hotPriceList = request
        }
    }, [])

    const loadNewModels = useCallback(async () => {
        const request = await getNewModelPhones('/api/phone/new-models');
        if (request) {
            setNewModelPhones(request)
            newModelList = request

            
            
        }
    }, [])


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
    deviceScreen: { name: string | null, value: number | null },
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    deviceScreen: state.appState.deviceScreen,
})

const mapDispatchToProps = (dispatch: any) => ({
})



export default connect(mapStateToProps, mapDispatchToProps)(MainPage)