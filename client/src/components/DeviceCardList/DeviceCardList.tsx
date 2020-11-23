import React from 'react';
import { connect } from 'react-redux';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import DeviceCardItem from '../DeviceCardItem/DeviceCardItem';

import "./DeviceCardList.scss";

interface cardListInterface {
    deviceList: any // array of device type
}

const DeviceCardList: React.FC<cardListInterface> = ({ deviceList }) => {
    // console.log(phoneList);


    return (
        <>
            <div className="phone-list">
                {
                    deviceList.map((device: phoneCardInterface) => <DeviceCardItem device={device} key={device._id} />)
                }
            </div>
        </>
    )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceCardList)