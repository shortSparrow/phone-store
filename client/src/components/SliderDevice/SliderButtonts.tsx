import React, { useState } from 'react';
import "./SliderButtons.scss";

export const SampleNextArrow = (props: any) => {
    const { className, style, onClick, currentSlide, slideCount, slickSliderRef } = props;
    // const [visibleSlides, setVisibbleSlides] = useState(null);
    // console.log(props);

    let edgeSlide = false;
    // console.log(slickSliderRef.current);

    if (slickSliderRef.current) {
        const { breakpoint } = slickSliderRef.current.state;
        const { responsive } = slickSliderRef.current.props;

        const currentBreakpoint = responsive ? responsive.find((item: any) => item.breakpoint === breakpoint) : null;

        let visibleSlides = null;
        if (currentBreakpoint) {
            visibleSlides = currentBreakpoint.settings.slidesToShow
        } else {
            visibleSlides = slickSliderRef.current.props.slidesToShow; // default slides to show.
        }        
        
        edgeSlide = currentSlide === slideCount - visibleSlides ? true : false;
    }


    const extraStyle = [
        edgeSlide ? "slider-buttons--not-active" : "",
        props.classNames
    ]

    return (
        <div
            className={`slider-buttons slider-buttons--left ${extraStyle.join(" ")}`}
            onClick={onClick}
        >
            <img src={edgeSlide ? "./icons/arrow.svg" : "./icons/arrow-black.svg"} alt="arrow" className="slider-buttons__arrow slider-buttons__arrow--next" />
        </div>
    )
}


export const SamplePrevArrow = (props: any) => {
    const { className, style, onClick, currentSlide, slideCount } = props;
    const edgeSlide = currentSlide === 0 ? true : false;

    const extraStyle = [
        edgeSlide ? "slider-buttons--not-active" : "",
        props.classNames
    ]

    return (
        <div
            className={`slider-buttons slider-buttons--right ${extraStyle.join(" ")}`}
            onClick={onClick}
        >
            <img src={edgeSlide ? "./icons/arrow.svg" : "./icons/arrow-black.svg"} alt="arrow" className="slider-buttons__arrow slider-buttons__arrow--prev" />
        </div>
    )
}