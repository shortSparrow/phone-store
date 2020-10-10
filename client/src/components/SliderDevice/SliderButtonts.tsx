import React, { useState } from 'react';
import "./SliderButtons.scss";

export const SampleNextArrow = (props: any) => {
    const { className, style, onClick, currentSlide, slideCount, slickSliderRef } = props;
    // const [visibleSlides, setVisibbleSlides] = useState(null);

    let edgeSlide = false;

    if (slickSliderRef.current) {
        const { breakpoint } = slickSliderRef.current.state;
        const { responsive } = slickSliderRef.current.props;

        const currentBreakpoint = responsive.find((item: any) => item.breakpoint === breakpoint);

        // setVisibbleSlides(currentBreakpoint.settings.slidesToShow)
        const visibleSlides = currentBreakpoint.settings.slidesToShow
        edgeSlide = currentSlide === slideCount - visibleSlides ? true : false

        console.log('breakpoint: ', breakpoint);
        console.log('responsive: ', responsive);
        console.log('currentBreakpoint: ', currentBreakpoint);

    }


    const extraStyle = [
        edgeSlide ? "slider-buttons--not-active" : ""
    ]

    return (
        <div
            className={`slider-buttons slider-buttons--left ${extraStyle}`}
            onClick={onClick}
        >
            <img src={edgeSlide ? "./icons/arrow.svg" : "./icons/arrow-black.svg"} alt="arrow" className="slider-buttons__arrow slider-buttons__arrow--next"/>
        </div>
    )
}


export const SamplePrevArrow = (props: any) => {
    const { className, style, onClick, currentSlide, slideCount } = props;
    const edgeSlide = currentSlide === 0 ? true : false;

    const extraStyle = [
        edgeSlide ? "slider-buttons--not-active" : ""
    ]

    return (
        <div
            className={`slider-buttons slider-buttons--right ${extraStyle}`}
            onClick={onClick}
        >
            <img src={edgeSlide ? "./icons/arrow.svg" : "./icons/arrow-black.svg"} alt="arrow" className="slider-buttons__arrow slider-buttons__arrow--prev"/>
        </div>
    )
}