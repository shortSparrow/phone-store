import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GoBack from '../../components/GoBack/GoBack';
import Header from '../../components/Header/Header';
import SmallNavigation from '../../components/SmallNavigation/SmallNavigation';
import { cartDevice } from '../../interfaces/cartDeviceList';
import { RootState } from '../../store/reducers';
import { cartDeviceList } from '../../store/actions';

import './CartPage.scss';
import Footer from '../../components/Footer/Footer';

interface cartPageInterface {
    chartDeviceList: cartDevice[],
    toggleCartDevice: (device: cartDevice) => void
}

interface deviceCheckoutType extends cartDevice {
    priceNumber: number;
    count: number;
};

const CartPage: FC<cartPageInterface> = ({ chartDeviceList, toggleCartDevice }) => {
    const [checkoutDeviceList, setCheckoutDeviceList] = useState<any>([])
    const [totalSum, setTotalSum] = useState(0);
    const [deletedItemsId, setDeletedItemsId] = useState<string[]>([])

    useEffect(() => {
        if (!checkoutDeviceList.length) {
            setCheckoutDeviceList(chartDeviceList.map((device: cartDevice) => ({
                ...device,
                priceNumber: Number(device.price.current.slice(1,)),
                count: 1
            })))
        } else {
            setCheckoutDeviceList(checkoutDeviceList.filter((device: any) => deletedItemsId.every((item: string) => item !== device._id)))
        }
    }, [chartDeviceList])

    useEffect(() => {
        let totalSuma = 0;

        for (const item of checkoutDeviceList) {
            totalSuma += item.priceNumber * item.count
        }

        setTotalSum(totalSuma)

    }, [checkoutDeviceList])


    const plusDevice = (id: string) => {
        const newCheckoutDevice = checkoutDeviceList.map((device: deviceCheckoutType) => {
            if (device._id === id) {
                return {
                    ...device,
                    count: device.count + 1
                }
            }
            return device
        })

        setCheckoutDeviceList(newCheckoutDevice)
    }

    const minusDevice = (id: string) => {
        const newCheckoutDevice = checkoutDeviceList.map((device: deviceCheckoutType) => {
            if (device._id === id) {
                if (device.count - 1) {
                    return {
                        ...device,
                        count: device.count - 1
                    }
                }
                return device
            }

            return device
        })
        setCheckoutDeviceList(newCheckoutDevice)
    }


    // useEffect(() => {
    //     console.log('checkoutDeviceList: ', checkoutDeviceList);
    // }, [checkoutDeviceList])


    const removeDeviceFromList = (id: string) => {
        // now we have a bug
        const mathcedDevice = checkoutDeviceList.find((device: cartDevice) => device._id === id);
        setDeletedItemsId([...deletedItemsId, id])

        // console.log('mathcedDevice: ', mathcedDevice);

        toggleCartDevice(mathcedDevice!)
    }

    return (
        <div className="page">
            <Header />
            <div className="main-limit content">
                {
                    <SmallNavigation params={[{ title: 'Cart', link: '/cart' }]} />
                }
                <GoBack />
                <p className="main-title">Cart</p>
                {
                    chartDeviceList.length
                        ? (
                            <div className="cart">
                                <div>
                                    {
                                        checkoutDeviceList.map((device: deviceCheckoutType) => (
                                            <div className="cart-item">
                                                <div className="cart-item__preview">
                                                    <div className="cart-item__cross" onClick={() => removeDeviceFromList(device._id)}>
                                                        <img src="/icons/cross.svg" className="cart-item__cross--icon" />
                                                    </div>
                                                    <div className="cart-item__image-wrapper">
                                                        <img src={device.image} className="cart-item__image" />
                                                    </div>
                                                    <div className="cart-item__title-wrapper">
                                                        <p className="cart-title--text">{device.title}</p>
                                                    </div>
                                                </div>

                                                <div className="cart-item__info">
                                                    <div className="cart-item__counter">
                                                        <div
                                                            className="slider-buttons slider-buttons--not-active slider-buttons--cart"
                                                            onClick={() => minusDevice(device._id)}
                                                        >
                                                            -
                                        </div>
                                                        <p className="cart-item__count">
                                                            {device.count}
                                                        </p>
                                                        <div
                                                            onClick={() => plusDevice(device._id)}
                                                            className="slider-buttons slider-buttons--cart"
                                                        >
                                                            +
                                            </div>

                                                    </div>

                                                    <div className="cart-item__price-wrapper">
                                                        <p className="second-title cart-item__price">{device.priceNumber * device.count} {device.price.current[0]}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="cart__checkout">
                                    <div className="cart__total">
                                        <p className="cart__total-price second-title">{totalSum}</p>
                                        <p className="cart__total-items small-text">Total for {checkoutDeviceList.length} items</p>
                                    </div>

                                    <div className="cart__line"></div>
                                    <div className="cart__button-wrapper">
                                        <div className="button__add-cart--wrapper cart__button">
                                            <p style={{ margin: 0 }}>Ceckout</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                        : (
                            <div className="empty-list--information">
                                <p className="uppaercase-text" style={{ fontSize: 20, lineHeight: 'inherit' }}>
                                    Нou haven’t added anything to the cart yet. When you add a product to the cart, it will be displayed here and you can make a purchase
                            </p>
                            </div>
                        )
                }
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
    chartDeviceList: state.cartDeviceList.deviceList
})

const mapDispatchToProps = (dispatch: any) => ({
    toggleCartDevice: (device: cartDevice) => dispatch(cartDeviceList.toggleCartDevice(device))
})


export default connect(mapStateToProps, mapDispatchToProps)(CartPage)