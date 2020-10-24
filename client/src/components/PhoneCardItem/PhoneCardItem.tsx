import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { useHistory } from "react-router-dom";

import "./PhoneCardItem.scss";
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import { phones } from '../../store/actions';
import { favoritesDevice } from '../../store/actions';
import { favoriteDevice } from '../../interfaces/favoriteDevice';

interface PhoneCardInterface {
    phone: phoneCardInterface,
    toggleFavoriteDevice: any,
    favoriteDevices: favoriteDevice[]
}

const PhoneCardItem: React.FC<PhoneCardInterface> = ({ phone, toggleFavoriteDevice, favoriteDevices }) => {
    let history = useHistory();
    const [startClick, setStartClick] = useState<Date | null>(null);
    const [letPress, setLetPress] = useState(true); // if we move when mouseDown being, we don't navigate on fullPhoneScreen. Because we wont use drag nad drop with slider
    const [addToFavotireList, setAddToFavoriteList] = useState<boolean | null>(null);

    useEffect(() => {
        const favorite = favoriteDevices.find((item: favoriteDevice) => item._id === phone._id);

        if (favorite) {
            setAddToFavoriteList(true)
        } else {
            setAddToFavoriteList(false)
        }
    }, [favoriteDevices])

    const handleAddToFavoriteList = () => {
        toggleFavoriteDevice(phone)
    }

    return (
        <div
            className="phone-card"
            onClick={(event) => {
                if (letPress) {
                    history.push(`/phone/${phone.routePosition}`)
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
                <img src={phone.availabelDevices[0].images.main} alt={phone.title} className="phone-card__image--item" />
            </div>
            <div className="phone-card__content">
                <p className="phone-card__title">{phone.title}</p>
                <div className="phone-card__price">
                    <p className="phone-card__current-price">{phone.price.current}</p>
                    <p className="phone-card__old-price">{phone.price.old}</p>
                </div>

                <div className="phone-card__line"></div>

                <div className="card-specification--list">
                    <div className="card-specification--item">
                        <div className="card-specification__name">Screen</div>
                        <div className="card-specification__value">{phone.deviceInfo.screen}</div>
                    </div>

                    <div className="card-specification--item">
                        <div className="card-specification__name">Processor</div>
                        <div className="card-specification__value">{phone.deviceInfo.processor}</div>
                    </div>

                    <div className="card-specification--item">
                        <div className="card-specification__name">Camera</div>
                        <div className="card-specification__value">{phone.deviceInfo.camera}</div>
                    </div>
                </div>

                <div className="phone-card__button--wrapper">
                    <div className="button__add-cart--wrapper phone-card__add-cart--wrapper">
                        <div className="button__add-cart--text">Add to cart</div>
                    </div>
                    <div className="button__favorite--wrapper phone-card__favorite--wrapper" onClick={(event) => {
                        event.stopPropagation()
                        handleAddToFavoriteList()
                    }}>
                        <img
                            src={`${addToFavotireList ? '/icons/heart-filed.svg' : '/icons/heart.svg'}`}
                            alt="favorite"
                            className="button__favorite--icon"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state: RootStateInterface) => ({
    favoriteDevices: state.favoritesDevice.deviceList
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleFavoriteDevice: (device: favoriteDevice) => dispatch(favoritesDevice.toggleFavoriteDevice(device))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCardItem)