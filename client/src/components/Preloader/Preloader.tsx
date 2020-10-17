import React from 'react';
import "./Preloader.scss";

export const Preloader = (props: any) => {
    const {
        color = 'black',
        width = 64,
        height = 64,
        borderWidth = 6,
        wrapperWidth = 64,
        wrapperHeight = 64
    } = props;
    return (
        <div className="preloader-container" style={{
            width: `${wrapperWidth}px`,
            height: `${wrapperHeight}px`,
        }}>
            <div className="preloader" style={{
                border: `${borderWidth}px solid #fff`,
                width: `${width}px`,
                height: `${height}px`,
                borderColor: `${color} transparent ${color} transparent`,
            }} />
        </div>
    )
}