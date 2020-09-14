import React from 'react';
import { connect } from 'react-redux';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import PhoneCardItem from '../PhoneCardItem/PhoneCardItem';

import "./PhoneCardList.scss";

interface cardListInterface {
    phoneList: phoneCardInterface[]
}

const PhoneCardList: React.FC<cardListInterface> = ({phoneList}) => {
    console.log(phoneList);
    

    return (
       <>
        <div>CARD LIST</div>

        {
            phoneList.map((phone: phoneCardInterface) => <PhoneCardItem phone={phone} key={phone._id}/>)
        }
       </>
    )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCardList)