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
    let params: params = useParams();

    useEffect(() => {
        getPhoneByModelName(params.model_name)
    }, [])

    useEffect(() => {
        if (currentModel) {
            setDevice({
                ...currentModel,
                bigImage: currentModel.availabelDevices[0].images.main,
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
                                            device.availabelDevices[0].images.other.map((image: string) => (
                                                <div className="full-card__small-image" onClick={() => setDevice({...device, bigImage: image})}>
                                                    <img
                                                    src={defaultConstatnts.clientHost + "/" + image}
                                                    alt={device.title}
                                                    className="full-card__small-image--itself"
                                                />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="full-card__big-image">
                                        <img
                                            src={defaultConstatnts.clientHost + "/" + device.bigImage}
                                            alt={device.title}
                                            className="full-card__big-image--itself"
                                        />
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