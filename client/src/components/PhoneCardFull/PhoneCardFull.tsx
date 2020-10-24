import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { phones } from '../../store/actions';
import { useParams } from 'react-router-dom'
import { RootState } from '../../store/reducers';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';

import "./PhoneCardFull.scss"
import { defaultConstatnts } from '../../constants/defaultConstants';
import Header from '../Header/Header';
import SmallNavigation from '../SmallNavigation/SmallNavigation';
import GoBack from '../GoBack/GoBack';
import {favoritesDevice} from '../../store/actions';

import { favoriteDevice } from '../../interfaces/favoriteDevice'
import { title } from 'process';

type params = {
    model_name: string
}

interface PhoneCardFullInterface {
    currentModel: phoneCardInterface | null,
    loading: boolean | null,
    error: any,
    getPhoneByModelName: (model_name: string) => {},
    toggleFavoriteDevice: (device: favoriteDevice) => {}
    favoriteDevices: favoriteDevice[]
}

const PhoneCardFull: React.FC<PhoneCardFullInterface> = ({ loading, error, currentModel, getPhoneByModelName, favoriteDevices, toggleFavoriteDevice }) => {
    const [device, setDevice] = useState<any>(null);
    const [addToFavotireList, setAddToFavoriteList] = useState<boolean | null>(null);
    let params: params = useParams();

    useEffect(() => {
        getPhoneByModelName(params.model_name)
    }, [])


    useEffect(() => {
        const favorite = favoriteDevices.find((item: favoriteDevice) => item._id === currentModel?._id);

        if (favorite) {
            setAddToFavoriteList(true)
        } else {
            setAddToFavoriteList(false)
        }
    }, [favoriteDevices, currentModel])

    useEffect(() => {
        if (currentModel) {
            setDevice({
                ...currentModel,
                currentDevice: currentModel.availabelDevices[0],
                currentRAM: currentModel.availabelDevices[0].availableRAM[0],
                currentColor: currentModel.availabelColor[0],
                bigImage: currentModel.availabelDevices[0].images.main,
            })
        }
    }, [currentModel])

    useEffect(() => {
        // console.log(device.about);
    }, [device])

    return (
        <div>
            <Header />
            <div className="main-limit">
                {
                    device?.title ? <SmallNavigation params={[{ title: 'Phones', link: '/phones' }, { title: device.title, link: '' }]} /> : null
                }
                <GoBack />
                <h1>Card full</h1>
                {
                    loading ? <p>LOADING...</p>
                        : error ? <p>Error</p>
                            : loading === false && !error && device ? (
                                <div className="full-card">
                                    <p className="main-title">{device.title}</p>

                                    <div className="full-card__specifations">

                                        <div className="full-card__images-wrapper">
                                            <div className="full-card__small-image-list">
                                                {
                                                    device.currentDevice.images.other.map((image: string, index: number) => (
                                                        <div
                                                            className={`full-card__small-image ${image === device.bigImage ? "full-card__small-image--active" : ""}`}
                                                            onClick={() => {
                                                                const newDevice = { ...device, bigImage: image }
                                                                setDevice(newDevice)
                                                            }}
                                                            key={image}
                                                        >
                                                            <img
                                                                src={defaultConstatnts.domain + "/" + image}
                                                                alt={device.title}
                                                                className={`full-card__small-image--itself `}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="full-card__big-image">
                                                <img
                                                    src={defaultConstatnts.domain + "/" + device.bigImage}
                                                    alt={device.title}
                                                    className="full-card__big-image--itself"
                                                />
                                            </div>
                                        </div>

                                        <div className="full-card__select-block">
                                            <div className="full-card__available-color-list__wrapper">
                                                <p className="card-specification__name full-card__select-titile">Available colors</p>

                                                <div className="full-card__available-color-list">
                                                    {
                                                        device.availabelColor.map((color: string) => (
                                                            <div
                                                                className={`full-card__availabe-color-wrapper ${device.currentColor === color ? "full-card__availabe-color-wrapper--selected" : ""}`}
                                                                key={color}
                                                            >
                                                                <div
                                                                    className="full-card__availabe-color"
                                                                    style={{ backgroundColor: color }}
                                                                    onClick={() => {
                                                                        const newModel = currentModel?.availabelDevices.find((model) => model.color === color)
                                                                        setDevice({
                                                                            ...device,
                                                                            currentDevice: newModel,
                                                                            currentRAM: newModel?.availableRAM.find((ram) => ram === device.currentRAM) || newModel?.availableRAM[0],
                                                                            bigImage: newModel?.images.main,
                                                                            currentColor: color,
                                                                        })
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="full-card__separate-line"></div>

                                            <div className="full-card__availabe-ram-list_wrapper">
                                                <p className="card-specification__name">Select capacity</p>

                                                <div className="full-card__availabe-ram-list">
                                                    {
                                                        device.currentDevice.availableRAM.map((ram: string) => (
                                                            <div
                                                                className={`full-card__availale-ram-wrapper ${device.currentRAM === ram ? "full-card__availale-ram-wrapper__selected" : ""}`}
                                                                onClick={() => setDevice({ ...device, currentRAM: ram })}
                                                                key={ram}
                                                            >
                                                                <p className="full-card__availale-ram">{ram}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>


                                            <div className="phone-card__price full-card__price">
                                                <p className="phone-card__current-price full-card__current-price">{currentModel?.price.current}</p>
                                                <p className="phone-card__old-price">{currentModel?.price.old}</p>
                                            </div>

                                            <div className="full-card__short-info">
                                                <div className="phone-card__button--wrapper full-card__button-wrapper">
                                                    <div className="button__add-cart--wrapper phone-card__add-cart--wrapper">
                                                        <div className="button__add-cart--text">Add to cart</div>
                                                    </div>
                                                    <div className="button__favorite--wrapper phone-card__favorite--wrapper" onClick={() => toggleFavoriteDevice(currentModel!)}>
                                                        <img
                                                            src={`${addToFavotireList ? '/icons/heart-filed.svg' : '/icons/heart.svg'}`}
                                                            alt="favorite"
                                                            className="button__favorite--icon"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="card-specification--list">
                                                    <div className="card-specification--item">
                                                        <div className="card-specification__name">Screen</div>
                                                        <div className="card-specification__value">{currentModel?.deviceInfo.screen}</div>
                                                    </div>

                                                    <div className="card-specification--item">
                                                        <div className="card-specification__name">Processor</div>
                                                        <div className="card-specification__value">{currentModel?.deviceInfo.processor}</div>
                                                    </div>

                                                    <div className="card-specification--item">
                                                        <div className="card-specification__name">Camera</div>
                                                        <div className="card-specification__value">{currentModel?.deviceInfo.camera}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="full-card__id">
                                                <p className="card-specification__name">ID: undefined</p>
                                            </div>

                                        </div>


                                    </div>


                                    <div className="full-card__description">
                                        <div className="full-card__summary">
                                            <p className="second-title full-card__second-title">About</p>
                                            <div className="full-card__separate-line"></div>
                                            {
                                                device.abuot.map((item: { title: string, description: string }, index: number) => (
                                                    <div className="full-card__summary__paragraph" key={title + index}>
                                                        <p className="full-card__summary__title third-title">{item.title}</p>
                                                        <p className="full-card__summary__description body-text">{item.description}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="full-card__tech-sepcification">
                                            <p className="second-title full-card__second-title">Tech specs</p>
                                            <div className="full-card__separate-line"></div>
                                            <div className="full-card__tech-specifation__list">
                                                {
                                                    Object.entries(device.deviceInfo).map((item: [string, any], index: number) => {
                                                        const [name, description] = item;

                                                        return (
                                                            <div className="full-card__tech-sepcification__item" key={name + index}>
                                                                <p className="full-card__tech-sepcification__name card-specification__name">{name}</p>
                                                                <p className="full-card__tech-sepcification__description card-specification__value">{description}</p>
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ) : null
                }
            </div>

        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    loading: state.phonesState.loading,
    error: state.phonesState.error,
    currentModel: state.phonesState.currentModel,
    favoriteDevices: state.favoritesDevice.deviceList
})

const mapDispatchToProps = (dispatch: any) => ({
    getPhoneByModelName: (id: string) => dispatch(phones.getPhoneByModelName(id)),
    toggleFavoriteDevice: (device: favoriteDevice) => dispatch(favoritesDevice.toggleFavoriteDevice(device))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCardFull)