import React, { FC, useRef } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import "./SliderImages.scss";

import DeviceCardItem from '../DeviceCardItem/DeviceCardItem';
import { SampleNextArrow, SamplePrevArrow } from '../SliderDevice/SliderButtonts';

type sliderImagesInterface = {
    imageList: any
}

const SliderImages: FC<sliderImagesInterface> = (props) => {
    const slickSliderRef = useRef(null);
    // console.log(props);

    const settings = {
        dots: true,
        infinite: false,
        swipeToSlide: true,
        speed: 500,
        slidesToShow: 1,
        initialSlide: 0,
        appendDots: (dots: any) => {
            return (
                <div>
                    <div className="slider-images__bottom-dots--wrapper">
                        {
                            dots.map((dot: any, index: number) => (
                                <div
                                    className={`slider-images__bottom-dots ${dot.props.className === "slick-active" ? "slider-images__bottom-dots--active" : ""}`}
                                    onClick={dot.props.children.props.onClick}
                                    key={index}
                                >
                                </div>
                            )
                            )
                        }
                    </div>
                </div>

            )
        },
        nextArrow: <SampleNextArrow slickSliderRef={slickSliderRef} classNames="slider-buttons__big-image slider-buttons__big-image--right" />,
        prevArrow: <SamplePrevArrow slickSliderRef={slickSliderRef} classNames="slider-buttons__big-image slider-buttons__big-image--left" />,
    }

    console.log('list slider: ', props.imageList);
    

    return (
        <div className="slider-big-images">
            {/* <Slider {...settings} ref={slickSliderRef}>
                {
                    ["https://villaesposto.com/wp-content/uploads/2018/09/1040x400.jpg",
                        "https://blog.bigyellowbag.com/wp-content/uploads/2018/06/1040x400.png",
                        "https://villaesposto.com/wp-content/uploads/2018/08/1040x400-1.png"].map((image: any) => (
                            <img src={image} alt="" className="slider-images__big-image" key={image} />
                        ))
                }
            </Slider> */}
            {
                props.imageList.length > 0 ? (
                    <Slider {...settings} ref={slickSliderRef}>
                        {
                            props.imageList.map((image: any) => (
                                <img src={image} alt="" className="slider-images__big-image" key={image} />
                            ))
                        }
                    </Slider>
                ) : null
            }
        </div>
    )
}

export default SliderImages