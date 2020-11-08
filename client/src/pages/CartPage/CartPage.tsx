import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import GoBack from '../../components/GoBack/GoBack';
import Header from '../../components/Header/Header';
import SmallNavigation from '../../components/SmallNavigation/SmallNavigation';
import { cartDevice } from '../../interfaces/cartDeviceList';
import { RootState } from '../../store/reducers';

import './CartPage.scss';

interface cartPageInterface {
    chartDeviceList: cartDevice[]
}

const CartPage: FC<cartPageInterface> = ({ chartDeviceList }) => {
    console.log('chartDeviceList is: ', chartDeviceList);
    // const [deviceItem] = useState({})
    
    return (
        <div className="page">
            <Header />
            <div className="main-limit">
                {
                    <SmallNavigation params={[{ title: 'Cart', link: '/cart' }]} />
                }
                <GoBack />
                <div>
                    {
                        chartDeviceList.map((device: cartDevice) => (
                            <div className="cart-item">
                                <div className="cart-item__cross"></div>
                                <img src={device.image} />
                                <p>{device.price.current}</p>
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
    chartDeviceList: state.cartDeviceList.deviceList
})


export default connect(mapStateToProps, null)(CartPage)