import React from 'react';
import { connect } from 'react-redux';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import PhoneCardItem from '../PhoneCardItem/PhoneCardItem';

import "./PhoneCardList.scss";

interface cardListInterface {
    phoneList: phoneCardInterface[]
}

const PhoneCardList: React.FC<cardListInterface> = ({ phoneList }) => {
    // console.log(phoneList);


    return (
        <>
            <div className="phone-list">
                {
                    phoneList.map((phone: phoneCardInterface) => <PhoneCardItem phone={phone} key={phone._id} />)
                }
            </div>
        </>
    )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCardList)