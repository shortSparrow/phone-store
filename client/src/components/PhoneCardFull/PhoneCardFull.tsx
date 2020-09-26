import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { phones } from '../../store/actions';
import { useParams } from 'react-router-dom'
import { RootState } from '../../store/reducers';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';

import "./PhoneCardFull.scss"
import { defaultConstatnts } from '../../constants/defaultConstants';
import Header from '../Header/Header';

type params = {
    model_name: string
}

interface PhoneCardFullInterface {
    currentModel: phoneCardInterface | null,
    loading: boolean | null,
    error: any,
    getPhoneByModelName: (model_name: string) => {}
}

const PhoneCardFull: React.FC<PhoneCardFullInterface> = ({ loading, error, currentModel, getPhoneByModelName }) => {
    const [device, setDevice] = useState<any>(null);
    // const [bigImage, set]
    let params: params = useParams();

    useEffect(() => {
        getPhoneByModelName(params.model_name)
    }, [])

    useEffect(() => {
        if (currentModel) {
            setDevice({
                ...currentModel,
                currentDevice: currentModel.availabelDevices[0],
                currentRAM: currentModel.availabelDevices[0].availableRAM[0],
                bigImage: currentModel.availabelDevices[0].images.main
            })
        }

    }, [currentModel])

    return (
        <div>
            <Header />
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
                                                device.currentDevice.images.other.map((image: string) => (
                                                    <div className="full-card__small-image" onClick={() => {
                                                        const newDevice = { ...device, bigImage: image }
                                                        // newDevice.currentDevice.images.main = image
                                                        setDevice(newDevice)
                                                    }
                                                    }>
                                                        <img
                                                            src={defaultConstatnts.domain + "/" + image}
                                                            alt={device.title}
                                                            className="full-card__small-image--itself"
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

                                    <div className="full-card__select-balock">
                                        <div className="full-card__available-color-list__wrapper">
                                            <p className="card-specification__name full-card__select-titile">Available colors</p>

                                            <div className="full-card__available-color-list">
                                                {
                                                    device.availabelColor.map((color: string) => (
                                                        <div className="full-card__availabe-color-wrapper">
                                                            <div
                                                                className="full-card__availabe-color"
                                                                style={{ backgroundColor: color }}
                                                                onClick={() => {
                                                                    const newModel = currentModel?.availabelDevices.find((model) => model.color === color)
                                                                    setDevice({
                                                                        ...device,
                                                                        currentDevice: newModel,
                                                                        currentRAM: newModel?.availableRAM.find((ram) => ram === device.currentRAM) || newModel?.availableRAM[0],
                                                                        bigImage: newModel?.images.main
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

                                        <div className="phone-card__button--wrapper full-card__button-wrapper">
                                            <div className="button__add-cart--wrapper phone-card__add-cart--wrapper">
                                                <div className="button__add-cart--text">Add to cart</div>
                                            </div>
                                            <div className="button__favorite--wrapper phone-card__favorite--wrapper">
                                                <img src="/icons/heart.svg" alt="favorite" className="button__favorite--icon" />
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


                                <div className="full-card__description">
                                    <div className="full-card__summary">
                                        <p className="second-title">About</p>
                                    </div>
                                    <div className="full-card__tech-sepcification">

                                    </div>
                                </div>

                            </div>
                        ) : null
            }
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    loading: state.phonesState.loading,
    error: state.phonesState.error,
    currentModel: state.phonesState.currentModel
})

const mapDispatchToProps = (dispatch: any) => ({
    getPhoneByModelName: (id: string) => dispatch(phones.getPhoneByModelName(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCardFull)