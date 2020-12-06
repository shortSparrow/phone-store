import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useStore, useSelector } from 'react-redux';
import { accessories, phones, tablets } from '../../store/actions';
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { RootState } from '../../store/reducers';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';



import "./DeviceFullCard.scss";
import { defaultConstatnts } from '../../constants/defaultConstants';
import Header from '../Header/Header';
import SmallNavigation from '../SmallNavigation/SmallNavigation';
import GoBack from '../GoBack/GoBack';
import { favoritesDevice, cartDeviceList } from '../../store/actions';

import { favoriteDevice } from '../../interfaces/favoriteDevice'
import { title } from 'process';
import { cartDevice } from '../../interfaces/cartDeviceList';
import { accessoriesCardInterface } from '../../interfaces/accessoriesStateInterface';
import { useHTTP } from '../../hooks/useHTTP.hook';
import Footer from '../Footer/Footer';

type params = {
    model_name: string
}

interface DeviceFullCardInterface {
    toggleFavoriteDevice: (device: favoriteDevice) => {},
    toggleCartDevice: (device: cartDevice) => void,
    favoriteDevices: favoriteDevice[],
    cartDeviceList: cartDevice[],
}



const DeviceFullCard: React.FC<DeviceFullCardInterface> = (props) => {
    const {
        favoriteDevices,
        toggleFavoriteDevice, toggleCartDevice,
        cartDeviceList
    } = props
    const location = useLocation();
    const history = useHistory();
    const productType = location.pathname.match(/^\/[\w]+/gi)![0].slice(1,);



    const { getReguest, loading: isLoading, error, data: currentModel }: any = useHTTP()


    const [device, setDevice] = useState<any>(null);
    const [addToFavotireList, setAddToFavoriteList] = useState<boolean | null>(null);
    const [addToCartList, setAddToCartList] = useState<boolean | null>(null);

    let params: params = useParams();

    console.log('currentModel: ', currentModel);

    useEffect(() => {
        // getReguest(`/api/${productType}/item/?model_name=${params.model_name}`)
        getReguest(`/api/${productType}/item/?model_name=${productType}/` + params.model_name)
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
        const cart = cartDeviceList.find((item: cartDevice) => item._id === currentModel?._id);

        if (cart) {
            setAddToCartList(true)
        } else {
            setAddToCartList(false)
        }

    }, [cartDeviceList, currentModel])


    const handleToggleCartList = () => {
        const cartDevice = {
            _id: currentModel!._id,
            price: {
                old: currentModel!.price.old,
                current: currentModel!.price.current
            },
            image: device.currentDevice.images.main,
            title: currentModel!.title,
            routePosition: currentModel!.routePosition,
            deviceInfo: {
                ...currentModel?.deviceInfo
            },
            about: device.abuot
        }

        toggleCartDevice(cartDevice)
    }

    useEffect(() => {
        if (currentModel) {
            setDevice({
                ...currentModel,
                currentDevice: {
                    ...currentModel.availabelDevices[0],
                    currentColor: currentModel.availabelColor[0],
                    bigImage: currentModel.availabelDevices[0].images.main,
                },

            })
        }
    }, [currentModel])

    return (
        <div className="page">
            <Header />
            <div className="main-limit">
                {
                    device?.title ? <SmallNavigation params={[{ title: 'Accessories', link: '/accessories' }, { title: device.title, link: '' }]} /> : null
                }
                <GoBack />
                {
                    isLoading ? (
                        <p>LOADING...</p>
                    )
                        : error ? <p>Error</p>
                            : isLoading === false && !error && device ? (
                                <div className="full-device">
                                    <p className="main-title">{device.title}</p>

                                    <div className="full-device__specifations">

                                        <div className="full-device__images-wrapper">
                                            <div className="full-device__small-image-list">
                                                {
                                                    [device.currentDevice.images.main, ...device.currentDevice.images.other].map((image: string, index: number) => (
                                                        <div
                                                            className={`full-device__small-image ${image === device.currentDevice.bigImage ? "full-device__small-image--active" : ""}`}
                                                            onClick={() => {
                                                                const newDevice = { ...device, currentDevice: { ...device.currentDevice, bigImage: image } }
                                                                setDevice(newDevice)
                                                            }}
                                                            key={image}
                                                        >
                                                            <img
                                                                src={defaultConstatnts.domain + "/" + image}
                                                                alt={device.title}
                                                                className={`full-device__small-image--itself `}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="full-device__big-image">
                                                <img
                                                    src={defaultConstatnts.domain + "/" + device.currentDevice.bigImage}
                                                    alt={device.title}
                                                    className="full-device__big-image--itself"
                                                />
                                            </div>
                                        </div>

                                        <div className="full-device__select-block">
                                            <div className="full-device__available-color-list__wrapper">
                                                <p className="card-specification__name full-device__select-titile">Available colors</p>

                                                <div className="full-device__available-color-list">
                                                    {
                                                        device.availabelColor.map((color: string) => (
                                                            <div
                                                                className={`full-device__availabe-color-wrapper ${device.currentColor === color ? "full-device__availabe-color-wrapper--selected" : ""}`}
                                                                key={color}
                                                            >
                                                                <div
                                                                    className="full-device__availabe-color"
                                                                    style={{ backgroundColor: color }}
                                                                    onClick={() => {
                                                                        const newDeviceIndex = currentModel?.availabelDevices.findIndex((model: any) => model.color === color)

                                                                        const newDevice = {
                                                                            ...device, currentDevice: {
                                                                                ...currentModel!.availabelDevices[newDeviceIndex!],
                                                                                currentColor: currentModel!.availabelColor[newDeviceIndex!],
                                                                                bigImage: currentModel!.availabelDevices[newDeviceIndex!].images.main,
                                                                            }
                                                                        }

                                                                        setDevice(newDevice)
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="full-device__separate-line"></div>

                                            <div className="phone-card__price full-device__price">
                                                <p className="phone-card__current-price full-device__current-price">{currentModel?.price.current}</p>
                                                <p className="phone-card__old-price">{currentModel?.price.old}</p>
                                            </div>

                                            <div className="full-device__short-info">
                                                <div className="phone-card__button--wrapper full-device__button-wrapper">
                                                    <div
                                                        className={`button__add-cart--wrapper phone-card__add-cart--wrapper ${addToCartList ? 'button__add-cart--active' : ''}`}
                                                        onClick={handleToggleCartList}
                                                    >
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

                                                {/* <div className="card-specification--list">
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
                                            </div>

                                            <div className="full-device__id">
                                                <p className="card-specification__name">ID: undefined</p>
                                            </div>

                                        </div>


                                    </div>


                                    <div className="full-device__description">
                                        <div className="full-device__summary">
                                            <p className="second-title full-device__second-title">About</p>
                                            <div className="full-device__separate-line"></div>
                                            {
                                                device.about
                                                    ? device.about.map((item: { title: string, description: string }, index: number) => (
                                                        <div className="full-device__summary__paragraph" key={title + index}>
                                                            <p className="full-device__summary__title third-title">{item.title}</p>
                                                            <p className="full-device__summary__description body-text">{item.description}</p>
                                                        </div>
                                                    ))
                                                    : (
                                                            <p className="full-device__summary__title third-title">There aren't any description about this product, we add one in the near future</p>
                                                    )


                                            }
                                        </div>
                                        <div className="full-device__tech-sepcification">
                                            <p className="second-title full-device__second-title">Tech specs</p>
                                            <div className="full-device__separate-line"></div>
                                            <div className="full-device__tech-specifation__list">
                                                {
                                                    Object.entries(device.deviceInfo).map((item: [string, any], index: number) => {
                                                        const [name, description] = item;

                                                        return (
                                                            <div className="full-device__tech-sepcification__item" key={name + index}>
                                                                <p className="full-device__tech-sepcification__name card-specification__name">{name}</p>
                                                                <p className="full-device__tech-sepcification__description card-specification__value">{description}</p>
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
            <Footer />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    // isLoading: state.accessories.isLoading,
    // error: state.accessories.error,
    // currentModel: state.accessories.currentModel,
    favoriteDevices: state.favoritesDevice.deviceList,
    cartDeviceList: state.cartDeviceList.deviceList
})

const mapDispatchToProps = (dispatch: any) => ({
    toggleFavoriteDevice: (device: favoriteDevice) => dispatch(favoritesDevice.toggleFavoriteDevice(device)),
    toggleCartDevice: (device: cartDevice) => dispatch(cartDeviceList.toggleCartDevice(device))

})

export default connect(mapStateToProps, mapDispatchToProps)(DeviceFullCard)