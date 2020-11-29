import React, { FC, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import "./SliderDevice.scss";

import DeviceCardItem from '../DeviceCardItem/DeviceCardItem';
import { SampleNextArrow, SamplePrevArrow } from './SliderButtonts';
import { Preloader } from '../Preloader/Preloader';
import { log } from 'console';

type sliderDeviceInterface = {
    deviceList: any,
    error?: any,
    loading?: boolean | null
}

const SliderDevice: FC<sliderDeviceInterface> = ({deviceList, error, loading}) => {
    const slickSliderRef = useRef(null);


    const settings = {
        dots: false,
        infinite: false,
        swipeToSlide: true,
        speed: 500,
        slidesToShow: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1388 + 64, // padding on this width + width slider * counter  = (150 * 2) + 272 * 4 = 1388. (marginLeft + margimRight) * count + = (8 + 8) * 4
                settings: {
                    initialSlide: 0,
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1300, // padding on this width + width slider * counter  = (100 * 2) + 272 * 3 = 1016. (marginLeft + margimRight) * count + = (8 + 8) * 3
                settings: {
                    initialSlide: 0,
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 780, // padding on this width + width slider * counter  = (50 * 2) + 272 * 2 = 644. (marginLeft + margimRight) * count + = (8 + 8) * 2
                settings: {
                    initialSlide: 0,
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 550, // padding on this width + width slider * counter = (50 * 2) + 272 * 1 = 372. (marginLeft + margimRight) * count + = (8 + 8) * 1
                settings: {
                    initialSlide: 0,
                    slidesToShow: 1,
                }
            }
        ],
        nextArrow: <SampleNextArrow slickSliderRef={slickSliderRef} classNames="slider-buttons__device" />,
        prevArrow: <SamplePrevArrow slickSliderRef={slickSliderRef} classNames="slider-buttons__device" />,
    }

    // useEffect(() => {
    //     console.log('loadingHotPricePhones');

    // }, [loading])

    // console.log(
    //     'deviceList: ', deviceList,
    //     'loading: ', loading,
    //     // 'deviceList: ', deviceList,
    // );
    
    return (
        <div className="slider-devices">

            {
                loading && !deviceList.length
                    ? (
                        <div className="preloader-wrapper--center">
                            <Preloader />
                            </div>
                    )
                    : error ? (
                        <h1>We can't load data, please try to reload page</h1>
                    )
                        : deviceList.length ? (
                            <Slider {...settings} ref={slickSliderRef}>
                                {
                                    deviceList.map((device: any) => <DeviceCardItem device={device} key={device._id} />)
                                }
                            </Slider>
                        ) : null

            }
        </div>
    )
}

export default SliderDevice