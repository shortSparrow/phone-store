import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { useHistory } from "react-router-dom";

import "./DeviceCardItem.scss";
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import { phones } from '../../store/actions';
import { favoritesDevice, cartDeviceList } from '../../store/actions';
import { favoriteDevice } from '../../interfaces/favoriteDevice';
import { cartDevice } from '../../interfaces/cartDeviceList';


interface PhoneCardInterface {
    device: any, // device type
    toggleFavoriteDevice: any,
    favoriteDevices: favoriteDevice[],
    cartDeviceList: cartDevice[],
    toggleCartDevice: any,
}

const DeviceCardItem: React.FC<PhoneCardInterface> = ({ device, toggleFavoriteDevice, favoriteDevices, toggleCartDevice, cartDeviceList }) => {
    let history = useHistory();
    const [startClick, setStartClick] = useState<Date | null>(null);
    const [letPress, setLetPress] = useState(true); // if we move when mouseDown being, we don't navigate on fullPhoneScreen. Because we wont use drag nad drop with slider
    const [addToFavotireList, setAddToFavoriteList] = useState<boolean | null>(null);
    const [addToCartList, setAddToCartList] = useState<boolean | null>(null);


    useEffect(() => {
        const favorite = favoriteDevices.find((item: favoriteDevice) => item._id === device._id);

        if (favorite) {
            setAddToFavoriteList(true)
        } else {
            setAddToFavoriteList(false)
        }
    }, [favoriteDevices])


    useEffect(() => {
        const favorite = cartDeviceList.find((item: cartDevice) => item._id === device._id);

        if (favorite) {
            setAddToCartList(true)
        } else {
            setAddToCartList(false)
        }
    }, [cartDeviceList])


    const handleAddToFavoriteList = () => {
        toggleFavoriteDevice(device)
    }

    const handleAddToCartList = () => {
        const cartDevice = {
            _id: device._id,
            price: device.price,
            image: device.availabelDevices[0].images.main,
            title: device.title,
            routePosition: device.routePosition,
            deviceInfo: {
                ...device.deviceInfo
            },
            about: device?.about
        }

        toggleCartDevice(cartDevice)
        // toggleCartDevice(phone)
    }

    return (
        <div
            className="phone-card"
            onClick={(event) => {
                if (letPress) {

                    // console.log('device: ', device);
                    history.push(device.routePosition)
                    // if (device.type === 'tablet') {
                    //     history.push(`/tablet/${device.routePosition}`)
                    // } else if (device.type){
                    //     history.push(device.routePosition)
                    // } else {
                    //     history.push(`/phone/${device.routePosition}`)
                    // }


                }
            }}
            onMouseDown={(event) => {
                setStartClick(new Date())
                setLetPress(true)
            }}
            onMouseUp={() => {
                setStartClick(null)
            }}
            onMouseMove={(event) => {
                if (startClick) {
                    const currentDate = new Date();
                    const diff = currentDate.getTime() - startClick!.getTime();

                    if (diff < 200) {

                    } else {
                        setLetPress(false)
                    }
                }
            }}
        >
            <div className="phone-card__image--wrapper">
                <img src={device.availabelDevices[0].images.main} alt={device.title} className="phone-card__image--item" />
            </div>
            <div className="phone-card__content">
                <p className="phone-card__title">{device.title}</p>
               <div>
               <div className="phone-card__price">
                    <p className="phone-card__current-price">{device.price.current}</p>
                    <p className="phone-card__old-price">{device.price.old}</p>
                </div>

                <div className="phone-card__line"></div>
                {/* 
                <div className="card-specification--list">
                    <div className="card-specification--item">
                        <div className="card-specification__name">Screen</div>
                        <div className="card-specification__value">{device.deviceInfo.screen}</div>
                    </div>

                    <div className="card-specification--item">
                        <div className="card-specification__name">Processor</div>
                        <div className="card-specification__value">{device.deviceInfo.processor}</div>
                    </div>

                    <div className="card-specification--item">
                        <div className="card-specification__name">Camera</div>
                        <div className="card-specification__value">{device.deviceInfo.camera}</div>
                    </div>
                </div> */}

                {
                    device.shortInfo && (
                        <div className="card-specification--list">
                            {
                                Object.entries(device.shortInfo).map((item: [string, any], index: number) => {
                                    const [name, description] = item;

                                    return (
                                        <div className="card-specification--item" key={name + index}>
                                            <p className="card-specification__name">{name}</p>
                                            <p className="card-specification__value">{description}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }

                <div className="phone-card__button--wrapper" onClick={(event) => event.stopPropagation()}>
                    <div className={`button__add-cart--wrapper phone-card__add-cart--wrapper ${addToCartList ? 'button__add-cart--active' : ''}`} >
                        <div
                            onClick={handleAddToCartList}
                        >
                            Add to cart
                            </div>
                    </div>
                    <div className="button__favorite--wrapper phone-card__favorite--wrapper" onClick={handleAddToFavoriteList}>
                        <img
                            src={`${addToFavotireList ? '/icons/heart-filed.svg' : '/icons/heart.svg'}`}
                            alt="favorite"
                            className="button__favorite--icon"
                        />
                    </div>
                </div>

               </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootStateInterface) => ({
    favoriteDevices: state.favoritesDevice.deviceList,
    cartDeviceList: state.cartDeviceList.deviceList
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleFavoriteDevice: (device: favoriteDevice) => dispatch(favoritesDevice.toggleFavoriteDevice(device)),
    toggleCartDevice: (device: cartDevice) => dispatch(cartDeviceList.toggleCartDevice(device))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceCardItem)