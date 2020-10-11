import React, { FC, useRef } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import "./SliderImages.scss";

import PhoneCardItem from '../PhoneCardItem/PhoneCardItem';
import { SampleNextArrow, SamplePrevArrow } from '../SliderDevice/SliderButtonts';

type sliderImagesInterface = {
    imageList: any
}

const SliderImages: FC<sliderImagesInterface> = (props) => {
    const slickSliderRef = useRef(null);


    const settings = {
        dots: true,
        infinite: false,
        swipeToSlide: true,
        speed: 500,
        slidesToShow: 1,
        initialSlide: 0,
        appendDots: (dots: any) => {
            console.log(dots);

            return (
                <div>
                    <div className="slider-images__bottom-dots--wrapper">
                        {
                            dots.map((dot: any) => (
                                <div
                                    className={`slider-images__bottom-dots ${dot.props.className === "slick-active" ? "slider-images__bottom-dots--active" : ""}`}
                                    onClick={dot.props.children.props.onClick}
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

    return (
        <div className="slider-big-images">
            {
                props.imageList.length ? (
                    <Slider {...settings} ref={slickSliderRef}>
                        {
                            props.imageList.map((image: any) => (
                                // <div className="slider-image" key={image}>
                                <img src={image} alt="" className="slider-images__big-image" />
                                // </div>
                            ))
                        }
                    </Slider>
                ) : null
            }

        </div>
    )
}

export default SliderImages