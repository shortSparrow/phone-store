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
import { useHTTP } from '../../hooks/useHTTP.hook';



const MainPage: React.FC<mainPropsInterfaces> = (props) => {
    const { getReguest: getNewModelPhones, loading: loadingNewModelPhones, error: errorNewModelPhones } = useHTTP();
    const { getReguest: getHotPricePhones, loading: loadingHotPricePhones, error: errorHotPricePhones } = useHTTP();
    const [imageList, setImageList] = useState<string[]>([])

    const [newModelPhones, setNewModelPhones] = useState([]);
    const [hotPricePhones, setHotPricePhones] = useState([]);


    useEffect(() => {
        // props.loadHotPricePhones();
        loadNewModels();
        loadHotPricePhones()
    }, [])

    useEffect(() => {
        if (props.deviceScreen.value && props.deviceScreen.value  < 700) {
            if (imageList[0] !== "https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg") {
                setImageList([
                    "https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg",
                    "https://i.guim.co.uk/img/media/7a633730f5f90db3c12f6efc954a2d5b475c3d4a/0_138_5544_3327/master/5544.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=27c09d27ccbd139fd0f7d1cef8f7d41d",
                    "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
                ])
            }
        } else {
            if (imageList[0] !== "https://villaesposto.com/wp-content/uploads/2018/09/1040x400.jpg") {
                setImageList([
                    "https://villaesposto.com/wp-content/uploads/2018/09/1040x400.jpg",
                    "https://blog.bigyellowbag.com/wp-content/uploads/2018/06/1040x400.png",
                    "https://villaesposto.com/wp-content/uploads/2018/08/1040x400-1.png"
                ])
            }
        }
    }, [props.deviceScreen])

    const loadHotPricePhones = async () => {
        const request = await getHotPricePhones('/api/phone/hot-price');

        if (request) {
            setHotPricePhones(request)
        }
    }

    const loadNewModels = async () => {
        const request = await getNewModelPhones('/api/phone/new-models');
        if (request) {
            setNewModelPhones(request)
        }
    }


    return (
        <div className="main-page page">
            <Header />
            <div className="main-limit">
                <h1>Main page</h1>
                {/* on 700px remove slider or change on other images */}
                <h2>IMAGE SLIDER</h2>
                <SliderImages imageList={imageList} />

                <h2>HOT PRICE</h2>
                <SliderDevice deviceList={hotPricePhones} loading={loadingHotPricePhones} error={errorHotPricePhones} />

                <h2>Shop by category</h2>
                <ShopCategory />

                <h2>Brand new models</h2>
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