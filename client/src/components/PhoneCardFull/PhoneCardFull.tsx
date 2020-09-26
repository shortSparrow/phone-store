import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { phones } from '../../store/actions';
import { useParams } from 'react-router-dom'
import { RootState } from '../../store/reducers';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import { defaultConstatnts } from '../../constants/defaultConstants';

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
            <h1>Card full</h1>
            {
                loading ? <p>LOADING...</p>
                    : error ? <p>Error</p>
                        : loading === false && !error && device ? (
                            <div className="phone-wrapper">
                                <p className="phone-title">{device.title}</p>
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

                                    <div className="full-card__availabe-ram-list">
                                        {
                                            device.currentDevice.availableRAM.map((ram: string) => (
                                                <div className={`full-card__availale-ram-wrapper ${device.currentRAM === ram ? "full-card__selected-ram" : ""}`} onClick={() => {
                                                    setDevice({...device, currentRAM: ram})
                                                }}>
                                                    <div className="full-card__availale-ram">{ram}</div>
                                                </div>
                                            ))
                                        }
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